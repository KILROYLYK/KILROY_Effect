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
const appKeyboard = new PIXI.Application({
    autoStart: false, //自动开始
    width: 200,
    height: 200,
    transparent: false, //透明
    autoDensity: false, //自动分辨率
    antialias: true, //开启抗锯齿
    preserveDrawingBuffer: true, //开启绘图缓冲
    resolution: px, //设置分辨率 PC:1|Mobile:2
    forceCanvas: false, //强制Canvas渲染器
    backgroundColor: 0xFFFFFF, //背景
    clearBeforeRender: true, //渲染前清除画布
    forceFXAA: false, //强制FXAA抗锯齿
    // powerPreference: '', //增加双显卡性能
    sharedTicker: false, //使用PIXI.Ticker.shared
    sharedLoader: false, //使用PIXI.Loader.shared
    resizeTo: null //自动调节大小
});

appKeyboard.view.setAttribute('id', 'appKeyboard');

app.appendChild(appKeyboard.view);

export default appKeyboard;
