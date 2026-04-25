[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / Prettify

# Type Alias: Prettify\<T\>

> **Prettify**\<`T`\> = `{ [K in keyof T]: T[K] }` & `object`

Defined in: [object.ts:99](../src/object.ts#L99)

Forces TypeScript to expand and display a type as a plain object.

This is mainly useful for improving readability in editor hovers
and tooltips, especially for complex types involving intersections
or mapped types.

It does not change the actual type, it only affects how it is shown.

## Type Parameters

### T

`T`

The type to simplify for display

## Example

```ts
type Result = Prettify<{ a: string } & { b: number }>;
//   ^?
// { a: string; b: number }
```
