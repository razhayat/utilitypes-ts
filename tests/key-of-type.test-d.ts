import { describe, it, expectTypeOf } from "vitest";
import { KeyOfType } from "../src";

describe("KeyOfType", () => {
	it("should return keys whose values match the given type", () => {
		type Input = {
			a: string;
			b: number;
			c: string;
		};

		type Result = KeyOfType<Input, string>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "c">();
	});

	it("should return a single key when only one property matches", () => {
		type Input = {
			a: string;
			b: number;
			c: boolean;
		};

		type Result = KeyOfType<Input, number>;

		expectTypeOf<Result>().toEqualTypeOf<"b">();
	});

	it("should return never when no properties match", () => {
		type Input = {
			a: string;
			b: string;
		};

		type Result = KeyOfType<Input, number>;

		expectTypeOf<Result>().toEqualTypeOf<never>();
	});

	it("should support interfaces", () => {
		interface Input {
			a: string;
			b: number;
			c: string;
		}

		type Result = KeyOfType<Input, string>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "c">();
	});

	it("should support union types", () => {
		type A = {
			a: string;
		};
		type B = {
			b: number;
		};

		type Result = KeyOfType<A | B, string | undefined>;

		expectTypeOf<Result>().toEqualTypeOf<"a">();
	});

	it("should work with union value types", () => {
		type Input = {
			a: string;
			b: number;
			c: string | number;
			d: boolean;
		};

		type Result = KeyOfType<Input, string | number>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "b" | "c">();
	});

	it("should work when properties contain unions", () => {
		type Input = {
			a: string | number;
			b: number;
			c: string;
		};

		type Result = KeyOfType<Input, number>;

		expectTypeOf<Result>().toEqualTypeOf<"b">();
	});

	it("should include optional properties if their type matches", () => {
		type Input = {
			a?: string;
			b: number;
			c?: string;
			d: undefined;
		};

		type Result = KeyOfType<Input, string | undefined>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "c" | "d">();
	});

	it("should return all keys when V is unknown", () => {
		type Input = {
			a: string;
			b: number;
			c: boolean;
		};

		type Result = KeyOfType<Input, unknown>;

		expectTypeOf<Result>().toEqualTypeOf<"a" | "b" | "c">();
	});

	it("should work with primitives", () => {
		type Result = KeyOfType<string, number>;

		expectTypeOf<Result>().toEqualTypeOf<"length">();
	});
});
