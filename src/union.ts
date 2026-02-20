export type UnionKey<T> = T extends T ? keyof T : never;
