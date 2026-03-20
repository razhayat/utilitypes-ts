type BuildTuple<
	T,
	N extends number,
	Current extends T[],
> = N extends Current["length"]
	? Current
	: number extends N
		? T[]
		: BuildTuple<T, N, [...Current, T]>;

export type Tuple<T, N extends number> = BuildTuple<T, N, []>;

export type MinLengthArray<T, N extends number> = [...Tuple<T, N>, ...T[]];

export type DeepArray<T> = (T | DeepArray<T>)[];
