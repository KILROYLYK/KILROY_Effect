import * as PIXI from 'pixi.js';

/**
 * 配置
 */
export default class GlobalConfig {
    public readonly resource: object = null; // 资源
    public app: PIXI.Application = null; // 应用
    public container: PIXI.Container = null; // 容器
}
