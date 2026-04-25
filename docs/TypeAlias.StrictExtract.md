[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / StrictExtract

# Type Alias: StrictExtract\<T, U\>

> **StrictExtract**\<`T`, `U`\> = `Extract`\<`T`, `U`\>

Defined in: [union.ts:170](../src/union.ts#L170)

A stricter version of `Extract` that enforces valid extraction shapes.

`StrictExtract` tries to prevent accidentally extracting
values that could never exist in `T`.

## Type Parameters

### T

`T`

The source union type

### U

`U` _extends_ `ExcludeExtractConstraint`\<`T`\>

The extraction type (must conform to `T`)

## Examples

```ts
type Result = StrictExtract<"a" | "b" | "c", "a">;
//   ^?
// "a"
```

```ts
type Input = { type: "a"; value: string } | { type: "b"; value: number };

type Result = StrictExtract<Input, { type: "a" }>;
//   ^?
// { type: "a"; value: string }
```

```ts
type Input = { a: string } | { b: number };

type Invalid = StrictExtract<
  Input,
  //@ts-expect-error - not compatible with any member of Input
  { c: boolean }
>;
```
