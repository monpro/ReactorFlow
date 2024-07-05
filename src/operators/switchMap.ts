import Observable from "../lib/observable";
import {Subscription} from "../types/observer";

/**
 * Projects each source value to an Observable which is merged in the output Observable,
 * emitting values only from the most recently projected Observable.
 *
 * @param project A function that transforms an input value into an Observable.
 * @returns A function that takes an Observable and returns a new Observable that emits values from the most recent inner Observable.
 *
 * Example usage:
 * const clicks = new Observable<string>(subscriber => {
 *   document.addEventListener('click', () => subscriber.next('Clicked'));
 * });
 * const projected = clicks.pipe(
 *   switchMap(event => new Observable<Date>(sub => sub.next(new Date())))
 * );
 * // Outputs the current Date every time the user clicks
 */
export function switchMap<T, U>(project: (value: T) => Observable<U>): (source: Observable<T>) => Observable<U> {
    return (source) => new Observable(subscriber => {
        let innerSubscription: Subscription
        let outerCompleted = false; // Flag to keep track of the source observable's completion state
        const sourceSubscription = source.subscribe({
            next(value: T) {
                if (innerSubscription) {
                    innerSubscription.unsubscribe();
                }
                innerSubscription = project(value).subscribe({
                    next(innerValue: U) {
                        subscriber.next(innerValue)
                    },
                    error(error: Error) {
                        subscriber.error(error)
                    },
                    complete() {
                        if (outerCompleted) {
                            subscriber.complete()
                        }
                    }
                })
            },
            error(error: Error) {
                subscriber.error(error)
            },
            complete() {
                outerCompleted = true
                // If there's no active inner observable, complete the outer observable
                if (!innerSubscription) {
                    subscriber.complete();
                }
            }
        })
        return () => {
            sourceSubscription.unsubscribe();
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
        };
    })
}