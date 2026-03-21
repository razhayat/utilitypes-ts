declare const tag: unique symbol;

export type Tag<T, Tags extends PropertyKey> = T & {
	[tag]: Record<Tags, void>;
};
