type BuildTuple<
	T,
	N extends number,
	Current extends T[],
> = N extends Current["length"]
	? Current
	: number extends N
		? T[]
		: BuildTuple<T, N, [...Current, T]>;

/**
 * Creates a tuple of length `N` where each element is of type `T`.
 *
 * If `N` is a specific number literal, the result is a fixed-length tuple.
 * If `N` is the general `number` type, the result falls back to `T[]`.
 *
 * @template T - The element type
 * @template N - The desired tuple length
 *
 * @example
 * type Result = Tuple<string, 3>;
 * //   ^?
 * // [string, string, string]
 *
 * @example
 * type Result = Tuple<number, 0>;
 * //   ^?
 * // []
 *
 * @example
 * // Falls back to array when length is not a literal
 * type Result = Tuple<boolean, number>;
 * //   ^?
 * // boolean[]
 */
export type Tuple<T, N extends number> = BuildTuple<T, N, []>;

/**
 * Creates an array type with a minimum length of `N`.
 *
 * The first `N` elements are required, and any additional elements
 * are optional and of the same type `T`.
 *
 * @template T - The element type
 * @template N - The minimum required length
 *
 * @example
 * type Result = MinLengthArray<string, 1>;
 * //   ^?
 * // [string, ...string[]]
 *
 * @example
 * //@ts-expect-error - requires at least 2 elements
 * const invalid: MinLengthArray<boolean, 2> = [true];
 */
export type MinLengthArray<T, N extends number> = [...Tuple<T, N>, ...T[]];

export type DeepArray<T> = (T | DeepArray<T>)[];
