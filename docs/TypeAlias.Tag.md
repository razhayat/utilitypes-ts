[**utilitypes-ts v1.0.1**](README.md)

---

[utilitypes-ts](README.md) / Tag

# Type Alias: Tag\<T, Tags\>

> **Tag**\<`T`, `Tags`\> = `T` & `object`

Defined in: [tag.ts:33](../src/tag.ts#L33)

Attaches one or more compile-time "tags" to a type `T`.

This is a branding utility that allows you to distinguish otherwise
identical types by adding invisible markers using a `unique symbol`.

Tagged types are not interchangeable unless they share the same tags.
Multiple tags can be combined by providing a union of keys.

## Type Declaration

### \[tag\]

> **\[tag\]**: `Record`\<`Tags`, `void`\>

## Type Parameters

### T

`T`

The base type

### Tags

`Tags` _extends_ `PropertyKey`

One or more tag identifiers

## Examples

```ts
type UserId = Tag<string, "UserId">;
type PostId = Tag<string, "PostId">;

const userId: UserId = "123" as UserId;
const postId: PostId = "123" as PostId;

//@ts-expect-error - different tags
const invalid: UserId = postId;
```

```ts
type A = Tag<string, "a" | "b">;

// Equivalent to having both tags
type B = Tag<Tag<string, "a">, "b">;
```
