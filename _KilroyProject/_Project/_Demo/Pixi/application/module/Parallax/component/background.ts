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
    
    private centerP: object = Global.Function.getDomCenter(); // 中心位置
    private readonly speed: number = 0.05; // 速度
    private readonly width: number = 1400; // 宽度
    private readonly height: number = 900; // 高度
    private spriteB: PIXI.Sprite = null; // 背景
    private spriteBS: PIXI.Sprite = null; // 背景阴影
    
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
        
        _this.spriteB = new PIXI.Sprite.from(bg.texture);
        _this.spriteB.position.set(-(_this.spriteB.width - _this.width) / 2, -(_this.spriteB.height - _this.height) / 2);
        
        _this.spriteBS = new PIXI.Sprite.from(bgShadow.texture);
        _this.spriteBS.position.set(-(_this.spriteBS.width - _this.width) / 2, -(_this.spriteBS.height - _this.height) / 2);
        _this.spriteBS.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        
        _this.instance = new PIXI.filters.DisplacementFilter(_this.spriteBS);
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
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
    }
    
    /**
     * 动画
     * @param {MouseEvent} e 鼠标事件
     * @return {void}
     */
    private animation(e: MouseEvent): void {
        const _this = this,
            TweenMax = Global.GSAP.TweenMax,
            Sine = Global.GSAP.Sine,
            x = (Global.mouseP.x - _this.centerP.x) * _this.speed,
            y = (Global.mouseP.y - _this.centerP.y) * _this.speed;
        
        if (Global.mouseP.x === e.clientX &&
            Global.mouseP.y === e.clientY) return;
        
        TweenMax
            .to(Global.mouseP, 2, {
                x: e.clientX,
                y: e.clientY,
                ease: Sine.easeOut,
                onUpdate() {
                    _this.container.filters = [ _this.instance ];
                    _this.spriteB.position.set(x - (_this.spriteB.width - _this.width) / 2, y - (_this.spriteB.height - _this.height) / 2);
                    _this.spriteBS.position.set(x - (_this.spriteB.width - _this.width) / 2, y - (_this.spriteB.height - _this.height) / 2);
                    _this.instance.scale.set(-x, -y);
                }
            });
    }
}
