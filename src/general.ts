import { CustomTypeError } from "./error";
import { Normalize, UnionKey } from "./union";

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
