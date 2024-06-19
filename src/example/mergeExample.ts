import Observable from "../lib/observable";
import {merge} from "../operators/merge";

const observable1 = new Observable<number>(subscriber => { subscriber.next(1); });
const observable2 = new Observable<number>(subscriber => { subscriber.next(2); });
const merged = merge(observable1, observable2);

merged.subscribe({
    next(value: number) {
        console.log(value);
    },
    error(error: Error) {
        console.log(error);
    },
    complete() {
        console.log("complete")
    }
})