[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / StrictExclude

# Type Alias: StrictExclude\<T, U\>

> **StrictExclude**\<`T`, `U`\> = `Exclude`\<`T`, `U`\>

Defined in: [union.ts:128](../src/union.ts#L128)

A stricter version of `Exclude` that enforces valid exclusion shapes.

`StrictExclude` tries to prevent accidentally excluding
values that could never exist in `T`.

## Type Parameters

### T

`T`

The source union type

### U

`U` _extends_ `ExcludeExtractConstraint`\<`T`\>

The exclusion type (must conform to `T`)

## Examples

```ts
type Result = StrictExclude<"a" | "b" | "c", "a">;
//   ^?
// "b" | "c"
```

```ts
type Input = { type: "a"; value: string } | { type: "b"; value: number };

type Result = StrictExclude<Input, { type: "a" }>;
//   ^?
// { type: "b"; value: number }
```

```ts
type Input = { a: string } | { b: number };

type Invalid = StrictExclude<
  Input,
  //@ts-expect-error - not compatible with any member of Input
  { c: boolean }
>;
```
