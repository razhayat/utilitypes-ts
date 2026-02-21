import { describe, it, expectTypeOf } from "vitest";
import { PartialRecord } from "../src";

describe("PartialRecord", () => {
	it("should make all keys optional", () => {
		type Result = PartialRecord<"a" | "b", number>;

		expectTypeOf<Result>().toEqualTypeOf<{
			a?: number;
			b?: number;
		}>();
	});

	it("should work with string, number and Symbol keys", () => {
		const symbol = Symbol();

		type Result = PartialRecord<"a" | 1 | typeof symbol, boolean>;

		expectTypeOf<Result>().toEqualTypeOf<{
			a?: boolean;
			1?: boolean;
			[symbol]?: boolean;
		}>();
	});

	it("should work with index signatures", () => {
		type Result = PartialRecord<string, Date>;

		expectTypeOf<Result>().toEqualTypeOf<{
			[K in string]?: Date;
		}>();
	});

	it("should produce empty object for never keys", () => {
		type Result = PartialRecord<never, number>;

		expectTypeOf<Result>().toEqualTypeOf<{}>();
	});
});
