[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / MinLengthArray

# Type Alias: MinLengthArray\<T, N\>

> **MinLengthArray**\<`T`, `N`\> = \[`...Tuple<T, N>`, `...T[]`\]

Defined in: [array.ts:59](../src/array.ts#L59)

Creates an array type with a minimum length of `N`.

The first `N` elements are required, and any additional elements
are optional and of the same type `T`.

## Type Parameters

### T

`T`

The element type

### N

`N` _extends_ `number`

The minimum required length

## Example

```ts
type Result = MinLengthArray<string, 2>;
//   ^?
// [string, string, ...string[]]

//@ts-expect-error - requires at least 2 elements
const invalid: Result = ["hello"];
```
