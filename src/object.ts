import { UnionKey } from "./union";

export type StrictOmit<T, K extends UnionKey<T>> = T extends T
	? Omit<T, K>
	: never;

export type PartialRecord<K extends PropertyKey, V> = Partial<Record<K, V>>;
