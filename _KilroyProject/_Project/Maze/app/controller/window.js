/**
 * Public
 */
import { d, Base } from '../../../_Base/js/window';

/**
 * 全局参数
 */
export const app = d.getElementById('app');
export const appWidth = app.clientWidth;
export const appHeight = app.clientHeight;
export const mazeMargin = 10;
export const mazeWH = (appWidth >= appHeight ? appHeight : appWidth) - mazeMargin * 2;
export const keyboardWH = 200;
export const px = Base.isPSB.platform() === 'PC' ? 1 : 2;
export const time = 3;
export const row = 10;
