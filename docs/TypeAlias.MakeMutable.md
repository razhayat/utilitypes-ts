[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / MakeMutable

# Type Alias: MakeMutable\<T, K\>

> **MakeMutable**\<`T`, `K`\> = `T` _extends_ `T` ? `Omit`\<`T`, `K`\> & `{ -readonly [Key in Extract<K, keyof T>]: T[Key] }` : `never`

Defined in: [object.ts:297](../src/object.ts#L297)

Makes specified keys `K` mutable in each member of a union `T`.

This distributes over unions, ensuring each member is processed
individually. Only keys that exist in each member are affected.

## Type Parameters

### T

`T`

The target type (can be a union)

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\> = [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys to make mutable (defaults to all union keys)

## Examples

```ts
type Result = MakeMutable<{ readonly a: string; readonly b: number }>;
//   ^?
// { a: string; b: number }
```

```ts
type Result = MakeMutable<{ readonly a: string } | { readonly b: number }>;
//   ^?
// { a: string } | { b: number }
```

```ts
type Result = MakeMutable<{ readonly a: string } | { readonly b: number }, "a">;
//   ^?
// { a: string } | { readonly b: number }
```
