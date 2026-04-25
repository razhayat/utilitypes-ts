[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / Unbind

# Type Alias: Unbind\<T\>

> **Unbind**\<`T`\> = `Omit`\<[`Normalize`](TypeAlias.Normalize.md)\<`T`\>, `never`\>

Defined in: [union.ts:81](../src/union.ts#L81)

Collapses a union type into a single object type by merging all members.

Each property becomes:

- A union of all possible value types across the union members
- Optional if it does not exist in every member

This effectively removes the relationship between fields (i.e. "unbinds"
discriminated unions), making all properties independent.

## Type Parameters

### T

`T`

The target union type

## Example

```ts
type Result = Unbind<
  { kind: "success"; data: string } | { kind: "error"; error: Error }
>;
//   ^?
// {
//   kind: "success" | "error";
//   data?: string;
//   error?: Error;
// }
```
