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
}