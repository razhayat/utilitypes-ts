[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / StrictOmit

# Type Alias: StrictOmit\<T, K\>

> **StrictOmit**\<`T`, `K`\> = `T` _extends_ `T` ? `Omit`\<`T`, `K`\> : `never`

Defined in: [object.ts:32](../src/object.ts#L32)

Strictly omits keys `K` from each member of a union `T`.

This behaves like `Omit`, but distributes over unions and **only allows
keys that actually exist in the union**. Passing an invalid key will
result in a type error.

## Type Parameters

### T

`T`

The target type (can be a union)

### K

`K` _extends_ [`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>

Keys to remove (must exist in `UnionKey<T>`)

## Examples

```ts
type Invalid = StrictOmit<
  { a: string },
  //@ts-expect-error "b" is not a key of the given type
  "b"
>;
```

```ts
type Result = StrictOmit<
  { type: "a"; name: string } | { type: "b"; age: number },
  "name"
>;
//   ^?
// | { type: "a" }
// | { type: "b"; age: number }
```
