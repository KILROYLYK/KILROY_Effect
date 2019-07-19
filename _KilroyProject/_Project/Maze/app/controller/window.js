/**
 * Public
 */
import { d, Base } from '../../../_Base/js/window';

/**
 * 全局参数
 */
export const app = d.getElementById('app');
export const width = app.clientWidth;
export const height = app.clientHeight;
export const margin = 10;
export const WH = (width >= height ? height : width) - margin * 2;
export const px = Base.isPSB.platform() === 'PC' ? 1 : 2;

if (px === 2) app.classList.add('mobile');
