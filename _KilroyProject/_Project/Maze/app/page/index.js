/**
 * Public
 */
import { d } from '../../../_Base/js/window';

/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Main
 */
const app = d.getElementById('app'),
    renderer = new PIXI.Application({
        autoStart: false,
        width: app.clientWidth,
        height: app.clientHeight,
        transparent: false, //透明
        autoDensity: false, //自动分辨率
        antialias: true, //抗锯齿
        preserveDrawingBuffer: true, //绘图缓存
        resolution: 2, //渲染器分辨率 PC:1|Mobile:2
        forceCanvas: false, //只能使用Canvas渲染器
        backgroundColor: 0xCCCCCC, //背景色
        clearBeforeRender: true, //绘制前清除画布
        forceFXAA: false, //开启FXAA抗锯齿
        resizeTo: app //自动调整大小
    });

app.appendChild(renderer.view);

renderer.start();
