[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / TypeGuard

# Type Alias: TypeGuard\<Target, Source\>

> **TypeGuard**\<`Target`, `Source`\> = (`value`) => `value is Target`

Defined in: [function.ts:35](../src/function.ts#L35)

Represents a type guard function that narrows a value from `Source` to `Target`.

A `TypeGuard` is a function that takes a value of type `Source` and returns
a boolean indicating whether the value is of type `Target`. When it returns
`true`, TypeScript narrows the value to `Target`.

## Type Parameters

### Target

`Target` _extends_ `Source`

The type to narrow to

### Source

`Source` = `unknown`

The input type (defaults to `unknown`)

## Parameters

### value

`Source`

## Returns

`value is Target`

## Examples

```ts
const isString: TypeGuard<string> = (value: unknown) =>
  typeof value === "string";

const value: unknown = "hello";

if (isString(value)) {
  // value is now string
  value.toUpperCase();
}
```

```ts
type Input = string | number;

const isNumber: TypeGuard<number, Input> = (value: Input) =>
  typeof value === "number";

const value: Input = 42;

if (isNumber(value)) {
  // value is now number
  value.toFixed(2);
}
```
