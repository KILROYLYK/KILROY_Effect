/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */
import { app, px } from '../controller/window';

/**
 * 应用
 */
const keyboardMap = new PIXI.Application({
    autoStart: false, //自动开始
    width: app.clientWidth,
    height: app.clientHeight,
    transparent: false, //透明
    autoDensity: false, //自动分辨率
    antialias: true, //开启抗锯齿
    preserveDrawingBuffer: true, //开启绘图缓冲
    resolution: px, //设置分辨率 PC:1|Mobile:2
    forceCanvas: false, //强制Canvas渲染器
    backgroundColor: 0xCCCCCC, //背景
    clearBeforeRender: true, //渲染前清除画布
    forceFXAA: false, //强制FXAA抗锯齿
    // powerPreference: '', //增加双显卡性能
    sharedTicker: false, //使用PIXI.Ticker.shared
    sharedLoader: false, //使用PIXI.Loader.shared
    resizeTo: app //自动调节大小
});

app.appendChild(keyboardMap.view);

export default keyboardMap;
