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
	[K in keyof T as T[K] extends V ? K : never]: void;
};
