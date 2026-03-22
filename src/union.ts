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
