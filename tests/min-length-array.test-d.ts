import { describe, it, expectTypeOf } from "vitest";
import { MinLengthArray } from "../src";

describe("MinLengthArray", () => {
	it("should allow arrays with exactly the minimum length", () => {
		const array: MinLengthArray<number, 3> = [1, 2, 3];
		expectTypeOf(array).toEqualTypeOf<[number, number, number, ...number[]]>();
	});

	it("should allow arrays longer than the minimum length", () => {
		const array: MinLengthArray<number, 3> = [1, 2, 3, 4, 5];
		expectTypeOf(array).toEqualTypeOf<[number, number, number, ...number[]]>();
	});

	it("should enforce the element type", () => {
		const array: MinLengthArray<string, 2> = ["a", "b", "c"];
		expectTypeOf(array).toEqualTypeOf<[string, string, ...string[]]>();
	});

	it("should fail when array is shorter than the minimum length", () => {
		// @ts-expect-error - array must have at least 3 items
		[1, 2] satisfies MinLengthArray<number, 3>;
	});

	it("should fail when element types do not match", () => {
		[
			1,
			// @ts-expect-error - elements must be numbers
			"2",
		] satisfies MinLengthArray<number, 2>;
	});

	it("should work with zero minimum length", () => {
		const arr: MinLengthArray<number, 0> = [];
		expectTypeOf(arr).toEqualTypeOf<number[]>();
	});

	it("should allow any length when N is number", () => {
		const arr: MinLengthArray<number, number> = [1, 2];
		expectTypeOf(arr).toEqualTypeOf<number[]>();
	});
});
