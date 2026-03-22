export type ValueOf<T, K extends keyof T = keyof T> = T[K];

export type Suggestion<Options extends Base, Base = string> =
	| Options
	| (Base & {});
