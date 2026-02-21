import { describe, it, expectTypeOf } from "vitest";
import { Prettify } from "../src";

describe("Prettify", () => {
	it("should preserve a simple object type", () => {
		type Person = {
			name: string;
			age: number;
			hobbies: string[];
		};

		type Result = Prettify<Person>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			age: number;
			hobbies: string[];
		}>();
	});

	it("should flatten intersections", () => {
		type A = {
			a: string;
		};
		type B = {
			b: number;
		};

		type Result = Prettify<A & B>;

		expectTypeOf<Result>().not.toEqualTypeOf<A & B>();
		expectTypeOf<Result>().toEqualTypeOf<{
			a: string;
			b: number;
		}>();
	});

	it("should distribute correctly over unions", () => {
		type Union =
			| ({ a: string } & { b: number })
			| ({ c: boolean } & { d: Date });

		type Result = Prettify<Union>;
		type Expected = { a: string; b: number } | { c: boolean; d: Date };

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should preserve optional and readonly properties", () => {
		type Person = {
			name?: string;
			readonly age: number;
		};

		type Result = Prettify<Person>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name?: string;
			readonly age: number;
		}>();
	});

	it("should preserve index signatures", () => {
		type A = {
			[key: string]: number;
		};

		type Result = Prettify<A>;

		expectTypeOf<Result>().toEqualTypeOf<{
			[key: string]: number;
		}>();
	});

	it("should preserve primitives", () => {
		type Primitive = "nam" | 12 | false | null | undefined;

		type Result = Prettify<Primitive>;

		expectTypeOf<Result>().toEqualTypeOf<Primitive>();
	});

	it("should preserve never", () => {
		expectTypeOf<Prettify<never>>().toEqualTypeOf<never>();
	});

	it("should not preserve unknown", () => {
		expectTypeOf<Prettify<unknown>>().toEqualTypeOf<{}>();
	});

	it("should not preserve functions", () => {
		expectTypeOf<Prettify<(value: string) => Date>>().toEqualTypeOf<{}>();
	});
});
