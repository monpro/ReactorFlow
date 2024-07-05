import Observable from "../lib/observable";
import {switchMap} from "../operators/switchMap";

const userActions = new Observable<string>(subscriber => {
    setTimeout(() => subscriber.next('action1'), 100);
    setTimeout(() => subscriber.next('action2'), 300); // Interrupts the first action
    setTimeout(() => subscriber.next('action3'), 800); // Does not interrupt the second action
});

const fetchData = (action: string) => new Observable<string>(sub => {
    setTimeout(() => {
        sub.next(`Data for ${action}`);
        sub.complete();
    }, 500);
});

const results = userActions.pipe(
    switchMap(action => fetchData(action))
);

results.subscribe({
    next: value => console.log(value),
    error: err => console.error(err),
    complete: () => console.log('Completed fetching all data.')
});
