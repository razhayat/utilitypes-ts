import { PartialRecord, Prettify } from "./object";

export type UnionKey<T> = T extends T ? keyof T : never;

export type Normalize<T, K extends UnionKey<T> = UnionKey<T>> = T extends T
	? Prettify<T & PartialRecord<Exclude<K, keyof T>, never>>
	: never;

export type Unbind<T> = Omit<Normalize<T>, never>;
