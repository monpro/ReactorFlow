import Observable from "../lib/observable";


/**
 * Skips the first 'count' items emitted by an Observable and starts emitting from the (count+1)th item.
 *
 * @param count The number of items to skip.
 * @returns A function that takes an Observable and returns a new Observable that skips the first 'count' items.
 *
 * Example usage:
 * const numberStream = new Observable<number>(subscriber => {
 *   [1, 2, 3, 4, 5].forEach(item => subscriber.next(item));
 *   subscriber.complete();
 * });
 * const skipFirstTwo = numberStream.pipe(
 *   skip(2)
 * );
 * // This will output 3, 4, 5
 */
export function skip<T>(count: number): (source: Observable<T>) => Observable<T> {
    return (source) => new Observable<T>((subscriber) => {
        let skipped = 0;
        const subscription = source.subscribe({
            next(value) {
                if (skipped >= count) {
                    subscriber.next(value)
                } else {
                    skipped++
                }
            },
            error(error: Error) {
                subscriber.error(error)
            },
            complete() {
                subscriber.complete()
            }
        })
    })
}