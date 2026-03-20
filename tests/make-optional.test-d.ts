import { describe, it, expectTypeOf } from "vitest";
import { Prettify, MakeOptional } from "../src";

describe("MakeOptional", () => {
	it("should make all properties optional if no keys are specified", () => {
		type Person = {
			name: string;
			age: number;
			birth?: Date;
		};

		type Result = Prettify<MakeOptional<Person>>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name?: string;
			age?: number;
			birth?: Date;
		}>();
	});

	it("should make passed properties optional", () => {
		type Person = {
			name: string;
			age: number;
			birth: Date;
			death: Date;
		};

		type Result = Prettify<MakeOptional<Person, "age" | "death">>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			age?: number;
			birth: Date;
			death?: Date;
		}>();
	});

	it("should make all union properties optional when no key is passed", () => {
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

		type Result = Prettify<MakeOptional<A | B>>;

		type ExpectedA = {
			type?: "a";
			fieldA?: string;
			valueA?: string;
		};
		type ExpectedB = {
			type?: "b";
			fieldB?: Date;
			valueB?: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should make only the selected property optional in the right union member", () => {
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

		type Result = Prettify<MakeOptional<A | B, "valueA" | "fieldB" | "type">>;

		type ExpectedA = {
			type?: "a";
			fieldA: string;
			valueA?: string;
		};
		type ExpectedB = {
			type?: "b";
			fieldB?: Date;
			valueB: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should support interfaces", () => {
		interface Person {
			name: string;
			age: number;
			birth: Date;
			death: Date;
		}

		type Result = Prettify<MakeOptional<Person, "age" | "death">>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			age?: number;
			birth: Date;
			death?: Date;
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

		type Invalid = MakeOptional<
			A | B,
			// @ts-expect-error this is not part of UnionKey<A | B>
			"notIncludedInUnionKey"
		>;
	});
});
