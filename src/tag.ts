declare const tag: unique symbol;

/**
 * Attaches one or more compile-time "tags" to a type `T`.
 *
 * This is a branding utility that allows you to distinguish otherwise
 * identical types by adding invisible markers using a `unique symbol`.
 *
 * Tagged types are not interchangeable unless they share the same tags.
 * Multiple tags can be combined by providing a union of keys.
 *
 * @template T - The base type
 * @template Tags - One or more tag identifiers
 *
 * @example
 * type UserId = Tag<string, "UserId">;
 * type PostId = Tag<string, "PostId">;
 *
 * const userId: UserId = "123" as UserId;
 * const postId: PostId = "123" as PostId;
 *
 * //@ts-expect-error - different tags
 * const invalid: UserId = postId;
 *
 * @example <caption>Multiple tags</caption>
 * type A = Tag<string, "a" | "b">;
 *
 * // Equivalent to having both tags
 * type B = Tag<Tag<string, "a">, "b">;
 */
export type Tag<T, Tags extends PropertyKey> = T & {
	[tag]: Record<Tags, void>;
};
