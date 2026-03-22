import { describe, it, expectTypeOf } from "vitest";
import { CustomTypeErrorData, Satisfies } from "../src";

describe("Satisfies", () => {
	it("should allow types with only known fields", () => {
		type T = {
			a: number;
			b: string;
		};
		type Base = {
			a: number;
			b: string;
		};

		type Result = Satisfies<T, Base>;

		expectTypeOf<Result>().toEqualTypeOf<T>();
	});

	it("should allow ignoring optional fields", () => {
		type T = {
			a: 12;
		};
		type Base = {
			a: number;
			b?: string;
		};

		type Result = Satisfies<T, Base>;

		expectTypeOf<Result>().toEqualTypeOf<T>();
	});

	it("should allow empty object when base is partial record", () => {
		type T = {};
		type Base = Partial<Record<"a" | "b", boolean>>;

		type Result = Satisfies<T, Base>;

		expectTypeOf<Result>().toEqualTypeOf<T>();
	});

	it("should allow partial type when base is partial record", () => {
		type T = {
			a: false;
		};
		type Base = Partial<Record<"a" | "b", boolean>>;

		type Result = Satisfies<T, Base>;

		expectTypeOf<Result>().toEqualTypeOf<T>();
	});

	it("should not allow extra fields when base is partial record", () => {
		type T = {
			aBeforeItWasRenamedToA: true;
			b: false;
		};
		type Base = Partial<Record<"a" | "b", boolean>>;

		type Result = Satisfies<T, Base>;

		expectTypeOf<
			CustomTypeErrorData<Result>["unknownFields"]
		>().toEqualTypeOf<"aBeforeItWasRenamedToA">();
	});

	it("should allow a union member when base is a union", () => {
		type A = {
			valueA: number;
		};
		type B = {
			valueB: string;
		};

		type Result = Satisfies<A, A | B>;

		expectTypeOf<Result>().toEqualTypeOf<A>();
	});

	it("should allow base when base is a union", () => {
		type A = {
			valueA: number;
		};
		type B = {
			valueB: string;
		};

		type Result = Satisfies<A | B, A | B>;

		expectTypeOf<Result>().toEqualTypeOf<A | B>();
	});

	it("should allow an intersection when base is a union", () => {
		type A = {
			valueA: number;
		};
		type B = {
			valueB: string;
		};

		type Result = Satisfies<A & B, A | B>;

		expectTypeOf<Result>().toEqualTypeOf<A & B>();
	});

	it("should not allow an extra field when base is a union", () => {
		type A = {
			valueA: number;
		};
		type B = {
			valueB: string;
		};
		type C = {
			valueC: "this is not a valid field!";
		};

		type Result = Satisfies<A & B & C, A | B>;

		expectTypeOf<
			CustomTypeErrorData<Result>["unknownFields"]
		>().toEqualTypeOf<"valueC">();
	});

	it("should produce error type when extra fields exist", () => {
		type T = {
			a: number;
			field1: string;
			field2: Date;
		};
		type Base = {
			a: number;
		};

		type Result = Satisfies<T, Base>;

		expectTypeOf<CustomTypeErrorData<Result>["unknownFields"]>().toEqualTypeOf<
			"field1" | "field2"
		>();
	});

	it("should work with primitives", () => {
		type Result = Satisfies<12, number>;
		expectTypeOf<Result>().toEqualTypeOf<12>();
	});

	it("should allow literal union fully contained in target union", () => {
		type Result = Satisfies<"a" | "b", "a" | "b" | "c">;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "b">();
	});

	it("should fail when literal union contains unknown values", () => {
		type Invalid = Satisfies<
			// @ts-expect-error d is not in the union
			"a" | "d",
			"a" | "b" | "c"
		>;
	});

	it("should fail when type does not extend target type", () => {
		type Invalid = Satisfies<
			// @ts-expect-error first type does not extend the second
			{
				a: number;
			},
			{
				a: string;
			}
		>;
	});

	it("should not allow subset of fields", () => {
		type Invalid = Satisfies<
			// @ts-expect-error first type does not extend the second
			{
				a: number;
			},
			{
				a: number;
				b: string;
			}
		>;
	});
});
