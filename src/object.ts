import { UnionKey } from "./union";

export type StrictOmit<T, K extends UnionKey<T>> = T extends T
	? Omit<T, K>
	: never;

export type StrictPick<T, K extends UnionKey<T>> = T extends T
	? Pick<T, Extract<K, keyof T>>
	: never;

export type PartialRecord<K extends PropertyKey, V> = Partial<Record<K, V>>;
