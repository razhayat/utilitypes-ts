import { it, expectTypeOf, describe } from "vitest";
import { Suggestion } from "../src";

describe("Suggestion", () => {
	it("should allow suggested literal values", () => {
		type Color = Suggestion<"red" | "blue">;

		expectTypeOf<"red">().toExtend<Color>();
		expectTypeOf<"blue">().toExtend<Color>();
	});

	it("should allow non-suggested values from base type", () => {
		type Color = Suggestion<"red" | "blue">;

		expectTypeOf<"green">().toExtend<Color>();
		expectTypeOf<string>().toExtend<Color>();
	});

	it("should work with numbers", () => {
		type Spacing = Suggestion<0 | 4 | 8, number>;

		expectTypeOf<0>().toExtend<Spacing>();
		expectTypeOf<4>().toExtend<Spacing>();
		expectTypeOf<12>().toExtend<Spacing>();
	});

	it("should work with union base types", () => {
		type Value = Suggestion<"a", string | number>;

		expectTypeOf<"a">().toExtend<Value>();
		expectTypeOf<123>().toExtend<Value>();
	});

	it("should constrain suggested values to allowed type", () => {
		type Invalid = Suggestion<
			// @ts-expect-error 1 is not of type string
			1,
			string
		>;
	});
});
