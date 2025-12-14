import { Observable } from "rxjs";


let count = 0;

const observable = new Observable(function subscribe(subscriber) {
    const intervalId = setInterval(() => {
        subscriber.next('hi');
        count++;
    }, 1000);

    return function unsubscribe() {
        clearInterval(intervalId);
    }
});

const subscription = observable.subscribe({
    next(x) {
        console.log(x);
    },
    complete() {
        console.log('done')
    }
});

setTimeout(() => {
    subscription.unsubscribe();
}, 5000);
