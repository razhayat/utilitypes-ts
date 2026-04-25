import { describe, it, expectTypeOf } from "vitest";
import { TypeGuard } from "../src";

describe("TypeGuard", () => {
	it("should allow defining a guard without repeating the predicate type", () => {
		((value) => {
			value satisfies unknown;
			return typeof value === "number";
		}) satisfies TypeGuard<number>;
	});

	it("should allow narrowing from a custom source type", () => {
		((value) => {
			value satisfies string | number;
			return typeof value === "number";
		}) satisfies TypeGuard<number, string | number>;
	});

	it("should actually be a type guard", () => {
		expectTypeOf<TypeGuard<string>>().toEqualTypeOf<
			(value: unknown) => value is string
		>();
	});

	it("should enforce that target extends source", () => {
		type Invalid = TypeGuard<
			// @ts-expect-error number doesn't extend string
			number,
			string
		>;
	});

	it("should be fooled by a lying type guard", () => {
		((value): value is string => {
			return typeof value === "number";
		}) satisfies TypeGuard<string>;
	});

	it("should not allow a wrong guard", () => {
		((value) => {
			return typeof value === "boolean";
			// @ts-expect-error not a type guard of number
		}) satisfies TypeGuard<number>;
	});
});
