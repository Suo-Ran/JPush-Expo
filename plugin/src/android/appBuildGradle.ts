/**
 * Android app/build.gradle 配置
 * 添加 JPush 依赖和 manifestPlaceholders
 */

import { ConfigPlugin, withAppBuildGradle } from 'expo/config-plugins';
import { getAppKey, getChannel, getVendorChannels } from '../utils/config';
import { mergeContents } from '../utils/generateCode';
import { Validator } from '../utils/codeValidator';

/**
 * 生成 manifestPlaceholders 代码
 */
const getManifestPlaceholders = (): string => {
  const vendorChannels = getVendorChannels();
  const placeholders: string[] = [
    `JPUSH_APPKEY: "${getAppKey()}"`,
    `JPUSH_CHANNEL: "${getChannel()}"`
  ];

  // 添加厂商通道配置
  if (vendorChannels?.meizu) {
    placeholders.push(`MEIZU_APPKEY: "${vendorChannels.meizu.appKey}"`);
    placeholders.push(`MEIZU_APPID: "${vendorChannels.meizu.appId}"`);
  }

  if (vendorChannels?.xiaomi) {
    placeholders.push(`XIAOMI_APPID: "${vendorChannels.xiaomi.appId}"`);
    placeholders.push(`XIAOMI_APPKEY: "${vendorChannels.xiaomi.appKey}"`);
  }

  if (vendorChannels?.oppo) {
    placeholders.push(`OPPO_APPKEY: "${vendorChannels.oppo.appKey}"`);
    placeholders.push(`OPPO_APPID: "${vendorChannels.oppo.appId}"`);
    placeholders.push(`OPPO_APPSECRET: "${vendorChannels.oppo.appSecret}"`);
  }

  if (vendorChannels?.vivo) {
    placeholders.push(`VIVO_APPKEY: "${vendorChannels.vivo.appKey}"`);
    placeholders.push(`VIVO_APPID: "${vendorChannels.vivo.appId}"`);
  }

  if (vendorChannels?.honor) {
    placeholders.push(`HONOR_APPID: "${vendorChannels.honor.appId}"`);
  }

  if (vendorChannels?.nio) {
    placeholders.push(`NIO_APPID: "${vendorChannels.nio.appId}"`);
  }

  return `manifestPlaceholders = [
            ${placeholders.join(',\n            ')}
        ]`;
};

/**
 * 生成 JPush 依赖代码
 */
const getJPushDependencies = (): string => {
  return `implementation project(':jpush-react-native')
    implementation project(':jcore-react-native')`;
};

/**
 * 配置 Android build.gradle
 */
export const withAndroidAppBuildGradle: ConfigPlugin = (config) =>
  withAppBuildGradle(config, (config) => {
    const validator = new Validator(config.modResults.contents);

    // 1. 添加 manifestPlaceholders
    validator.register('JPUSH_APPKEY', (src) => {
      console.log('\n[MX_JPush_Expo] 配置 build.gradle appKey & channel ...');
      
      return mergeContents({
        src,
        newSrc: getManifestPlaceholders(),
        tag: 'jpush-manifest-placeholders',
        anchor: /versionName\s+["'][\d.]+["']/,  // 匹配 versionName "1.0"
        offset: 1,  // 在 versionName 的下一行插入
        comment: '//',
      });
    });

    // 2. 添加 JPush 依赖
    validator.register("implementation project(':jpush-react-native')", (src) => {
      console.log('\n[MX_JPush_Expo] 配置 build.gradle dependencies ...');
      
      return mergeContents({
        src,
        newSrc: getJPushDependencies(),
        tag: 'jpush-dependencies',
        anchor: /dependencies \{/,
        offset: 1,  // 在 dependencies { 的下一行插入
        comment: '//',
      });
    });

    config.modResults.contents = validator.invoke();
    return config;
  });
