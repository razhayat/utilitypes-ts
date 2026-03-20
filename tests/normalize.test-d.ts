import { describe, it, expectTypeOf } from "vitest";
import { Normalize, Prettify, UnionKey } from "../src";

describe("Normalize", () => {
	it("should preserve a single object type", () => {
		type A = {
			a: string;
		};

		type Result = Prettify<Normalize<A>>;

		expectTypeOf<Result>().toEqualTypeOf<{
			a: string;
		}>();
	});

	it("should support interfaces", () => {
		interface A {
			a: string;
		}

		type Result = Prettify<Normalize<A>>;

		expectTypeOf<Result>().toEqualTypeOf<{
			a: string;
		}>();
	});

	it("should make every union member have the same keys as the other members", () => {
		type A = {
			type: "a";
			a: string;
		};
		type B = {
			type: "b";
			b: number;
		};

		type Result = Prettify<Normalize<A | B>>;
		type Expected =
			| { type: "a"; a: string; b?: never }
			| { type: "b"; a?: never; b: number };

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should add missing union keys as optional never", () => {
		type A = {
			type: "a";
			value: string;
			fieldA1: Date;
			fieldA2: string[];
		};
		type B = {
			type: "b";
			value: number;
			fieldB1: B[];
			fieldB2: [number, null, number];
			fieldB3: "mouse";
		};
		type C = {};

		type Union = A | B | C;
		type Result = Prettify<Normalize<Union>>;

		type ExpectedA = {
			type: "a";
			value: string;
			fieldA1: Date;
			fieldA2: string[];
			fieldB1?: never;
			fieldB2?: never;
			fieldB3?: never;
		};
		type ExpectedB = {
			type: "b";
			value: number;
			fieldB1: B[];
			fieldB2: [number, null, number];
			fieldB3: "mouse";
			fieldA1?: never;
			fieldA2?: never;
		};
		type ExpectedC = {
			type?: never;
			value?: never;
			fieldA1?: never;
			fieldA2?: never;
			fieldB1?: never;
			fieldB2?: never;
			fieldB3?: never;
		};

		expectTypeOf<keyof Result>().toEqualTypeOf<UnionKey<Union>>();
		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB | ExpectedC>();
	});

	it("should allow normalizing only some keys", () => {
		type A = {
			type: "a";
			value: string;
			fieldA1: Date;
			fieldA2: string[];
		};
		type B = {
			type: "b";
			value: number;
			fieldB1: B[];
			fieldB2: [number, null, number];
			fieldB3: "mouse";
		};

		type Result = Prettify<Normalize<A | B, "fieldA1" | "fieldB1" | "fieldB3">>;

		type ExpectedA = {
			type: "a";
			value: string;
			fieldA1: Date;
			fieldA2: string[];
			fieldB1?: never;
			fieldB3?: never;
		};
		type ExpectedB = {
			type: "b";
			value: number;
			fieldB1: B[];
			fieldB2: [number, null, number];
			fieldB3: "mouse";
			fieldA1?: never;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should preserve never", () => {
		expectTypeOf<Normalize<never>>().toEqualTypeOf<never>();
	});

	it("should error when passing a key not present in UnionKey<T>", () => {
		type A = {
			a: string;
		};
		type B = {
			b: number;
		};

		type Invalid = Normalize<
			A | B,
			// @ts-expect-error
			"not an actual key! this is very nice that there is an error🤗"
		>;
	});
});
