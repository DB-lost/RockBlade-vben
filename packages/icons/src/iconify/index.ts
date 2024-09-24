import { createIconifyIcon } from '@vben-core/icons';

export * from '@vben-core/icons';

export const MdiKeyboardEsc = createIconifyIcon('mdi:keyboard-esc');

export const MdiWechat = createIconifyIcon('mdi:wechat');

export const MdiGithub = createIconifyIcon('mdi:github');

export const MdiGoogle = createIconifyIcon('mdi:google');

export const MdiQqchat = createIconifyIcon('mdi:qqchat');

/**
 * 根据string生成图标
 * @param icon
 * @constructor
 */
export function CoverIconToComponent(icon: string) {
  return createIconifyIcon(icon);
}
