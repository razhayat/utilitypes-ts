[**utilitypes-ts v1.0.0**](README.md)

---

[utilitypes-ts](README.md) / PartialRecord

# Type Alias: PartialRecord\<K, V\>

> **PartialRecord**\<`K`, `V`\> = `Partial`\<`Record`\<`K`, `V`\>\>

Defined in: [object.ts:80](../src/object.ts#L80)

Equivalent to `Partial<Record<K, V>>`.

## Type Parameters

### K

`K` _extends_ `PropertyKey`

### V

`V`

## Example

```ts
type Result = PartialRecord<"a" | "b", number>;
//   ^?
// {
//   a?: number;
//   b?: number;
// };
```
