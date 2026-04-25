[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / KeyOfType

# Type Alias: KeyOfType\<T, V\>

> **KeyOfType**\<`T`, `V`\> = keyof `{ [K in UnionKey<T> as Normalize<T>[K] extends V ? K : never]: void }`

Defined in: [object.ts:127](../src/object.ts#L127)

Extracts keys from `T` whose value types extend `V`.

## Type Parameters

### T

`T`

The target type

### V

`V`

The value type to match against

## Examples

```ts
type Result = KeyOfType<{ a: string; b: number; c: string }, string>;
//   ^?
// "a" | "c"
```

```ts
type A = { a: string };
type B = { b: number };

type Result = KeyOfType<A | B, string | undefined>;
//   ^?
// "a"
```
