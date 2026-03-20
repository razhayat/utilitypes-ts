import { describe, it, expectTypeOf } from "vitest";
import { StrictExtract } from "../src";

describe("StrictExtract", () => {
	it("should extract a literal from a union of literals", () => {
		type Letters = "a" | "b" | "c";

		type Result = StrictExtract<Letters, "b">;

		expectTypeOf<Result>().toEqualTypeOf<"b">();
	});

	it("should extract multiple literals from a union of literals", () => {
		type Letters = "a" | "b" | "c";

		type Result = StrictExtract<Letters, "a" | "c">;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "c">();
	});

	it("should extract an object from a union of objects", () => {
		type Circle = {
			type: "circle";
			radius: number;
		};
		type Square = {
			type: "square";
			side: number;
		};

		type Result = StrictExtract<
			Circle | Square,
			{
				type: "circle";
			}
		>;

		expectTypeOf<Result>().toEqualTypeOf<Circle>();
	});

	it("should support interfaces", () => {
		interface Circle {
			type: "circle";
			radius: number;
		}

		type Result = StrictExtract<
			Circle,
			{
				type: "circle";
			}
		>;

		expectTypeOf<Result>().toEqualTypeOf<Circle>();
	});

	it("should extract multiple objects from a union of objects", () => {
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

		type Result = StrictExtract<
			Circle | Square | Triangle,
			{ type: "circle" } | Triangle
		>;

		expectTypeOf<Result>().toEqualTypeOf<Circle | Triangle>();
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

		type Result = StrictExtract<
			Mixed,
			"b" | { radius: number } | null | (() => string)
		>;

		expectTypeOf<Result>().toEqualTypeOf<
			"b" | Circle | null | (() => string)
		>();
	});
});

describe("constraint", () => {
	it("should not allow extracting literals that are not in the union", () => {
		type Letters = "a" | "b" | "c";

		type Invalid = StrictExtract<
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

		type Invalid = StrictExtract<
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

		type Invalid = StrictExtract<
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

		type Invalid = StrictExtract<
			Circle | Square,
			// @ts-expect-error property does not have a compatible value type
			{ radius: Date }
		>;
	});

	it("should not allow excluding object shapes from a pure literal union", () => {
		type Letters = "a" | "b" | "c";

		type Invalid = StrictExtract<
			Letters,
			// @ts-expect-error objects cannot match literal union constraint
			{ type: "circle" }
		>;
	});
});
