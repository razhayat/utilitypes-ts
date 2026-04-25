[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / GroupBy

# Type Alias: GroupBy\<T, K\>

> **GroupBy**\<`T`, `K`\> = `{ [Key in T[K] extends PropertyKey ? T[K] : never]: T extends T ? Key extends T[K] ? T : never : never }`

Defined in: [object.ts:169](../src/object.ts#L169)

Groups a type `T` by the values of a key `K`.

## Type Parameters

### T

`T`

The target type (typically a union of objects)

### K

`K` _extends_ [`KeyOfType`](TypeAlias.KeyOfType.md)\<`T`, `PropertyKey`\>

The key to group by (must be a key of `T` with a `PropertyKey` type)

## Example

```ts
type Apple = {
  type: "fruit";
  color: "green";
};

type Banana = {
  type: "fruit";
  color: "yellow";
};

type Tomato = {
  type: "vegetable";
  color: "red";
};

type GroupedByType = GroupBy<Apple | Banana | Tomato, "type">;
//   ^?
// {
//   fruit: Apple | Banana;
//   vegetable: Tomato;
// }

type GroupedByColor = GroupBy<Apple | Banana | Tomato, "color">;
//   ^?
// {
//   green: Apple;
//   yellow: Banana;
//   red: Tomato;
// }
```
