declare const error: unique symbol;

export type CustomTypeError<Data> = {
	[error]: Data;
};

export type CustomTypeErrorData<T extends CustomTypeError<unknown>> =
	T extends CustomTypeError<infer Data> ? Data : never;
