export const dispatchCustomEvent = <T>(eventName: string, detail: T, element = window) => {
  const event = new CustomEvent(eventName, { detail });

  element.dispatchEvent(event);
};
