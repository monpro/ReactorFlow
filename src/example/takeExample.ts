import Observable from "../lib/observable";
import {take} from "../operators/take";

const numberStream = new Observable<number>(subscriber => {
    [1, 2, 3, 4, 5].forEach(item => subscriber.next(item))
    subscriber.complete()
});

const firstThree = numberStream.pipe(take(3))

firstThree.subscribe({
    next(value: number) {
        console.log(value)
    },
    error(error: Error) {
        console.log(error)
    },
    complete() {
        console.log("complete")
    }
})