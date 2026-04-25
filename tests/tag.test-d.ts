import { it, expectTypeOf, describe } from "vitest";
import { Tag } from "../src";

describe("Tag", () => {
	it("should create a tagged type distinct from base type", () => {
		type A = Tag<string, "A">;

		expectTypeOf<A>().not.toEqualTypeOf<string>();
	});

	it("should extend the original type", () => {
		type A = Tag<string, "A">;

		expectTypeOf<A>().toExtend<string>();
	});

	it("should not allow assignment between different tags", () => {
		type A = Tag<string, "A">;
		type B = Tag<string, "B">;

		expectTypeOf<A>().not.toExtend<B>();
		expectTypeOf<B>().not.toExtend<A>();
	});

	it("should allow tagging a tagged type", () => {
		type Email = Tag<string, "Email">;
		type Gmail = Tag<Email, "Google">;

		type Expected = Tag<string, "Email" | "Google">;

		expectTypeOf<Gmail>().toExtend<Expected>();
		expectTypeOf<Expected>().toExtend<Gmail>();
	});

	it("should allow multi-tagged types to extend each individual tag", () => {
		type Email = Tag<number, "Email">;
		type Google = Tag<number, "Google">;
		type Gmail = Tag<number, "Email" | "Google">;

		expectTypeOf<Gmail>().toExtend<Email>();
		expectTypeOf<Gmail>().toExtend<Google>();
	});

	it("should support number and symbol tags", () => {
		const sym = Symbol();

		type A = Tag<string, 1>;
		type B = Tag<string, typeof sym>;
	});

	it("should allow tagging complex types", () => {
		type Base = {
			id: string;
		};

		type Result = Tag<Base, "Entity">;

		expectTypeOf<Result>().toExtend<Base>();
	});
});
