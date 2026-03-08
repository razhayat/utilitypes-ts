import { describe, it, expectTypeOf } from "vitest";
import { StrictExclude } from "../src";

describe("StrictExclude", () => {
	it("should exclude a literal from a union of literals", () => {
		type Letters = "a" | "b" | "c";

		type Result = StrictExclude<Letters, "b">;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "c">();
	});

	it("should exclude multiple literals from a union of literals", () => {
		type Letters = "a" | "b" | "c";

		type Result = StrictExclude<Letters, "a" | "c">;

		expectTypeOf<Result>().toEqualTypeOf<"b">();
	});

	it("should exclude an object from a union of objects", () => {
		type Circle = {
			type: "circle";
			radius: number;
		};
		type Square = {
			type: "square";
			side: number;
		};

		type Result = StrictExclude<
			Circle | Square,
			{
				type: "circle";
			}
		>;

		expectTypeOf<Result>().toEqualTypeOf<Square>();
	});

	it("should exclude multiple objects from a union of objects", () => {
		type Circle = {
			type: "circle";
			radius: number;
		};
		type Square = {
			type: "square";
			side: number;
		};
		type Triangle = {
			type: "triangle";
			base: number;
			height: number;
		};

		type Result = StrictExclude<
			Circle | Square | Triangle,
			{ type: "circle" } | Triangle
		>;

		expectTypeOf<Result>().toEqualTypeOf<Square>();
	});

	it("should work with literal and object unions combined", () => {
		type Circle = {
			type: "circle";
			radius: number;
		};

		type Mixed =
			| "a"
			| Circle
			| "b"
			| false
			| null
			| undefined
			| 12
			| (() => string);

		type Result = StrictExclude<
			Mixed,
			"b" | { radius: number } | null | (() => string)
		>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | false | undefined | 12>();
	});
});

describe("constraint", () => {
	it("should not allow excluding literals that are not in the union", () => {
		type Letters = "a" | "b" | "c";

		type Invalid = StrictExclude<
			Letters,
			// @ts-expect-error not part of the union
			"d"
		>;
	});

	it("should not allow properties that do not exist in the union objects", () => {
		type Circle = {
			type: "circle";
			radius: number;
		};
		type Square = {
			type: "square";
			side: number;
		};

		type Invalid = StrictExclude<
			Circle | Square,
			// @ts-expect-error property does not exist in union members
			{ diameter: number }
		>;
	});

	it("should not allow properties from both objects", () => {
		type Circle = {
			type: "circle";
			radius: number;
		};
		type Square = {
			type: "square";
			side: number;
		};

		type Invalid = StrictExclude<
			Circle | Square,
			// @ts-expect-error property does not exist in union members
			{ radius: number; side: number }
		>;
	});

	it("should not allow properties with the wrong type", () => {
		type Circle = {
			type: "circle";
			radius: number;
		};
		type Square = {
			type: "square";
			side: number;
		};

		type Invalid = StrictExclude<
			Circle | Square,
			// @ts-expect-error property does not have a compatible value type
			{ radius: Date }
		>;
	});

	it("should not allow excluding object shapes from a pure literal union", () => {
		type Letters = "a" | "b" | "c";

		type Invalid = StrictExclude<
			Letters,
			// @ts-expect-error objects cannot match literal union constraint
			{ type: "circle" }
		>;
	});
});
