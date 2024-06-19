// Generic class Observable that can handle data of type T
import {Observer, Subscription} from "../types/observer";
import Subscriber from "./subscriber";

export default class Observable<T> {
    // The constructor accepts a subscriber function that takes a Subscriber<T>
    constructor(private subscribeFn: (subscriber : Subscriber<T>) => void) {
    }

    // The subscribe method allows observers to listen to the observables values
    subscribe(observer: Observer<T>): Subscription {
        const subscriber = new Subscriber(observer)
        this.subscribeFn(subscriber)
        return {
            unsubscribe: () => subscriber.unsubscribe()
        }
    }


    /**
     * Applies an array of operations (operators) to an observable and returns a new observable.
     * Each operation is a function that takes an observable and returns an observable, allowing for
     * transformations of the emitted data or handling of events like errors or completions.
     *
     * The `pipe` method is a mechanism for chaining multiple operators on the source observable.
     * This chaining is essential for creating a complex sequence of data manipulation operations
     * in a readable and manageable way.
     *
     * @param operations An array of operations (functions) that each transform the observable in some way.
     * @returns An Observable that results from the sequential application of each operation on the original observable.
     *
     * Example usage:
     * const processedObservable = sourceObservable.pipe(
     *     map(data => data * 2),
     *     filter(data => data > 10)
     * );
     * This example first maps (multiplies) each data item by 2, then filters out items that are 10 or less.
     */
    pipe(...operations: Array<(source: Observable<any>) => Observable<any>>): Observable<any> {
        return operations.reduce<Observable<any>>((prev, op) => op(prev), this);
    }
}