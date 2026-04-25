[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / Suggestion

# Type Alias: Suggestion\<Options, Base\>

> **Suggestion**\<`Options`, `Base`\> = `Options` \| `Base` & `object`

Defined in: [general.ts:57](../src/general.ts#L57)

Provides autocomplete suggestions while still allowing any value of `Base`.

This is useful when you want to suggest a set of known options in editors,
but not restrict the type strictly to those options.

## Type Parameters

### Options

`Options` _extends_ `Base`

Suggested literal values

### Base

`Base` = `string`

The underlying type (defaults to `string`)

## Examples

```ts
type Color = Suggestion<"red" | "blue">;

const a: Color = "red"; // ✅ suggested
const b: Color = "green"; // ✅ allowed, not suggested
```

```ts
type Size = Suggestion<1 | 2 | 3, number>;

const a: Size = 2; // ✅ suggested
const b: Size = 10; // ✅ allowed, not suggested
```
