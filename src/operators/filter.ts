import Observable from "../lib/observable";

/**
 * Emits only those items from an observable that pass a specified criterion.
 * It works similarly to Array.prototype.filter, but on an observable sequence.
 *
 * @param predicate A function that evaluates each item emitted by the source Observable, returning true if it should be emitted.
 * @returns A function that takes an Observable and returns a new Observable emitting only the items that satisfy the predicate.
 *
 * Example usage:
 * const numberObservable = new Observable<number>(subscriber => {
 *   subscriber.next(1);
 *   subscriber.next(2);
 *   subscriber.next(3);
 * });
 * const filtered = numberObservable.pipe(
 *   filter(num => num > 1)
 * );
 * // This will output 2, 3
 */
export function filter<T>(predicate: (value: T) => boolean): (source: Observable<T>) => Observable<T> {
    return source => new Observable<T>(subscriber => {
        source.subscribe({
            next(value){
                if (predicate(value)){
                    subscriber.next(value)
                }
            },
            error(err) {
                subscriber.error(err)
            },
            complete() {
                subscriber.complete()
            }
        })
    })
}