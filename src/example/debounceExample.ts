import Observable from "../lib/observable";
import {debounceTime} from "../operators/debounceTime";

/**
 * Simulates typing in a search box where users type in search queries.
 * The search request is only sent after the user has stopped typing for 500 milliseconds.
 */
const simulateTyping = new Observable<string>(subscriber => {
    const inputs = ['h', 'he', 'hel', 'hell', 'hello'];
    inputs.forEach((input, index) => {
        setTimeout(() => subscriber.next(input), index * 100);  // User types each letter 100ms apart
    });
    setTimeout(() => subscriber.complete(), inputs.length * 100 + 500); // Completes observable after last input
});

const debouncedInput = simulateTyping.pipe(
    debounceTime(500) // Only emit the last value if there's a 500ms pause
);

debouncedInput.subscribe({
    next: value => console.log(`Search query sent: ${value}`),
    error: err => console.error(err),
    complete: () => console.log('No more typing, stream completed.')
});