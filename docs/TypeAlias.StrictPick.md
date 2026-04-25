[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / StrictPick

# Type Alias: StrictPick\<T, K\>

> **StrictPick**\<`T`, `K`\> = `T` _extends_ `T` ? `Pick`\<`T`, `Extract`\<`K`, keyof `T`\>\> : `never`

Defined in: [object.ts:65](../src/object.ts#L65)

Strictly picks keys `K` from each member of a union `T`.

This behaves like `Pick`, but distributes over unions and **only allows
keys that actually exist in the union**. Passing an invalid key will
result in a type error.

## Type Parameters

### T

`T`

The target type (can be a union)

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys to pick (must exist in `UnionKey<T>`)

## Examples

```ts
type Invalid = StrictPick<
  { a: string },
  //@ts-expect-error "b" is not a key of the given type
  "b"
>;
```

```ts
type Result = StrictPick<
  { type: "a"; name: string } | { type: "b"; age: number },
  "type" | "name"
>;
//   ^?
// | { type: "a"; name: string; }
// | { type: "b"; }
```
