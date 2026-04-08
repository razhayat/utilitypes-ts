/**
 * Represents a type guard function that narrows a value from `Source` to `Target`.
 *
 * A `TypeGuard` is a function that takes a value of type `Source` and returns
 * a boolean indicating whether the value is of type `Target`. When it returns
 * `true`, TypeScript narrows the value to `Target`.
 *
 * @template Target - The type to narrow to
 * @template Source - The input type (defaults to `unknown`)
 *
 * @example
 * const isString: TypeGuard<string> = (value: unknown) => typeof value === "string";
 *
 * const value: unknown = "hello";
 *
 * if (isString(value)) {
 *   // value is now string
 *   value.toUpperCase();
 * }
 *
 * @example
 * // Narrowing within a union
 * type Input = string | number;
 *
 * const isNumber: TypeGuard<number, Input> = (value: Input) => typeof value === "number";
 *
 * const value: Input = 42;
 *
 * if (isNumber(value)) {
 *   // value is now number
 *   value.toFixed(2);
 * }
 */
export type TypeGuard<Target extends Source, Source = unknown> = (
	value: Source,
) => value is Target;
