[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / Normalize

# Type Alias: Normalize\<T, K\>

> **Normalize**\<`T`, `K`\> = `T` _extends_ `null` \| `undefined` ? `T` : `T` & `Partial`\<`Record`\<`Exclude`\<`K`, keyof `T`\>, `never`\>\>

Defined in: [union.ts:50](../src/union.ts#L50)

Normalizes a union type so that all members share the same set of keys,
making the union easier to work with (e.g. for autocomplete or narrowing).

By default, all keys from the union are normalized,
but you can limit normalization to a subset of keys via `K`.

## Type Parameters

### T

`T`

The target type (typically a union)

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\> = [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys to normalize (defaults to all keys of the union)

## Examples

```ts
type Result = Normalize<{ type: "a"; a: string } | { type: "b"; b: number }>;
//   ^?
// | { type: "a"; a: string; b?: never }
// | { type: "b"; a?: never; b: number }
```

```ts
type Result = Normalize<
  { type: "a"; a: string } | { type: "b"; b: number },
  "a"
>;
//   ^?
// | { type: "a"; a: string }
// | { type: "b"; a?: never; b: number }
```
