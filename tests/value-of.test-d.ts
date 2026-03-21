import { it, expectTypeOf, describe } from "vitest";
import { ValueOf } from "../src";

describe("ValueOf", () => {
	it("should extract union of all property values by default", () => {
		type Person = {
			name: string;
			age: number;
			isHappy: boolean;
		};

		type Result = ValueOf<Person>;

		expectTypeOf<Result>().toEqualTypeOf<string | number | boolean>();
	});

	it("should extract value of a single key", () => {
		type Person = {
			name: string;
			age: number;
		};

		type Result = ValueOf<Person, "name">;

		expectTypeOf<Result>().toEqualTypeOf<string>();
	});

	it("should extract values of multiple keys as a union", () => {
		type Person = {
			name: string;
			age: number;
			isSad: boolean;
		};

		type Result = ValueOf<Person, "name" | "isSad">;

		expectTypeOf<Result>().toEqualTypeOf<string | boolean>();
	});

	it("should work with optional properties", () => {
		type Person = {
			name?: string;
			age: number;
		};

		type Result = ValueOf<Person>;

		expectTypeOf<Result>().toEqualTypeOf<string | number | undefined>();
	});

	it("should return never for empty object", () => {
		type Empty = {};

		type Result = ValueOf<Empty>;

		expectTypeOf<Result>().toEqualTypeOf<never>();
	});

	it("should only take shared keys into account", () => {
		type A = {
			type: "a";
			valueA: string;
		};
		type B = {
			type: "b";
			valueB: number;
		};

		type Result = ValueOf<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "b">();
	});

	it("should respect key constraint", () => {
		type T = {
			a: string;
			b: number;
		};

		type Invalid = ValueOf<
			T,
			// @ts-expect-error c is not a key of T
			"c"
		>;
	});

	it("should handle index signatures", () => {
		type Record = {
			[key: string]: number;
		};

		type Result = ValueOf<Record>;

		expectTypeOf<Result>().toEqualTypeOf<number>();
	});

	it("should work with nested object values", () => {
		type T = {
			a: { x: number };
			b: { y: string };
		};

		type Result = ValueOf<T>;

		expectTypeOf<Result>().toEqualTypeOf<{ x: number } | { y: string }>();
	});
});
