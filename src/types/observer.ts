// Observer interface for handling values, errors, and completion notifications
export interface Observer<T> {
    next?(value: T): void
    error?(error: Error): void
    complete?(): void
}

// Subscription interface allows unsubscribing from an observable
export interface Subscription{
    unsubscribe(): void
}