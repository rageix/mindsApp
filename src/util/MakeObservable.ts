import { Dispatch, SetStateAction } from 'react';

/**
 * Makes an observable state that can be shared between components and hooks
 * @param target
 */
export function makeObservable<T>(target: T) {
  let listeners: Dispatch<SetStateAction<T>>[] = [];
  let value: T = target;

  function get(): T {
    return value;
  }

  function set(newValue: T) {
    if (value === newValue) return;
    value = newValue;
    listeners.forEach((v) => v(value));
  }

  function subscribe(listenerFunc: Dispatch<SetStateAction<T>>) {
    listeners.push(listenerFunc);
    return () => unsubscribe(listenerFunc);
  }

  function unsubscribe(listenerFunc: Dispatch<SetStateAction<T>>) {
    listeners = listeners.filter((v) => v !== listenerFunc);
  }

  return {
    get,
    set,
    subscribe,
  };
}
