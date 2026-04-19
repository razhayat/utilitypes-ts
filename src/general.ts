import { CustomTypeError } from "./error";
import { Normalize, UnionKey } from "./union";

/**
 * Extracts the value types of an object `T`.
 *
 * By default, it returns a union of all property values.
 * You can optionally provide a subset of keys `K` to extract
 * only specific value types.
 *
 * @template T - The target object type
 * @template K - Keys of `T` to extract values from (defaults to all keys)
 *
 * @example
 *
 * type Result = ValueOf<{ a: string; b: number }>;
 * //   ^?
 * // string | number
 *
 * @example <caption>Accepts keys</caption>
 *
 * type Result = ValueOf<{ a: string; b: number; c: boolean }, "a" | "c">;
 * //   ^?
 * // string | boolean
 *
 * @example <caption>Works with unions</caption>
 *
 * type Result = ValueOf<{ a: string } | { b: number }>;
 * //   ^?
 * // string | number | undefined
 */
export type ValueOf<T, K extends UnionKey<T> = UnionKey<T>> = Normalize<T>[K];

/**
 * Provides autocomplete suggestions while still allowing any value of `Base`.
 *
 * This is useful when you want to suggest a set of known options in editors,
 * but not restrict the type strictly to those options.
 *
 * @template Options - Suggested literal values
 * @template Base - The underlying type (defaults to `string`)
 *
 * @example
 *
 * type Color = Suggestion<"red" | "blue">;
 *
 * const a: Color = "red";   // ✅ suggested
 * const b: Color = "green"; // ✅ allowed, not suggested
 *
 * @example <caption>Works with non-string base types</caption>
 *
 * type Size = Suggestion<1 | 2 | 3, number>;
 *
 * const a: Size = 2;  // ✅ suggested
 * const b: Size = 10; // ✅ allowed, not suggested
 */
export type Suggestion<Options extends Base, Base = string> =
	| Options
	| (Base & {});

/**
 * Type-level equivalent of the `satisfies` operator in TypeScript.
 *
 * Ensures that `T` conforms to `Base`.
 * If `T` includes keys not present in `Base`, a compile-time error
 * is produced by returning `CustomTypeError`, listing the unknown fields.
 *
 * @template T - The type to validate
 * @template Base - The expected shape
 *
 * @example
 *
 * type Result = Satisfies<
 * 	//@ts-expect-error { a: string } does not satisfy { a: string; b: number }
 *    { a: string },
 *    { a: string; b: number }
 * >;
 *
 * @example <caption>Extra fields are rejected (like `satisfies`)</caption>
 *
 * type Result = Satisfies<{ a: string; c: boolean }, { a: string }>;
 * //   ^?
 * // {
 * //	[error]: {
 * //		message: "type may only specify known fields";
 * //		unknownFields: "c";
 * //	}
 * // }
 */
export type Satisfies<T extends Base, Base> =
	Exclude<UnionKey<T>, UnionKey<Base>> extends never
		? T
		: CustomTypeError<{
				message: "type may only specify known fields";
				unknownFields: Exclude<UnionKey<T>, UnionKey<Base>>;
			}>;
