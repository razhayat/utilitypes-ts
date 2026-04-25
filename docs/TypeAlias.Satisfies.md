[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / Satisfies

# Type Alias: Satisfies\<T, Base\>

> **Satisfies**\<`T`, `Base`\> = `Exclude`\<[`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>, [`UnionKey`](TypeAlias.UnionKey.md)\<`Base`\>\> _extends_ `never` ? `T` : [`CustomTypeError`](TypeAlias.CustomTypeError.md)\<\{ `message`: `"type may only specify known fields"`; `unknownFields`: `Exclude`\<[`UnionKey`](TypeAlias.UnionKey.md)\<`T`\>, [`UnionKey`](TypeAlias.UnionKey.md)\<`Base`\>\>; \}\>

Defined in: [general.ts:90](../src/general.ts#L90)

Type-level equivalent of the `satisfies` operator in TypeScript.

Ensures that `T` conforms to `Base`.
If `T` includes keys not present in `Base`, a compile-time error
is produced by returning `CustomTypeError`, listing the unknown fields.

## Type Parameters

### T

`T` _extends_ `Base`

The type to validate

### Base

`Base`

The expected shape

## Examples

```ts
type Result = Satisfies<
  //@ts-expect-error { a: string } does not satisfy { a: string; b: number }
  { a: string },
  { a: string; b: number }
>;
```

```ts
type Result = Satisfies<{ a: string; c: boolean }, { a: string }>;
//   ^?
// {
//	[error]: {
//		message: "type may only specify known fields";
//		unknownFields: "c";
//	}
// }
```
