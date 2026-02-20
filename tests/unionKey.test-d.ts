import { describe, it, expectTypeOf } from "vitest";
import { UnionKey } from "../src";

describe("UnionKey", () => {
	it("should extract keys from a single object", () => {
		type Person = {
			name: string;
			age: number;
		};

		type Result = UnionKey<Person>;

		expectTypeOf<Result>().toEqualTypeOf<"name" | "age">();
	});

	it("should merge keys from union members", () => {
		type A = {
			a: 1;
			b: 2;
		};
		type B = {
			b: 2;
			c: 3;
		};

		type Result = UnionKey<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "b" | "c">();
	});

	it("should handle disjoint object unions", () => {
		type A = {
			x: string;
		};
		type B = {
			y: number;
		};
		type C = {
			z: Date;
		};

		type Result = UnionKey<A | B | C>;

		expectTypeOf<Result>().toEqualTypeOf<"x" | "y" | "z">();
	});

	it("should return never for never", () => {
		expectTypeOf<UnionKey<never>>().toEqualTypeOf<never>();
	});

	it("should handle index signatures", () => {
		type A = Record<string, unknown>;
		type B = {
			fixed: string;
		};

		type Result = UnionKey<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<string>();
	});
});
