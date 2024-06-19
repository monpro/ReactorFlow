import Observable from "./lib/observable";
import Subscriber from "./lib/subscriber";


const numberObservable = new Observable<number>((subscriber => {
    let count = 1
    const intervalId = setInterval(() => {
        subscriber.next(count++)
        if (count > 5) {
            subscriber.complete()
            clearInterval(intervalId)
        }
    }, 1000)

    return () => clearInterval(intervalId)
}))

const subscriber = new Subscriber<number>({
    next(value) {
        console.log(`Received ${value}`)
    },
    error(err: Error) {
        console.log(`Error: ${err}`)
    },
    complete() {
        console.log('Subscriber complete')
    }
})

const subscription = numberObservable.subscribe(subscriber)

setTimeout(() => {
    subscriber.unsubscribe()
    console.log('Unsubscribe manually after 4 seconds')
}, 4000)