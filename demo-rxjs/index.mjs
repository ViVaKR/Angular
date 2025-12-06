import { Observable, range } from 'rxjs'

const obs = new Observable((subscriber) => {
    subscriber.next(123);
    setTimeout(() => {
        subscriber.next(567);
        subscriber.complete();
    }, 1000);
});

const obsSubscription = obs.subscribe({
    next: x => console.log(x)
});

obsSubscription.unsubscribe();

const numbers = range(1, 5);
console.log('just before subscribe');
const subscription = numbers.subscribe({
    next(x) {
        console.log(`got value: ${x}`);
    },
    error(err) {
        console.err(`something wrong occurred: ${err}`);
    },
    complete() {
        console.log('done')
    }
});
console.log('just after subscribe');

subscription.unsubscribe();
