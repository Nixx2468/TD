import type { EventMap } from '../types/events';

type Listener<T> = (payload: T) => void;

export class EventBus {
  private listeners = new Map<string, Set<Listener<unknown>>>();

  on<K extends keyof EventMap>(event: K, fn: Listener<EventMap[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    const set = this.listeners.get(event)!;
    set.add(fn as Listener<unknown>);
    return () => set.delete(fn as Listener<unknown>);
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    this.listeners.get(event)?.forEach(fn => fn(payload));
  }

  off<K extends keyof EventMap>(event: K, fn: Listener<EventMap[K]>): void {
    this.listeners.get(event)?.delete(fn as Listener<unknown>);
  }

  clear(): void {
    this.listeners.clear();
  }
}
