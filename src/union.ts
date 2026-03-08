export type UnionKey<T> = T extends T ? keyof T : never;

export type Normalize<T, K extends UnionKey<T> = UnionKey<T>> = T extends T
	? T & Partial<Record<Exclude<K, keyof T>, never>>
	: never;

export type Unbind<T> = Omit<Normalize<T>, never>;
