import { describe, it, expectTypeOf } from "vitest";
import { MakeMutable, Prettify } from "../src";

describe("MakeMutable", () => {
	it("should make all properties mutable if no keys are specified", () => {
		type Person = {
			readonly name: string;
			readonly age: number;
			birth: Date;
		};

		type Result = Prettify<MakeMutable<Person>>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			age: number;
			birth: Date;
		}>();
	});

	it("should make only passed properties mutable", () => {
		type Person = {
			name: string;
			readonly age: number;
			readonly birth: Date;
			readonly death: Date;
		};

		type Result = Prettify<MakeMutable<Person, "age" | "death">>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			age: number;
			readonly birth: Date;
			death: Date;
		}>();
	});

	it("should make all union properties mutable when no key is passed", () => {
		type A = {
			type: "a";
			readonly fieldA: string;
			readonly valueA: string;
		};
		type B = {
			readonly type: "b";
			readonly fieldB: Date;
			readonly valueB: number;
		};

		type Result = Prettify<MakeMutable<A | B>>;

		type ExpectedA = {
			type: "a";
			fieldA: string;
			valueA: string;
		};
		type ExpectedB = {
			type: "b";
			fieldB: Date;
			valueB: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should make only the selected property mutable in the right union member", () => {
		type A = {
			readonly type: "a";
			fieldA: string;
			readonly valueA: string;
		};
		type B = {
			readonly type: "b";
			readonly fieldB: Date;
			valueB: number;
		};

		type Result = Prettify<MakeMutable<A | B, "valueA" | "fieldB">>;

		type ExpectedA = {
			readonly type: "a";
			fieldA: string;
			valueA: string;
		};
		type ExpectedB = {
			readonly type: "b";
			fieldB: Date;
			valueB: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should only allow union keys", () => {
		type A = {
			readonly type: "a";
			readonly fieldA: string;
			readonly valueA: string;
		};
		type B = {
			readonly type: "b";
			readonly fieldB: Date;
			readonly valueB: number;
		};

		type Invalid = MakeMutable<
			A | B,
			// @ts-expect-error this is not part of UnionKey<A | B>
			"notIncludedInUnionKey"
		>;
	});
});
