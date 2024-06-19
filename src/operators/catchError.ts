import Observable from "../lib/observable";

/**
 * Handles errors within an Observable sequence. If an error occurs, this operator will intercept
 * it to allow for custom error handling and optionally continue the observable sequence or
 * start a new one. It is particularly useful for recovering from transient errors or providing
 * fallback values.
 *
 * @param errorHandler A function that takes an error and the source Observable, and returns a new Observable.
 *                     The function can decide how to handle the error, either by swallowing it and
 *                     continuing with a default or fallback value, or by rethrowing or escalating the error.
 * @returns A function that takes an Observable and returns a new Observable that either handles or recovers from errors.
 *
 * Example usage:
 * const source = new Observable<number>(subscriber => {
 *   subscriber.next(1);
 *   subscriber.error(new Error("Oops!"));
 * });
 * const safeObservable = source.pipe(
 *   catchError((err, caught) => {
 *     console.error(`Caught error: ${err.message}`);
 *     return Observable.of(0); // Continues with a fallback value
 *   })
 * );
 * // This will log "Caught error: Oops!" and then output 0
 */
export function catchError<T>(errorHandler: (error: Error, caught: Observable<T>) => Observable<T>): (source: Observable<T>) => Observable<T> {
    return source => new Observable<T>(subscriber => {
        source.subscribe({
            next(value){
                subscriber.next(value)
            },
            error(err){
                try {
                    errorHandler(err, source).subscribe(subscriber)
                } catch (e) {
                    subscriber.error(e as Error)
                }
            },
            complete() {
                subscriber.complete();
            }
        })
    })
}