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
 *
 * type Result = Tuple<string, 3>;
 * //   ^?
 * // [string, string, string]
 *
 * @example <caption>Passing `number`</caption>
 *
 * type Result = Tuple<boolean, number>;
 * //   ^?
 * // boolean[]
 *
 * @example <caption>Zero length array</caption>
 *
 * type Result = Tuple<number, 0>;
 * //   ^?
 * // []
 *
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
 *
 * type Result = MinLengthArray<string, 2>;
 * //   ^?
 * // [string, string, ...string[]]
 *
 * //@ts-expect-error - requires at least 2 elements
 * const invalid: Result = ["hello"];
 */
export type MinLengthArray<T, N extends number> = [...Tuple<T, N>, ...T[]];

/**
 * Recursively defines an array of `T` where elements can be nested arrays
 * of arbitrary depth.
 *
 * @template T - The element type
 *
 * @example
 *
 * const a: DeepArray<string> = ["a", "b"];
 * const b: DeepArray<string> = ["a", ["b", "c", []], [["d"]]];
 */
export type DeepArray<T> = (T | DeepArray<T>)[];
