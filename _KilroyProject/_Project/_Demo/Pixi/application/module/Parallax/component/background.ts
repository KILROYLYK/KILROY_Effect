import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as PIXI from 'pixi.js';

interface Texture { // 纹理
    bg: object // 背景
    bg_shadow: object // 背景阴影
}

/**
 * 背景
 */
export default class Background implements Component {
    private readonly name: string = 'Background-背景';
    
    private container: PIXI.Container = null; // 容器
    private texture: Texture = null; // 纹理
    
    private readonly speed: number = 0.05; // 速度
    private readonly ratio: number = 1652 / 1074; // 宽高比值
    private width: number = 0; // 宽
    private height: number = 0; // 高
    private spriteB: PIXI.Sprite = null; // 背景
    private spriteBS: PIXI.Sprite = null; // 背景阴影
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: 0
    };
    
    private instance: PIXI.filters.DisplacementFilter = null; // 过滤器
    
    /**
     * 构造函数
     * @constructor Background
     * @param {PIXI.Container} container 场景
     * @param {Texture} texture 纹理
     */
    constructor(container: object, texture: Texture) {
        const _this = this;
        
        _this.container = container;
        _this.texture = texture;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this,
            bg = _this.texture.bg,
            bgShadow = _this.texture.bg_shadow;
        
        _this.spriteB = new PIXI.Sprite(bg.texture);
        _this.spriteBS = new PIXI.Sprite(bgShadow.texture);
        _this.spriteBS.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        
        _this.instance = new PIXI.filters.DisplacementFilter(_this.spriteBS);
        
        _this.setSize();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.container.addChild(_this.spriteB);
        _this.container.addChild(_this.spriteBS);
        
        Global.Document.addEventListener('mousemove', _this.animation.bind(_this), false);
        Global.Document.addEventListener('touchstart', _this.animation.bind(_this), false);
        Global.Document.addEventListener('touchmove', _this.animation.bind(_this), false);
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        if (isResize) {
            _this.setSize();
        }
    }
    
    /**
     * 设置尺寸
     * @return {void}
     */
    private setSize(): void {
        const _this = this,
            centerP = Global.Function.getDomCenter(),
            ratio = Global.Width / Global.Height;
        
        switch (true) {
            case ratio >= 1 && ratio >= _this.ratio:
            case ratio <= 1 && ratio >= _this.ratio:
                _this.width = Global.Width * 1.2;
                _this.height = _this.width / _this.ratio;
                break;
            case ratio >= 1 && ratio <= _this.ratio:
            case ratio <= 1 && ratio <= _this.ratio:
            default:
                _this.height = Global.Height * 1.2;
                _this.width = _this.height * _this.ratio;
                break
        }
        
        _this.spriteB.width = _this.width;
        _this.spriteB.height = _this.height;
        _this.spriteB.position.set(centerP.x - _this.width / 2, centerP.y - _this.height / 2);
        
        _this.spriteBS.width = _this.width;
        _this.spriteBS.height = _this.height;
        _this.spriteBS.position.set(centerP.x - _this.width / 2, centerP.y - _this.height / 2);
    }
    
    /**
     * 动画
     * @param {MouseEvent} e 鼠标事件
     * @return {void}
     */
    private animation(e: MouseEvent): void {
        const _this = this,
            centerP = Global.Function.getDomCenter(),
            TweenMax = Global.GSAP.TweenMax,
            Sine = Global.GSAP.Sine,
            x = (Global.FocusP.x - centerP.x) * _this.speed,
            y = (Global.FocusP.y - centerP.y) * _this.speed;
        
        if (Global.FocusP.x === e.clientX &&
            Global.FocusP.y === e.clientY) return;
        
        TweenMax
            .to(_this.moveP, 1, {
                x, y,
                ease: Sine.easeOut,
                onUpdate() {
                    _this.container.filters = [ _this.instance ];
                    _this.spriteB.position.set(centerP.x - _this.width / 2 + _this.moveP.x, centerP.y - _this.height / 2 + _this.moveP.y);
                    _this.spriteBS.position.set(centerP.x - _this.width / 2 + _this.moveP.x, centerP.y - _this.height / 2 + _this.moveP.y);
                    _this.instance.scale.set(-_this.moveP.x, -_this.moveP.y);
                }
            });
    }
}
