[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / UnionKey

# Type Alias: UnionKey\<T\>

> **UnionKey**\<`T`\> = `T` _extends_ `T` ? keyof `T` : `never`

Defined in: [union.ts:17](../src/union.ts#L17)

Extracts all keys from a union type.

Unlike `keyof`, which only returns keys common to all members,
this type returns all keys across the given union

## Type Parameters

### T

`T`

## Example

```ts
type Result = UnionKey<{ a: string } | { b: number }>;
//   ^?
// "a" | "b"
```
