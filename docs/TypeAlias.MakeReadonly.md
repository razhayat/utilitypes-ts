[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / MakeReadonly

# Type Alias: MakeReadonly\<T, K\>

> **MakeReadonly**\<`T`, `K`\> = `T` _extends_ `T` ? `Omit`\<`T`, `K`\> & `Readonly`\<`Pick`\<`T`, `Extract`\<`K`, keyof `T`\>\>\> : `never`

Defined in: [object.ts:266](../src/object.ts#L266)

Makes specified keys `K` readonly in each member of a union `T`.

This distributes over unions, ensuring each member is processed
individually. Only keys that exist in each member are affected.

## Type Parameters

### T

`T`

The target type (can be a union)

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\> = [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys to make readonly (defaults to all union keys)

## Examples

```ts
type Result = MakeReadonly<{ a: string; b: number }>;
//   ^?
// { readonly a: string; readonly b: number }
```

```ts
type Result = MakeReadonly<{ a: string } | { b: number }>;
//   ^?
// { readonly a: string } | { readonly b: number }
```

```ts
type Result = MakeReadonly<{ a: string } | { b: number }, "a">;
//   ^?
// { readonly a: string } | { b: number }
```
