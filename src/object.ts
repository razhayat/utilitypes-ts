import { UnionKey } from "./union";

/**
 * Strictly omits keys `K` from each member of a union `T`.
 *
 * This behaves like `Omit`, but distributes over unions and **only allows
 * keys that actually exist in the union**. Passing an invalid key will
 * result in a type error.
 *
 * @template T - The target type (can be a union)
 * @template K - Keys to remove (must exist in `UnionKey<T>`)
 *
 * @example
 * // Compile-time error: "b" is not a key of the given type
 * type Invalid = StrictOmit<
 *   { a: string },
 *   "b"
 * >;
 *
 * @example
 * // Omits only from the member that has the key
 * type Result = StrictOmit<
 *   | { type: "a"; name: string }
 *   | { type: "b"; age: number },
 *   "name"
 * >;
 * //   ^?
 * // | { type: "a" }
 * // | { type: "b"; age: number }
 */
export type StrictOmit<T, K extends UnionKey<T>> = T extends T
	? Omit<T, K>
	: never;

/**
 * Strictly picks keys `K` from each member of a union `T`.
 *
 * This behaves like `Pick`, but distributes over unions and **only allows
 * keys that actually exist in the union**. Passing an invalid key will
 * result in a type error.
 *
 * @template T - The target type (can be a union)
 * @template K - Keys to pick (must exist in `UnionKey<T>`)
 *
 * @example
 * // Compile-time error: "b" is not a key of the given type
 * type Invalid = StrictPick<
 *   { a: string },
 *   "b"
 * >;
 *
 * @example
 * // Picks only from the member that has the key
 * type Result = StrictPick<
 *   | { type: "a"; name: string }
 *   | { type: "b"; age: number },
 *   "type" | "name"
 * >;
 * //   ^?
 * // | { type: "a"; name: string; }
 * // | { type: "b"; }
 */
export type StrictPick<T, K extends UnionKey<T>> = T extends T
	? Pick<T, Extract<K, keyof T>>
	: never;

/**
 * Equivalent to `Partial<Record<K, V>>`.
 * @example
 * type Result = PartialRecord<"a" | "b", number>;
 * //   ^?
 * // {
 * //   a?: number;
 * //   b?: number;
 * // };
 */
export type PartialRecord<K extends PropertyKey, V> = Partial<Record<K, V>>;

/**
 * Forces TypeScript to expand and display a type as a plain object.
 *
 * This is mainly useful for improving readability in editor hovers
 * and tooltips, especially for complex types involving intersections
 * or mapped types.
 *
 * It does not change the actual type, it only affects how it is shown.
 *
 * @template T - The type to simplify for display
 *
 * @example
 * type Result = Prettify<{ a: string } & { b: number }>;
 * //   ^?
 * // { a: string; b: number }
 */
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

/**
 * Extracts keys from `T` whose value types extend `V`.
 *
 * @template T - The target type
 * @template V - The value type to match against
 *
 * @example
 * type Result = KeyOfType<
 * 	{ a: string; b: number; c: string },
 * 	string
 * >;
 * //   ^?
 * // "a" | "c"
 */
export type KeyOfType<T, V> = keyof {
	[K in keyof (T extends T ? T : never) as T[K] extends V ? K : never]: void;
};

/**
 * Groups a type `T` by the values of a key `K`.
 *
 * @template T - The target type (typically a union of objects)
 * @template K - The key to group by (must be a key of `T` with a `PropertyKey` type)
 *
 * @example
 * type Apple = {
 * 	type: "fruit";
 * 	color: "green";
 * };
 *
 * type Banana = {
 * 	type: "fruit";
 * 	color: "yellow";
 * };
 *
 * type Tomato = {
 * 	type: "vegetable";
 * 	color: "red";
 * };
 *
 * type GroupedByType = GroupBy<Apple | Banana | Tomato, "type">;
 * //   ^?
 * // {
 * //   fruit: Apple | Banana;
 * //   vegetable: Tomato;
 * // }
 *
 * type GroupedByColor = GroupBy<Apple | Banana | Tomato, "color">;
 * //   ^?
 * // {
 * //   green: Apple;
 * //   yellow: Banana;
 * //   red: Tomato;
 * // }
 */
export type GroupBy<T, K extends KeyOfType<T, PropertyKey>> = {
	[Key in T[K] extends PropertyKey ? T[K] : never]: T extends T
		? Key extends T[K]
			? T
			: never
		: never;
};

export type MakeRequired<T, K extends UnionKey<T> = UnionKey<T>> = T extends T
	? Omit<T, K> & Required<Pick<T, Extract<K, keyof T>>>
	: never;

export type MakeOptional<T, K extends UnionKey<T> = UnionKey<T>> = T extends T
	? Omit<T, K> & Partial<Pick<T, Extract<K, keyof T>>>
	: never;

export type MakeReadonly<T, K extends UnionKey<T> = UnionKey<T>> = T extends T
	? Omit<T, K> & Readonly<Pick<T, Extract<K, keyof T>>>
	: never;

export type MakeMutable<T, K extends UnionKey<T> = UnionKey<T>> = T extends T
	? Omit<T, K> & {
			-readonly [Key in Extract<K, keyof T>]: T[Key];
		}
	: never;
