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
 * type Result = ValueOf<{ a: string; b: number }>;
 * //   ^?
 * // string | number
 *
 * @example
 * type Result = ValueOf<{ a: string; b: number; c: boolean }, "a" | "c">;
 * //   ^?
 * // string | boolean
 *
 * @example
 * type Result = ValueOf<
 *   | { a: string }
 *   | { b: number }
 * >;
 * //   ^?
 * // string | number | undefined
 */
export type ValueOf<T, K extends UnionKey<T> = UnionKey<T>> = Normalize<T>[K];

export type Suggestion<Options extends Base, Base = string> =
	| Options
	| (Base & {});

export type Satisfies<T extends Base, Base> =
	Exclude<UnionKey<T>, UnionKey<Base>> extends never
		? T
		: CustomTypeError<{
				message: "type may only specify known fields";
				unknownFields: Exclude<UnionKey<T>, UnionKey<Base>>;
			}>;
