import Observable from "../lib/observable";


/**
 * Delays the emission of an item from the source Observable until a particular time span has passed
 * without another source item being emitted. The debounce operator helps manage a stream of events
 * that may be emitted in quick succession, ensuring that only the last of such events is processed
 * after a period of silence.
 *
 * @param dueTime The delay in milliseconds for which to wait before emitting the last item.
 * @returns A function that takes an Observable and returns a new Observable with the debounce logic applied.
 *
 * Example usage:
 * const inputObservable = new Observable<string>(subscriber => {
 *   subscriber.next('a');
 *   setTimeout(() => subscriber.next('b'), 100);
 *   setTimeout(() => subscriber.next('c'), 300);
 * });
 * const debounced = inputObservable.pipe(
 *   debounceTime(200)
 * );
 * // This will output 'b' and 'c' only. 'a' is ignored because 'b' comes within 200ms.
 */
export function debounceTime<T>(dueTime: number): (source: Observable<T>) => Observable<T> {
    return source => new Observable(subscriber => {
        let lastTimeout: NodeJS.Timeout | null = null;
        let lastValue: T | null = null;
        let hasValue = false;

        const subscription = source.subscribe({
            next(value: T) {
                hasValue = true
                lastValue = value
                if (lastTimeout) {
                    clearTimeout(lastTimeout)
                }
                lastTimeout = setTimeout(() => {
                    if (hasValue) {
                        subscriber.next(lastValue as T);
                        hasValue = false
                    }
                }, dueTime)
            },
            error(err) {
                subscriber.error(err)
            },
            complete() {
                if (lastTimeout) {
                    clearTimeout(lastTimeout)
                }
                if (hasValue) {
                    subscriber.next(lastValue as T)
                    hasValue = false
                }
                subscriber.complete()
            }
        })
        return () => {
            if (lastTimeout) clearTimeout(lastTimeout)
            subscription.unsubscribe()
        }
    })

}