import './stereoscopic.less';

import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Anime from 'animejs';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private app: PIXI.Application = null; // 应用
    private container: PIXI.Container = null; // 容器
    private filter: PIXI.filters.DisplacementFilter = null; // 过滤器
    private readonly size: object = { // 画布尺寸
        width: 900, // 画布宽
        height: 600 // 画布高
    };
    private readonly src = { // 资源地址
        background: 'https://image.gaeamobile.net/image/20200512/164439/imageB.jpg', // 背景
        shadow: 'https://image.gaeamobile.net/image/20200512/164439/imageS.jpg' // 阴影
    };
    private readonly centerP: object = { // 中心位置
        x: Global.Width / 2,
        y: Global.Height / 2
    };
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: 0
    };
    private readonly speed: number = -0.03; // 移动速度
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.config.dom = Global.GameDom;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.app = new Global.PIXI.Application({
            width: _this.size.width,
            height: _this.size.height,
            transparent: true
        });
        
        _this.container = new Global.PIXI.Container();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this,
            spriteB = new Global.PIXI.Sprite.from(_this.src.background),
            spriteS = new Global.PIXI.Sprite.from(_this.src.shadow);
        
        spriteB.width = _this.size.width;
        spriteB.height = _this.size.height;
        
        spriteS.width = _this.size.width;
        spriteS.height = _this.size.height;
        
        spriteS.texture.baseTexture.wrapMode = Global.PIXI.WRAP_MODES.REPEAT;
        _this.filter = new Global.PIXI.filters.DisplacementFilter(spriteS);
        
        _this.container.addChild(spriteB);
        _this.container.addChild(spriteS);
        
        _this.app.stage.addChild(_this.container);
        Global.GameDom.appendChild(_this.app.view);
        
        Global.Window.addEventListener('mousemove', _this.mouseMove.bind(_this), false);
        Global.Window.addEventListener('mouseout', _this.mouseOut.bind(_this), false);
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
    
    /**
     * 鼠标移动事件
     * @param {MouseEvent} e 鼠标事件
     * @return {void}
     */
    private mouseMove(e: MouseEvent): void {
        const _this = this;
        _this.anime(e.clientX, e.clientY);
    }
    
    /**
     * 鼠标移出事件
     * @param {MouseEvent} e 鼠标事件
     * @return {void}
     */
    private mouseOut(e: MouseEvent): void {
        const _this = this;
        _this.anime(
            _this.centerP.x,
            _this.centerP.y
        );
    }
    
    /**
     * 动画
     * @param {number} x X轴坐标
     * @param {number} y Y轴坐标
     * @return {void}
     */
    private anime(x: number, y: number): void {
        const _this = this,
            xS = (_this.moveP.x - _this.centerP.x) * _this.speed,
            yS = (_this.moveP.y - _this.centerP.y) * _this.speed * 2;
        
        Anime({
            targets: _this.moveP,
            x, y,
            duration: 1000,
            easing: 'easeOutSine',
            update: (a: any) => {
                _this.container.filters = [ _this.filter ];
                _this.filter.scale.set(xS, yS);
            }
        });
    }
}
