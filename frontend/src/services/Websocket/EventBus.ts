type EventCallback<T> = (data: T) => void;

const eventBus = {
  on<T>(event: string, callback: EventCallback<T>): void {
    document.addEventListener(event, (e: Event) => {
      callback((e as CustomEvent).detail);
    });
  },
  dispatch<T>(event: string, data: T): void {
    const customEvent = new CustomEvent(event, { detail: data });
    document.dispatchEvent(customEvent);
  },
  remove(event: string, callback: EventCallback<any>): void {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
