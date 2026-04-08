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

export type MinLengthArray<T, N extends number> = [...Tuple<T, N>, ...T[]];

export type DeepArray<T> = (T | DeepArray<T>)[];
