[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / ValueOf

# Type Alias: ValueOf\<T, K\>

> **ValueOf**\<`T`, `K`\> = [`Normalize`](TypeAlias.Normalize.md)\<`T`\>\[`K`\]

Defined in: [general.ts:32](../src/general.ts#L32)

Extracts the value types of an object `T`.

By default, it returns a union of all property values.
You can optionally provide a subset of keys `K` to extract
only specific value types.

## Type Parameters

### T

`T`

The target object type

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\> = [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys of `T` to extract values from (defaults to all keys)

## Examples

```ts
type Result = ValueOf<{ a: string; b: number }>;
//   ^?
// string | number
```

```ts
type Result = ValueOf<{ a: string; b: number; c: boolean }, "a" | "c">;
//   ^?
// string | boolean
```

```ts
type Result = ValueOf<{ a: string } | { b: number }>;
//   ^?
// string | number | undefined
```
