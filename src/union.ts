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

export type Normalize<T, K extends UnionKey<T> = UnionKey<T>> = T extends
	| null
	| undefined
	? T
	: T & Partial<Record<Exclude<K, keyof T>, never>>;

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

export type UnionToIntersection<T> = (
	T extends T ? (value: T) => void : never
) extends (value: infer R) => void
	? R & T
	: never;
