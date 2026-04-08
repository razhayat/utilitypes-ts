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
		interface B {
			type: "b";
			value: number;
			fieldB1: B[];
			fieldB2: [number, null, number];
			fieldB3: "mouse";
		}
		type C = {};

		type Union = A | B | C | never;
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
		class A {
			type: "a" = "a";
			value: string = "";
			fieldA1: Date = new Date();
			fieldA2: string[] = [];

			doStuff() {}
		}
		type B = {
			type: "b";
			value: number;
			fieldB1: B[];
			fieldB2: [number, null, number];
			fieldB3: "mouse";
		};

		type Result = Prettify<
			Normalize<A | B, "fieldA1" | "doStuff" | "fieldB1" | "fieldB3">
		>;

		type ExpectedA = {
			type: "a";
			value: string;
			fieldA1: Date;
			fieldA2: string[];
			doStuff: VoidFunction;
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
			doStuff?: never;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should work with primitives and objects", () => {
		type Primitive = "hello";
		type Obj1 = {
			hi: string;
		};
		type Obj2 = {
			bye: number;
		};

		type Result = Normalize<Primitive | Obj1 | Obj2>;

		type ExpectedPrimitive = "hello" & {
			hi?: never;
			bye?: never;
		};
		type ExpectedObj1 = {
			hi: string;
		} & Partial<Record<keyof string | "bye", never>>;
		type ExpectedObj2 = {
			bye: number;
		} & Partial<Record<keyof string | "hi", never>>;

		expectTypeOf<Result>().toEqualTypeOf<
			ExpectedPrimitive | ExpectedObj1 | ExpectedObj2
		>();
	});

	it("should work with null or undefined ", () => {
		type A = {
			type: "a";
			a: string;
		};
		type B = {
			type: "b";
			readonly b: number;
		};

		type Result = Prettify<Normalize<A | B | null | undefined>>;

		type ExpectedA = {
			type: "a";
			a: string;
			b?: never;
		};
		type ExpectedB = {
			type: "b";
			a?: never;
			readonly b: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<
			ExpectedA | ExpectedB | null | undefined
		>();
	});

	it("should work with tuples", () => {
		type A = [number, string];
		type B = {
			type: "b";
			valueB: A;
		};
		type C = Date;

		type Result = Normalize<A | B | C>;

		expectTypeOf<Result>().toHaveProperty("0");
		expectTypeOf<Result>().toHaveProperty("valueB");
		expectTypeOf<Result>().toHaveProperty("getTime");
	});

	it("should handle intersections inside unions", () => {
		type Base = {
			base: string;
		};
		type A = Base & {
			a: number;
		};
		type B = Base & {
			b: boolean;
		};

		type Result = Prettify<Normalize<A | B>>;

		type ExpectedA = {
			base: string;
			a: number;
			b?: never;
		};
		type ExpectedB = {
			base: string;
			b: boolean;
			a?: never;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should handle symbol keys", () => {
		const symbolA = Symbol();
		const symbolB = Symbol();

		type A = {
			[symbolA]: string;
			value: number;
		};
		type B = {
			[symbolB]: number;
			value: string;
		};

		type Result = Prettify<Normalize<A | B>>;

		type ExpectedA = {
			[symbolA]: string;
			value: number;
			[symbolB]?: never;
		};
		type ExpectedB = {
			[symbolB]: number;
			value: string;
			[symbolA]?: never;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should not normalize deeply nested objects", () => {
		type A = {
			user: {
				name: string;
				displayName: string;
			};
		};
		type B = {
			user: {
				id: string;
				organization: string;
			};
		};

		type Result = Prettify<Normalize<A | B>>;

		expectTypeOf<Result>().toEqualTypeOf<A | B>();
	});

	it("should handle function unions", () => {
		type A = () => string;
		type B = {
			hello: 12;
		};

		type Result = Normalize<A | B>;

		(value: Result) => {
			if (value.hello) {
				return;
			}

			expectTypeOf(value).toExtend<A>();
		};
	});

	it("should handle union of primitives only", () => {
		type Result = Normalize<string | number>;

		expectTypeOf<Result>().toHaveProperty("endsWith");
		expectTypeOf<Result>().toHaveProperty("toExponential");
	});

	it("should preserve string primitives", () => {
		type Primitive = "hi";

		type Result = Normalize<Primitive>;

		expectTypeOf<Result>().toEqualTypeOf<Primitive & Record<never, never>>();
	});

	it("should preserve number primitives", () => {
		type Primitive = 12;

		type Result = Normalize<Primitive>;

		expectTypeOf<Result>().toEqualTypeOf<Primitive & Record<never, never>>();
	});

	it("should preserve boolean primitives", () => {
		type Primitive = true;

		type Result = Normalize<Primitive>;

		expectTypeOf<Result>().toEqualTypeOf<Primitive & Record<never, never>>();
	});

	it("should preserve functions", () => {
		type Func = (value: string) => Date;

		type Result = Normalize<Func>;

		expectTypeOf<Result>().toEqualTypeOf<Func & Record<never, never>>();
	});

	it("should preserve never", () => {
		expectTypeOf<Normalize<never>>().toEqualTypeOf<never>();
	});

	it("should preserve any", () => {
		expectTypeOf<Normalize<any>>().toEqualTypeOf<any>();
	});

	it("should not preserve unknown", () => {
		expectTypeOf<Normalize<unknown>>().toEqualTypeOf<{}>();
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
