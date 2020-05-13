import './stereoscopic.less';

import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Anime from 'animejs';

/**
 * 场景
 */
export default class Stage implements _Stage {
    public readonly config: object = { // 配置
        dom: null as Element, // 元素
        width: 900, // 画布宽
        height: 600, // 画布高
        
        app: null as PIXI.Application, // 应用
        container: null as PIXI.Container, // 容器
        filter: null as PIXI.filters.DisplacementFilter, // 过滤器
        imageB: 'https://image.gaeamobile.net/image/20200512/164439/imageB.jpg', // 背景图
        imageS: 'https://image.gaeamobile.net/image/20200512/164439/imageS.jpg', // 阴影图
        centerP: { // 中心位置
            x: Global.Width / 2,
            y: Global.Height / 2
        },
        moveP: { // 移动位置
            x: 0,
            y: 0
        },
        speed: -0.03 // 移动速度
    };
    
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
        
        _this.config.app = new Global.PIXI.Application({
            width: _this.config.width,
            height: _this.config.height,
            transparent: true
        });
        _this.config.dom.appendChild(_this.config.app.view);
        
        _this.config.container = new Global.PIXI.Container();
        _this.config.app.stage.addChild(_this.config.container);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this,
            spriteB = new Global.PIXI.Sprite.from(_this.config.imageB),
            spriteS = new Global.PIXI.Sprite.from(_this.config.imageS);
        
        spriteB.width = _this.config.width;
        spriteB.height = _this.config.height;
    
        spriteS.width = _this.config.width;
        spriteS.height = _this.config.height;
        
        spriteS.texture.baseTexture.wrapMode = Global.PIXI.WRAP_MODES.REPEAT;
        _this.config.filter = new Global.PIXI.filters.DisplacementFilter(spriteS);
        
        _this.config.container.addChild(spriteB);
        _this.config.container.addChild(spriteS);
        
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
            _this.config.centerP.x,
            _this.config.centerP.y
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
            xS = (_this.config.moveP.x - _this.config.centerP.x) * _this.config.speed,
            yS = (_this.config.moveP.y - _this.config.centerP.y) * _this.config.speed * 2;
        
        Anime({
            targets: _this.config.moveP,
            x, y,
            duration: 1000,
            easing: 'easeOutSine',
            update: (a: any) => {
                _this.config.container.filters = [ _this.config.filter ];
                _this.config.filter.scale.set(xS, yS);
            }
        });
    }
}
