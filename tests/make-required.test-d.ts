import { describe, it, expectTypeOf } from "vitest";
import { MakeRequired, Prettify } from "../src";

describe("MakeRequired", () => {
	it("should make all properties required if no keys are specified", () => {
		type Person = {
			name: string;
			age?: number;
			birth?: Date;
		};

		type Result = Prettify<MakeRequired<Person>>;

		expectTypeOf<Result>().toEqualTypeOf<
			{} & {
				name: string;
				age: number;
				birth: Date;
			}
		>();
	});

	it("should make passed properties required", () => {
		type Person = {
			name: string;
			age?: number;
			birth?: Date;
			death?: Date;
		};

		type Result = Prettify<MakeRequired<Person, "name" | "birth" | "death">>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			age?: number;
			birth: Date;
			death: Date;
		}>();
	});

	it("should make all union properties required when no key is passed", () => {
		type A = {
			type: "a";
			fieldA: A;
			valueA?: string;
		};
		type B = {
			type: "b";
			fieldB?: Date;
			valueB?: number;
		};

		type Result = Prettify<MakeRequired<A | B>>;

		type ExpectedA = {
			type: "a";
			fieldA: A;
			valueA: string;
		};
		type ExpectedB = {
			type: "b";
			fieldB: Date;
			valueB: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should make the property required in the right union member", () => {
		type A = {
			type: "a";
			fieldA: A;
			valueA?: string;
		};
		type B = {
			type: "b";
			fieldB?: Date;
			valueB?: number;
		};

		type Result = Prettify<MakeRequired<A | B, "valueA" | "fieldB">>;

		type ExpectedA = {
			type: "a";
			fieldA: A;
			valueA: string;
		};
		type ExpectedB = {
			type: "b";
			fieldB: Date;
			valueB?: number;
		};

		expectTypeOf<Result>().toEqualTypeOf<ExpectedA | ExpectedB>();
	});

	it("should support interfaces", () => {
		interface Person {
			name: string;
			age?: number;
			birth?: Date;
			death?: Date;
		}

		type Result = Prettify<MakeRequired<Person, "name" | "birth" | "death">>;

		expectTypeOf<Result>().toEqualTypeOf<{
			name: string;
			age?: number;
			birth: Date;
			death: Date;
		}>();
	});

	it("should only allow union keys", () => {
		type A = {
			type: "a";
			fieldA: A;
			valueA: string;
		};
		type B = {
			type: "b";
			fieldB: Date;
			valueB?: number;
		};

		type Invalid = MakeRequired<
			A | B,
			// @ts-expect-error this is supposed to be in UnionKey<A | B>
			"not included in UnionKey<A | B>"
		>;
	});
});
