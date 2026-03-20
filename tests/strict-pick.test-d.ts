import { describe, it, expectTypeOf } from "vitest";
import { StrictPick } from "../src";

describe("StrictPick", () => {
	it("should pick a key from a single object type", () => {
		type Person = {
			name: string;
			age: number;
		};

		type Result = StrictPick<Person, "name">;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
		}>();
	});

	it("should support interfaces", () => {
		interface Person {
			name: string;
			age: number;
		}

		type Result = StrictPick<Person, "name">;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
		}>();
	});

	it("should distribute over union members", () => {
		type A = {
			a: string;
			b: number;
		};
		type B = {
			a: number;
			c: boolean;
		};

		type Result = StrictPick<A | B, "a">;
		type Expected = { a: string } | { a: number };

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should allow picking an unshared key", () => {
		type A = {
			shared: Date;
			unsharedA: number;
		};
		type B = {
			shared: Record<"hello" | "developer" | "from" | "the" | "future", string>;
			unsharedB: boolean;
		};

		type Result = StrictPick<A | B, "unsharedB">;
		type Expected = {} | { unsharedB: boolean };

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should allow picking multiple keys", () => {
		type A = {
			type: "a";
			fieldA: string;
		};
		type B = {
			type: "b";
			fieldB: boolean;
		};

		type Result = StrictPick<A | B, "type" | "fieldB">;
		type Expected = { type: "a" } | { type: "b"; fieldB: boolean };

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should preserve optional and readonly properties", () => {
		type A = {
			type: "a";
			value: string;
			optional?: boolean;
		};
		type B = {
			type: "b";
			value: number;
			readonly readonly: "21/02/2026";
		};
		type C = {
			type: "c";
			value: Date;
			regular: A;
		};

		type Result = StrictPick<A | B | C, "type" | "optional" | "readonly">;

		type ExpectedA = {
			type: "a";
			optional?: boolean;
		};
		type ExpectedB = {
			type: "b";
			readonly readonly: "21/02/2026";
		};
		type ExpectedC = {
			type: "c";
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB | ExpectedC>();
	});

	it("should produce never when input is never", () => {
		expectTypeOf<StrictPick<never, never>>().toEqualTypeOf<never>();
	});

	it("should error when omitting keys not in keyof T", () => {
		type Invalid = StrictPick<
			{
				a: string;
			},
			// @ts-expect-error
			"this is not a actual key"
		>;
	});

	it("should error when omitting keys not in UnionKey<T>", () => {
		type A = {
			a: string;
		};
		type B = {
			b: number;
		};

		type Invalid = StrictPick<
			A | B,
			// @ts-expect-error
			"this is not an actual key"
		>;
	});
});
