/**
 * 全局配置管理
 */

import { VendorChannelConfig } from '../types';

let JPUSH_APPKEY = 'appKey';
let JPUSH_CHANNEL = 'channel';
let JPUSH_PACKAGE_NAME = 'com.example.app';
let JPUSH_APS_FOR_PRODUCTION = false;
let VENDOR_CHANNELS: VendorChannelConfig | undefined;

/**
 * 设置 JPush 配置
 * @param appKey - JPush AppKey
 * @param channel - JPush Channel
 * @param packageName - Android 包名
 * @param apsForProduction - iOS 推送环境（默认为开发环境）
 * @param vendorChannels - 厂商通道配置（可选）
 */
export const setConfig = (
  appKey: string,
  channel: string,
  packageName: string,
  apsForProduction: boolean = false,
  vendorChannels?: VendorChannelConfig
): void => {
  JPUSH_APPKEY = appKey;
  JPUSH_CHANNEL = channel;
  JPUSH_PACKAGE_NAME = packageName;
  JPUSH_APS_FOR_PRODUCTION = apsForProduction;
  VENDOR_CHANNELS = vendorChannels;
};

/**
 * 获取 JPush AppKey
 * @returns JPush AppKey
 */
export const getAppKey = (): string => JPUSH_APPKEY;

/**
 * 获取 JPush Channel
 * @returns JPush Channel
 */
export const getChannel = (): string => JPUSH_CHANNEL;

/**
 * 获取 Android 包名
 * @returns Android 包名
 */
export const getPackageName = (): string => JPUSH_PACKAGE_NAME;

/**
 * 获取 iOS 推送环境配置
 * @returns 是否为生产环境
 */
export const getApsForProduction = (): boolean => JPUSH_APS_FOR_PRODUCTION;

/**
 * 获取厂商通道配置
 * @returns 厂商通道配置
 */
export const getVendorChannels = (): VendorChannelConfig | undefined => VENDOR_CHANNELS;
