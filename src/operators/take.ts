import Observable from "../lib/observable";

/**
 * Limits the number of emissions to a specified number of the first items.
 *
 * @param count The maximum number of items to emit.
 * @returns A function that takes an Observable and returns a new Observable emitting only the first 'count' items.
 *
 * Example usage:
 * const numberStream = new Observable<number>(subscriber => {
 *   [1, 2, 3, 4, 5].forEach(item => subscriber.next(item));
 *   subscriber.complete();
 * });
 * const firstThree = numberStream.pipe(
 *   take(3)
 * );
 * // This will output 1, 2, 3
 */
export function take<T>(count: number): (source: Observable<T>) => Observable<T> {
    return (source) => new Observable<T>(subscriber => {
        let emitCount = 0
        const subscription = source.subscribe({
            next(value) {
                if (emitCount < count) {
                    subscriber.next(value)
                    emitCount++
                } else if (emitCount === count) {
                    subscriber.complete()
                    subscriber.unsubscribe()
                }
            },
            error(err: Error) {
                subscriber.error(err)
            },
            complete() {
                subscriber.complete()
            }
        })
    })
}