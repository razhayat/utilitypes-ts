export type UnionKey<T> = T extends T ? keyof T : never;

export type Normalize<T, K extends UnionKey<T> = UnionKey<T>> = T extends T
	? T & Partial<Record<Exclude<K, keyof T>, never>>
	: never;

export type Unbind<T> = Omit<Normalize<T>, never>;

type ExcludeExtractConstraint<T> =
	| Exclude<T, Record<PropertyKey, unknown>>
	| Partial<Normalize<Extract<T, Record<PropertyKey, unknown>>>>;

export type StrictExclude<T, U extends ExcludeExtractConstraint<T>> = Exclude<
	T,
	U
>;

export type StrictExtract<T, U extends ExcludeExtractConstraint<T>> = Extract<
	T,
	U
>;
