type BuildTuple<
	T,
	N extends number,
	Curr extends unknown[],
> = N extends Curr["length"] ? Curr : BuildTuple<T, N, [...Curr, T]>;

export type Tuple<T, N extends number> = BuildTuple<T, N, []>;
