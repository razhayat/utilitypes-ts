import { UnionKey } from "./union";

export type StrictOmit<T, K extends UnionKey<T>> = T extends T
	? Omit<T, K>
	: never;

export type StrictPick<T, K extends UnionKey<T>> = T extends T
	? Pick<T, Extract<K, keyof T>>
	: never;

export type PartialRecord<K extends PropertyKey, V> = Partial<Record<K, V>>;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type KeyOfType<T, V> = keyof {
	[K in keyof (T extends T ? T : never) as T[K] extends V ? K : never]: void;
};

export type GroupBy<T, K extends KeyOfType<T, PropertyKey>> = {
	[Key in T[K] extends PropertyKey ? T[K] : never]: Extract<T, Record<K, Key>>;
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
