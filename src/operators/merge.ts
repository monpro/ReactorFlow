import Observable from "../lib/observable";


/**
 * Combines multiple Observables into one by merging their emissions into a single Observable.
 *
 * @param observables An array of Observables to be merged.
 * @returns A new Observable that emits items from all input Observables as they come.
 *
 * Example usage:
 * const observable1 = new Observable<number>(subscriber => { subscriber.next(1); });
 * const observable2 = new Observable<number>(subscriber => { subscriber.next(2); });
 * const merged = merge(observable1, observable2);
 * // This will output 1, 2
 */
export function merge<T>(...observables: Observable<T>[]): Observable<T> {
    return new Observable<T>(subscriber => {
        observables.forEach(observable => {
            observable.subscribe({
                next(value: T) {
                    subscriber.next(value)
                },
                error(error: Error) {
                    subscriber.error(error)
                },
                complete() {
                    subscriber.complete()
                }
            })
        })
    })
}