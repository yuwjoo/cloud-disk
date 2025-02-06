/*
 * @FileName: 事件助手类
 * @FilePath: \cloud-disk\src\utils\transferManager\utils\eventHelper\eventHelper.ts
 * @Author: YH
 * @Date: 2024-08-13 16:39:35
 * @LastEditors: YH
 * @LastEditTime: 2024-08-13 16:42:01
 * @Description:
 */
export const EVENT_MAP = Symbol('EVENT_MAP'); // 事件映射属性名

export class EventHelper {
  [EVENT_MAP]: Record<string, { callback: Function; once: boolean }[]> = {};

  /**
   * @description: 监听事件
   * @param {string} eventName 事件名称
   * @param {Function} callback 回调函数
   */
  on(eventName: string, callback: Function) {
    const configs = this[EVENT_MAP][eventName] || [];
    this[EVENT_MAP][eventName] = configs.concat([{ callback, once: false }]);
  }

  /**
   * @description: 仅监听一次事件
   * @param {string} eventName 事件名称
   * @param {Function} callback 回调函数
   */
  once(eventName: string, callback: Function) {
    const configs = this[EVENT_MAP][eventName] || [];
    this[EVENT_MAP][eventName] = configs.concat([{ callback, once: true }]);
  }

  /**
   * @description: 发送事件
   * @param {string} eventName 事件名称
   * @param {any[]} args 参数
   */
  emit(eventName: string, ...args: any[]) {
    const configs = this[EVENT_MAP][eventName] || [];
    const newConfigs = configs.filter((config) => {
      config.callback(...args);
      return !config.once;
    });
    this[EVENT_MAP][eventName] = newConfigs;
  }

  /**
   * @description: 关闭事件
   * @param {string} eventName 事件名称
   * @param {Function} callback 回调函数
   */
  off(eventName: string, callback: Function) {
    const configs = this[EVENT_MAP][eventName] || [];
    const pos = configs.findIndex((config) => config.callback === callback);
    configs.splice(pos, 1);
    this[EVENT_MAP][eventName] = configs;
  }
}
