[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / MakeOptional

# Type Alias: MakeOptional\<T, K\>

> **MakeOptional**\<`T`, `K`\> = `T` _extends_ `T` ? `Omit`\<`T`, `K`\> & `Partial`\<`Pick`\<`T`, `Extract`\<`K`, keyof `T`\>\>\> : `never`

Defined in: [object.ts:235](../src/object.ts#L235)

Makes specified keys `K` optional in each member of a union `T`.

This distributes over unions, ensuring each member is processed
individually. Only keys that exist in each member are affected.

## Type Parameters

### T

`T`

The target type (can be a union)

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\> = [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys to make optional (defaults to all union keys)

## Examples

```ts
type Result = MakeOptional<{ a: string; b: number }>;
//   ^?
// { a?: string; b?: number }
```

```ts
type Result = MakeOptional<{ a: string } | { b: number }>;
//   ^?
// { a?: string } | { b?: number }
```

```ts
type Result = MakeOptional<{ a: string } | { b: number }, "a">;
//   ^?
// { a?: string } | { b: number }
```
