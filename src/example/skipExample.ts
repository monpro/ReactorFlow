import Observable from "../lib/observable";
import {skip} from "../operators/skip";

const numberStream = new Observable<number>(subscriber => {
    [1, 2, 3, 4, 5].forEach(item => subscriber.next(item))
    subscriber.complete()
});


const lastThreeStream = numberStream.pipe(skip(2))

lastThreeStream.subscribe({
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