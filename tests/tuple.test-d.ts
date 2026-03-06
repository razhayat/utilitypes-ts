import { expectTypeOf, describe, it } from "vitest";
import { Tuple } from "../src";

describe("Tuple", () => {
	it("should create a tuple of the correct length", () => {
		type Result = Tuple<number, 3>;

		expectTypeOf<Result>().toEqualTypeOf<[number, number, number]>();
	});

	it("should work with unions", () => {
		type Obj = {
			id: number;
		};

		type Result = Tuple<string | Obj, 2>;

		expectTypeOf<Result>().toEqualTypeOf<[string | Obj, string | Obj]>();
	});

	it("should support zero length", () => {
		type Result = Tuple<number, 0>;

		expectTypeOf<Result>().toEqualTypeOf<[]>();
	});

	it("should support multiple lengths", () => {
		type Result = Tuple<Date, 2 | 3>;

		expectTypeOf<Result>().toEqualTypeOf<[Date, Date] | [Date, Date, Date]>();
	});
});
