import { describe, it, expectTypeOf } from "vitest";
import { MakeReadonly, Prettify } from "../src";

describe("MakeReadonly", () => {
	it("should make all properties readonly if no keys are specified", () => {
		type Person = {
			name: string;
			age: number;
			birth: Date;
		};

		type Result = Prettify<MakeReadonly<Person>>;

		expectTypeOf<Result>().toEqualTypeOf<{
			readonly name: string;
			readonly age: number;
			readonly birth: Date;
		}>();
	});

	it("should make only passed properties readonly", () => {
		type Person = {
			name: string;
			age: number;
			readonly birth: Date;
			readonly death: Date;
		};

		type Result = Prettify<MakeReadonly<Person, "age" | "death">>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			readonly age: number;
			readonly birth: Date;
			readonly death: Date;
		}>();
	});

	it("should make all union properties readonly when no key is passed", () => {
		type A = {
			readonly type: "a";
			fieldA: string;
			valueA: string;
		};
		type B = {
			type: "b";
			fieldB: Date;
			valueB: number;
		};

		type Result = Prettify<MakeReadonly<A | B>>;

		type ExpectedA = {
			readonly type: "a";
			readonly fieldA: string;
			readonly valueA: string;
		};
		type ExpectedB = {
			readonly type: "b";
			readonly fieldB: Date;
			readonly valueB: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should make only the selected property readonly in the right union member", () => {
		type A = {
			type: "a";
			fieldA: string;
			valueA: string;
		};
		type B = {
			type: "b";
			fieldB: Date;
			valueB: number;
		};

		type Result = Prettify<MakeReadonly<A | B, "valueA" | "fieldB" | "type">>;

		type ExpectedA = {
			readonly type: "a";
			fieldA: string;
			readonly valueA: string;
		};
		type ExpectedB = {
			readonly type: "b";
			readonly fieldB: Date;
			valueB: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should support interfaces", () => {
		interface Person {
			name: string;
			age: number;
			readonly birth: Date;
			readonly death: Date;
		}

		type Result = Prettify<MakeReadonly<Person, "age" | "death">>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			readonly age: number;
			readonly birth: Date;
			readonly death: Date;
		}>();
	});

	it("should only allow union keys", () => {
		type A = {
			type: "a";
			fieldA: string;
			valueA: string;
		};
		type B = {
			type: "b";
			fieldB: Date;
			valueB: number;
		};

		type Invalid = MakeReadonly<
			A | B,
			// @ts-expect-error this is not part of UnionKey<A | B>
			"notIncludedInUnionKey"
		>;
	});
});
