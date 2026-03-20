import { describe, it } from "vitest";
import { DeepArray } from "../src";

describe("DeepArray", () => {
	it("should accept an empty array", () => {
		[] satisfies DeepArray<number>;
	});

	it("should accept a flat array", () => {
		[1, 2, 3] satisfies DeepArray<number>;
	});

	it("should accept nested arrays", () => {
		[
			[1, 2],
			[3, 4],
		] satisfies DeepArray<number>;
	});

	it("should accept deeply nested arrays", () => {
		[
			1,
			[
				2,
				[3, [4]],
				[
					[
						[
							[
								[
									[
										[[], []],
										[[[3], [[[2], [[[[[8]], 2, 4, 6]]], 1]]], 4],
									],
								],
								5,
							],
						],
					],
					1,
				],
				4,
			],
		] satisfies DeepArray<number>;
	});

	it("should work with unions", () => {
		["a", 1, [1, 2, [3]], ["b", ["c", 1, []]]] satisfies DeepArray<
			string | number
		>;
	});

	it("should reject a non array value", () => {
		// @ts-expect-error needs to be an array
		true satisfies DeepArray<boolean>;
	});

	it("should reject incorrect types", () => {
		[
			// @ts-expect-error string is not a number
			"a",
		] satisfies DeepArray<number>;
	});
});
