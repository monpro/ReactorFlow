import Observable from "../lib/observable";


/**
 * Transforms the items emitted by an Observable by applying a function to each item.
 * This operator allows you to manipulate or change the data being emitted by the observable
 * before it reaches the subscriber. For instance, you can multiply numbers, change strings,
 * or modify object properties.
 *
 * @param transformFn A function that takes each emitted item as input and returns a transformed item.
 * @returns A function that takes an Observable and returns a new Observable emitting the transformed items.
 *
 * Example usage:
 * const numberObservable = new Observable<number>(subscriber => {
 *   subscriber.next(1);
 *   subscriber.next(2);
 *   subscriber.next(3);
 * });
 * const doubledNumbers = numberObservable.pipe(
 *   map(num => num * 2)
 * );
 * // This will output 2, 4, 6
 */
function map<T, U>(transformFn: (value: T) => U): (source: Observable<T>) => Observable<U> {
    // This is the inner function that gets returned by the outer function 'map'
    return (source) => new Observable<U>((subscriber) => {
        // Subscribe to the 'source' Observable<T>
        source.subscribe({
            next(value) {
                // Apply the transformation function to each value and emit the result
                subscriber.next(transformFn(value));
            },
            error(err) {
                // Pass any errors along to the subscriber of the new Observable<U>
                subscriber.error(err);
            },
            complete() {
                // Notify the subscriber that the source observable has completed
                subscriber.complete();
            }
        });
    });
}