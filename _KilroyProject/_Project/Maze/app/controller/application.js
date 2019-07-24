/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */
import { app, px } from './window';

/**
 * 应用
 */
class Application {
    /**
     * 原型对象
     * @constructor Application
     */
    constructor() {
        const _this = this;
        
        _this.config = {
            autoStart: false, //自动开始
            width: app.clientWidth, //宽
            height: app.clientHeight, //高
            transparent: false, //透明
            autoDensity: false, //自动分辨率
            antialias: false, //开启抗锯齿
            preserveDrawingBuffer: false, //开启绘图缓冲
            resolution: px, //设置分辨率 PC:1|Mobile:2
            forceCanvas: false, //强制Canvas渲染器
            backgroundColor: 0x000000, //背景
            clearBeforeRender: false, //渲染前清除画布
            forceFXAA: false, //强制FXAA抗锯齿
            powerPreference: null, //增加双显卡性能
            sharedTicker: false, //使用PIXI.Ticker.shared
            sharedLoader: false, //使用PIXI.Loader.shared
            resizeTo: null //自动调节大小
        };
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
    }
    
    /**
     * 创建
     * @param {string} id 应用ID
     * @param {object} config 配置
     * @return {object} 应用对象
     */
    create(id, config = {}) {
        const _this = this;
        
        const application = new PIXI.Application({
            autoStart: config.autoStart || _this.config.autoStart,
            width: config.width || _this.config.width,
            height: config.height || _this.config.height,
            transparent: config.transparent || _this.config.transparent,
            autoDensity: config.autoDensity || _this.config.autoDensity,
            antialias: config.antialias || _this.config.antialias,
            preserveDrawingBuffer: config.preserveDrawingBuffer || _this.config.preserveDrawingBuffer,
            resolution: config.resolution || _this.config.resolution,
            forceCanvas: config.forceCanvas || _this.config.forceCanvas,
            backgroundColor: config.backgroundColor || _this.config.backgroundColor,
            clearBeforeRender: config.clearBeforeRender || _this.config.clearBeforeRender,
            forceFXAA: config.forceFXAA || _this.config.forceFXAA,
            // powerPreference: config.powerPreference || _this.config.powerPreference,
            sharedTicker: config.sharedTicker || _this.config.sharedTicker,
            sharedLoader: config.sharedLoader || _this.config.sharedLoader,
            resizeTo: config.resizeTo || _this.config.resizeTo
        });
        
        application.view.setAttribute('id', id);
        
        app.appendChild(application.view);
        
        return application;
    }
}

export default new Application();
