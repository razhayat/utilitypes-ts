import { describe, it, expectTypeOf } from "vitest";
import { GroupBy } from "../src";

describe("GroupBy", () => {
	it("should work with a single type", () => {
		type A = {
			type: "a";
			fieldA: number;
		};

		type Result = GroupBy<A, "type">;

		expectTypeOf<Result>().toEqualTypeOf<{
			a: A;
		}>();
	});

	it("should group a discriminated union by a key", () => {
		type A = {
			type: "a";
			fieldA: number;
		};
		type B = {
			type: "b";
			fieldB: string;
		};

		type Result = GroupBy<A | B, "type">;

		expectTypeOf<Result>().toEqualTypeOf<{
			a: A;
			b: B;
		}>();
	});

	it("should group multiple variants sharing the same key value", () => {
		type A1 = {
			type: "a";
			fieldA: number;
		};
		type A2 = {
			type: "a";
			fieldA2: string;
		};
		type B = {
			type: "b";
			fieldB: boolean;
		};

		type Result = GroupBy<A1 | A2 | B, "type">;

		expectTypeOf<Result>().toEqualTypeOf<{
			a: A1 | A2;
			b: B;
		}>();
	});

	it("should work with interfaces", () => {
		interface A {
			type: "a";
			fieldA: number;
		}
		interface B {
			type: "b";
			fieldB: string;
		}

		type Result = GroupBy<A | B, "type">;

		expectTypeOf<Result>().toEqualTypeOf<{
			a: A;
			b: B;
		}>();
	});

	it("should work with numeric keys", () => {
		type A = {
			id: 1;
			value: string;
		};
		type B = {
			id: 2;
			value: number;
		};
		type C = {
			id: 6;
			value: string;
			field: Date;
		};

		type Result = GroupBy<A | B | C, "id">;

		expectTypeOf<Result>().toEqualTypeOf<{
			1: A;
			2: B;
			6: C;
		}>();
	});

	it("should work with symbol property keys", () => {
		const symbolA = Symbol();
		const symbolB = Symbol();

		type A = {
			kind: typeof symbolA;
			value: number;
		};
		type B = {
			kind: typeof symbolB;
			value: string;
		};

		type Result = GroupBy<A | B, "kind">;

		expectTypeOf<Result>().toEqualTypeOf<{
			[symbolA]: A;
			[symbolB]: B;
		}>();
	});

	it("should work with mixed property key types", () => {
		const symbol = Symbol();
		type A1 = {
			type: typeof symbol;
			a: number;
		};
		type A2 = {
			type: typeof symbol;
			date: Date;
		};
		type A3 = {
			type: typeof symbol;
			content: string;
		};

		type B1 = {
			type: "string";
			b: string;
		};
		type B2 = {
			type: "string";
			array: unknown[];
		};

		type C = {
			type: 1;
			c: boolean;
		};

		type Result = GroupBy<A1 | A2 | A3 | B1 | B2 | C, "type">;

		expectTypeOf<Result>().toEqualTypeOf<{
			[symbol]: A1 | A2 | A3;
			string: B1 | B2;
			1: C;
		}>();
	});

	it("should not allow non property key values", () => {
		type A = {
			type: "a";
			value: Date;
		};
		type B = {
			type: "b";
			value: number[];
		};

		type Invalid = GroupBy<
			A | B,
			// @ts-expect-error (A | B)["value"] should extend PropertyKey
			"value"
		>;
	});
});
