import { describe, it, expectTypeOf } from "vitest";
import { StrictOmit } from "../src";

describe("StrictOmit", () => {
	it("should omit a key from a single object type", () => {
		type Person = {
			name: string;
			age: number;
		};

		type Result = StrictOmit<Person, "name">;

		expectTypeOf<Result>().toEqualTypeOf<{
			age: number;
		}>();
	});

	it("should distribute over union members", () => {
		type A = {
			a: string;
			b: number;
		};
		type B = {
			a: string;
			c: boolean;
		};

		type Result = StrictOmit<A | B, "a">;
		type Expected = { b: number } | { c: boolean };

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should allow omitting an unshared key", () => {
		type A = {
			shared: Date;
			unsharedA: number;
		};
		type B = {
			shared: Record<"hello" | "developer" | "from" | "the" | "future", string>;
			unsharedB: boolean;
		};

		type Result = StrictOmit<A | B, "unsharedB">;

		type ExpectedA = {
			shared: Date;
			unsharedA: number;
		};
		type ExpectedB = {
			shared: Record<"hello" | "developer" | "from" | "the" | "future", string>;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should not combine the union", () => {
		type A = {
			type: "a";
			value: number;
		};
		type B = {
			type: "b";
			value: string;
			field: number;
		};

		type Result = StrictOmit<A | B, "field">;

		expectTypeOf<Result>().not.toEqualTypeOf<{
			type: "a" | "b";
			value: number | string;
		}>();
	});

	it("should allow omitting multiple keys", () => {
		type A = {
			type: "a";
			fieldA: string;
		};
		type B = {
			type: "b";
			fieldB: boolean;
		};

		type Result = StrictOmit<A | B, "type" | "fieldB">;
		type Expected = { fieldA: string } | {};

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

		type Result = StrictOmit<A | B | C, "type" | "regular">;

		type ExpectedA = {
			value: string;
			optional?: boolean;
		};
		type ExpectedB = {
			value: number;
			readonly readonly: "21/02/2026";
		};
		type ExpectedC = {
			value: Date;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB | ExpectedC>();
	});

	it("should produce never when input is never", () => {
		expectTypeOf<StrictOmit<never, never>>().toEqualTypeOf<never>();
	});

	it("should error when omitting keys not in keyof T", () => {
		type Invalid = StrictOmit<
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

		type Invalid = StrictOmit<
			A | B,
			// @ts-expect-error
			"this is not an actual key"
		>;
	});
});
