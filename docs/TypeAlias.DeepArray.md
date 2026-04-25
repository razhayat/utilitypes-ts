[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / DeepArray

# Type Alias: DeepArray\<T\>

> **DeepArray**\<`T`\> = (`T` \| `DeepArray`\<`T`\>)[]

Defined in: [array.ts:72](../src/array.ts#L72)

Recursively defines an array of `T` where elements can be nested arrays
of arbitrary depth.

## Type Parameters

### T

`T`

The element type

## Example

```ts
const a: DeepArray<string> = ["a", "b"];
const b: DeepArray<string> = ["a", ["b", "c", []], [["d"]]];
```
