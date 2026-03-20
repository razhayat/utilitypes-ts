export type TypeGuard<Target extends Source, Source = unknown> = (
	value: Source,
) => value is Target;
