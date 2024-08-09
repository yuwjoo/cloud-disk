export const EVENT_MAP = Symbol('EVENT_MAP');

export class EventHelper {
  [EVENT_MAP]: Record<string, { callback: Function; once: boolean }[]> = {};

  constructor() {}

  on(eventName: string, callback: Function) {
    const configs = this[EVENT_MAP][eventName] || [];
    this[EVENT_MAP][eventName] = configs.concat([{ callback, once: false }]);
  }

  once(eventName: string, callback: Function) {
    const configs = this[EVENT_MAP][eventName] || [];
    this[EVENT_MAP][eventName] = configs.concat([{ callback, once: true }]);
  }

  emit(eventName: string, ...args: any[]) {
    const configs = this[EVENT_MAP][eventName] || [];
    const newConfigs = configs.filter((config) => {
      config.callback(...args);
      return !config.once;
    });
    this[EVENT_MAP][eventName] = newConfigs;
  }

  off(eventName: string, callback: Function) {
    const configs = this[EVENT_MAP][eventName] || [];
    const pos = configs.findIndex((config) => config.callback === callback);
    configs.splice(pos, 1);
    this[EVENT_MAP][eventName] = configs;
  }
}
