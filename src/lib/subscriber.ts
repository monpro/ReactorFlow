// This class implements Observer to handle next, error, and complete methods
import {Observer} from "../types/observer";

export default class Subscriber<T> implements Observer<T> {
    private isUnsubscribed = false; // Flag to indicate if the subscriber is unsubscribed
    private readonly onUnsubscribe?: () => void; // Optional cleanup function

    constructor(private observer: Observer<T>, onUnsubscribe?: () => void) {
        this.onUnsubscribe = onUnsubscribe;
    }
    next(value: T) {
        if (!this.isUnsubscribed && this.observer.next) {
            this.observer.next(value);
        }
    }

    error(err: Error) {
        if (!this.isUnsubscribed && this.observer.error) {
            this.observer.error(err);
        }
        this.unsubscribe()
    }

    complete() {
        if (!this.isUnsubscribed && this.observer.complete) {
            this.observer.complete()
        }
        this.unsubscribe()
    }

    // Clean up resources, preventing memory leaks
    unsubscribe(): void {
        if (!this.isUnsubscribed) {
            this.isUnsubscribed = true
            if (this.onUnsubscribe) {
                this.onUnsubscribe()
            }
        }

        // Add logic here to handle unsubscription, like removing listeners
    }
}