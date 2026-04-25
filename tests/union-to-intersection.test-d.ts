import { describe, it, expectTypeOf } from "vitest";
import { UnionToIntersection } from "../src";

describe("UnionToIntersection", () => {
	it("should preserve a single type", () => {
		type A = {
			a: number;
		};

		type Result = UnionToIntersection<A>;

		expectTypeOf<Result>().toEqualTypeOf<A>();
	});

	it("should convert a union of objects into an intersection", () => {
		type A = {
			a1: number;
			a2: Date[];
		};
		type B = {
			b1: string;
			b2: string;
			b3: string;
		};
		type C = {
			c: [boolean];
		};

		type Result = UnionToIntersection<A | B | C>;

		expectTypeOf<Result>().toEqualTypeOf<A & B & C>();
	});

	it("should work with complicated types", () => {
		type A = {
			a: number;
		};
		type B = {
			b: string;
		};
		type C = {
			c: boolean;
		};

		type Result = UnionToIntersection<A | (B & C)>;

		expectTypeOf<Result>().toEqualTypeOf<A & B & C>();
	});

	it("should correctly intersect overlapping keys", () => {
		type A = {
			a: {
				hello: "hello";
			};
		};
		type B = {
			a: {
				bye: "bye";
			};
		};

		type Result = UnionToIntersection<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<A & B>();
	});

	it("should return never for a union that cannot be intersected", () => {
		type A = {
			type: "a";
			valueA: number;
		};
		type B = {
			type: "b";
			valueB: Date;
		};

		type Result = UnionToIntersection<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<never>();
	});

	it("should always be assignable to T", () => {
		<Union>(intersection: UnionToIntersection<Union>): Union => {
			return intersection;
		};
	});

	it("should work with interfaces", () => {
		interface A {
			a: number;
		}
		interface B {
			b: string;
		}

		type Result = UnionToIntersection<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<A & B>();
	});

	it("should handle primitive unions", () => {
		type Input = string | number;

		type Result = UnionToIntersection<Input>;

		expectTypeOf<Result>().toEqualTypeOf<never>();
	});

	it("should handle function unions", () => {
		type A = (a: number) => { name: string };
		type B = (b: string) => { age: number };

		type Result = UnionToIntersection<A | B>;

		expectTypeOf<Result>().toEqualTypeOf<A & B>();
	});

	it("should handle tuple unions", () => {
		type Input = [number] | [string];

		type Result = UnionToIntersection<Input>;

		expectTypeOf<Result>().toEqualTypeOf<[number] & [string]>();
	});

	it("should preserve never", () => {
		type Result = UnionToIntersection<never>;

		expectTypeOf<Result>().toEqualTypeOf<never>();
	});

	it("should preserve unknown", () => {
		type Result = UnionToIntersection<unknown>;

		expectTypeOf<Result>().toEqualTypeOf<unknown>();
	});

	it("should preserve any", () => {
		type Result = UnionToIntersection<any>;

		expectTypeOf<Result>().toEqualTypeOf<any>();
	});
});
