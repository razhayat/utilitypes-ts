import { describe, it, expectTypeOf } from "vitest";
import { Unbind } from "../src";

describe("Unbind", () => {
	it("should preserve a single object type", () => {
		type Person = {
			name: string;
			age: number;
		};

		type Result = Unbind<Person>;

		expectTypeOf<Result>().toEqualTypeOf<Person>();
	});

	it("should unbind unions", () => {
		type A = {
			type: "a";
			value: number;
		};
		type B = {
			type: "b";
			value: string;
		};

		type Result = Unbind<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<{
			type: "a" | "b";
			value: number | string;
		}>();
	});

	it("should include all union keys", () => {
		type A = {
			type: "a";
			value: number;
			fieldA: Date;
		};
		type B = {
			type: "b";
			value: string;
		};

		type Result = Unbind<A | B>;

		expectTypeOf<A>().toExtend<Result>();
		expectTypeOf<B>().toExtend<Result>();
		expectTypeOf<Result>().toEqualTypeOf<{
			type: "a" | "b";
			value: number | string;
			fieldA?: Date;
		}>();
	});

	it("should preserve optional and readonly properties", () => {
		type A = {
			type: "a";
			value: number;
			field: number[];
			readonly fieldA: Date;
		};
		type B = {
			type: "b";
			value: string;
			field?: boolean;
		};

		type Result = Unbind<A | B>;

		expectTypeOf<A>().toExtend<Result>();
		expectTypeOf<B>().toExtend<Result>();
		expectTypeOf<Result>().toEqualTypeOf<{
			type: "a" | "b";
			value: number | string;
			field?: number[] | boolean;
			readonly fieldA?: Date;
		}>();
	});

	it("should ruin literals", () => {
		type Literal = "hello";

		type Result = Unbind<Literal>;

		expectTypeOf<Result>().not.toEqualTypeOf<Literal>();
	});
});
