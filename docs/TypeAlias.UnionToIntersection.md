[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / UnionToIntersection

# Type Alias: UnionToIntersection\<T\>

> **UnionToIntersection**\<`T`\> = `T` _extends_ `T` ? (`value`) => `void` : `never` _extends_ (`value`) => `void` ? `R` & `T` : `never`

Defined in: [union.ts:189](../src/union.ts#L189)

Converts a union type into an intersection type.

## Type Parameters

### T

`T`

The union type to convert

## Example

```ts
type Result = UnionToIntersection<{ a: string } | { b: number }>;
//   ^?
// { a: string } & { b: number }
```
