[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / MakeRequired

# Type Alias: MakeRequired\<T, K\>

> **MakeRequired**\<`T`, `K`\> = `T` _extends_ `T` ? `Omit`\<`T`, `K`\> & `Required`\<`Pick`\<`T`, `Extract`\<`K`, keyof `T`\>\>\> : `never`

Defined in: [object.ts:204](../src/object.ts#L204)

Makes specified keys `K` required in each member of a union `T`.

This distributes over unions, ensuring each union member is processed
individually. Only keys that exist in each member are affected.

## Type Parameters

### T

`T`

The target type (can be a union)

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\> = [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys to make required (defaults to all union keys)

## Examples

```ts
type Result = MakeRequired<{ a?: string; b?: number }>;
//   ^?
// { a: string; b: number }
```

```ts
type Result = MakeRequired<{ a?: string } | { b?: number }>;
//   ^?
// { a: string } | { b: number }
```

```ts
type Result = MakeRequired<{ a?: string } | { b?: number }, "a">;
//   ^?
// { a: string } | { b?: number }
```
