/**
 * Extracts all keys from a union type.
 *
 * Unlike `keyof`, which only returns keys common to all members,
 * this type returns all keys across the given union
 *
 *
 * @example
 * type Result = UnionKey<
 *   | { a: string }
 *   | { b: number }
 * >;
 * //   ^?
 * // "a" | "b"
 */
export type UnionKey<T> = T extends T ? keyof T : never;

/**
 * Normalizes a union type so that all members share the same set of keys,
 * making the union easier to work with (e.g. for autocomplete or narrowing).
 *
 * By default, all keys from the union are normalized,
 * but you can limit normalization to a subset of keys via `K`.
 *
 * @template T - The target type (typically a union)
 * @template K - Keys to normalize (defaults to all keys of the union)
 *
 * @example
 * type Result = Normalize<
 *   | { type: "a"; a: string }
 *   | { type: "b"; b: number }
 * >;
 * //   ^?
 * // | { type: "a"; a: string; b?: never }
 * // | { type: "b"; a?: never; b: number }
 *
 * @example
 * // Only normalize specific keys
 * type Result = Normalize<
 *   | { type: "a"; a: string }
 *   | { type: "b"; b: number },
 *   "a"
 * >;
 * //   ^?
 * // | { type: "a"; a: string }
 * // | { type: "b"; a?: never; b: number }
 */
export type Normalize<T, K extends UnionKey<T> = UnionKey<T>> = T extends
	| null
	| undefined
	? T
	: T & Partial<Record<Exclude<K, keyof T>, never>>;

/**
 * Collapses a union type into a single object type by merging all members.
 *
 * Each property becomes:
 * - A union of all possible value types across the union members
 * - Optional if it does not exist in every member
 *
 * This effectively removes the relationship between fields (i.e. "unbinds"
 * discriminated unions), making all properties independent.
 *
 * @template T - The target union type
 *
 * @example
 * // Discriminated union becomes "loose"
 * type Result = Unbind<
 * 	| { kind: "success"; data: string }
 * 	| { kind: "error"; error: Error }
 * >;
 * //   ^?
 * // {
 * //   kind: "success" | "error";
 * //   data?: string;
 * //   error?: Error;
 * // }
 */
export type Unbind<T> = Omit<Normalize<T>, never>;

type ExcludeExtractPreservedMember<T> =
	| Exclude<T, Record<PropertyKey, any>>
	| Extract<T, Function>;

type ExcludeExtractConstraint<T> =
	| Extract<T, ExcludeExtractPreservedMember<T>>
	| Partial<Normalize<Exclude<T, ExcludeExtractPreservedMember<T>>>>;

export type StrictExclude<T, U extends ExcludeExtractConstraint<T>> = Exclude<
	T,
	U
>;

export type StrictExtract<T, U extends ExcludeExtractConstraint<T>> = Extract<
	T,
	U
>;

/**
 * Converts a union type into an intersection type.
 *
 * @template T - The union type to convert
 *
 * @example
 * type Result = UnionToIntersection<
 * 	| { a: string }
 * 	| { b: number }
 * >;
 * //   ^?
 * // { a: string } & { b: number }
 */
export type UnionToIntersection<T> = (
	T extends T ? (value: T) => void : never
) extends (value: infer R) => void
	? R & T
	: never;
