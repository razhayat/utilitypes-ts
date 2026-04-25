[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / Tuple

# Type Alias: Tuple\<T, N\>

> **Tuple**\<`T`, `N`\> = `BuildTuple`\<`T`, `N`, \[\]\>

Defined in: [array.ts:39](../src/array.ts#L39)

Creates a tuple of length `N` where each element is of type `T`.

If `N` is a specific number literal, the result is a fixed-length tuple.
If `N` is the general `number` type, the result falls back to `T[]`.

## Type Parameters

### T

`T`

The element type

### N

`N` _extends_ `number`

The desired tuple length

## Examples

```ts
type Result = Tuple<string, 3>;
//   ^?
// [string, string, string]
```

```ts
type Result = Tuple<boolean, number>;
//   ^?
// boolean[]
```

```ts
type Result = Tuple<number, 0>;
//   ^?
// []
```
