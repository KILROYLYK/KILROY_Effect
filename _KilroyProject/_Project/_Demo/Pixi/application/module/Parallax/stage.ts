import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import * as PIXI from 'pixi.js';

import Loader from '../../controller/loader';

import '../.././../static/css/Parallax/index.less';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: [
            {
                name: 'image_bg',
                url: 'image/Parallax/bg.jpg'
            },
            {
                name: 'image_bg_shadow',
                url: 'image/Parallax/bg_shadow.jpg'
            }
        ],
        data: null as object // 数据
    };
    private centerP: object = Global.Function.getDomCenter(); // 中心位置
    private readonly speed: number = 0.05; // 速度
    private readonly width: number = 1500; // 宽度
    private readonly height: number = 900; // 高度
    private app: PIXI.Application = null; // 应用
    private container: PIXI.Container = null; // 容器
    private filter: PIXI.filters.DisplacementFilter = null; // 过滤器
    private spriteB: PIXI.Sprite = null; // 背景
    private spriteBS: PIXI.Sprite = null; // 背景阴影
    private component: object = { // 组件
    };
    private controller: object = { // 控制器
        loader: null as Loader // 加载
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.controller.loader = new Loader(
            _this.resource.path,
            {
                loadedCallback(index, total, progress) {
                    // console.log(`加载进度：${ index } ${ total } ${ progress }`);
                },
                finishCallback(data) {
                    _this.resource.data = data;
                    
                    _this.create();
                    _this.init();
                }
            }
        );
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this,
            resource = _this.resource.data;
        
        _this.app = new PIXI.Application({
            width: _this.width,
            height: _this.height,
            transparent: true
        });
        
        _this.container = new PIXI.Container();
        
        _this.spriteB = new PIXI.Sprite.from(resource.image_bg.texture);
        _this.spriteB.position.set(-(_this.spriteB.width - _this.width) / 2, -(_this.spriteB.height - _this.height) / 2);
        
        _this.spriteBS = new PIXI.Sprite.from(resource.image_bg_shadow.texture);
        _this.spriteBS.position.set(-(_this.spriteBS.width - _this.width) / 2, -(_this.spriteBS.height - _this.height) / 2);
        _this.spriteBS.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        
        _this.filter = new PIXI.filters.DisplacementFilter(_this.spriteBS);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
        _this.app.stage.addChild(_this.container);
        
        _this.container.addChild(_this.spriteB);
        _this.container.addChild(_this.spriteBS);
        
        Global.Dom.appendChild(_this.app.view);
        
        Global.Document.addEventListener('mousemove', _this.animation.bind(_this), false);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.isInit) return;
        _this.isInit = false;
        
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.isInit) return;
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
                    _this.container.filters = [ _this.filter ];
                    _this.spriteB.position.set(x - (_this.spriteB.width - _this.width) / 2, y - (_this.spriteB.height - _this.height) / 2);
                    _this.spriteBS.position.set(x - (_this.spriteB.width - _this.width) / 2, y - (_this.spriteB.height - _this.height) / 2);
                    _this.filter.scale.set(-x, -y);
                }
            });
    }
}
