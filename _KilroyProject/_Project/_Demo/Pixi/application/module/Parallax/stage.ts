import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import * as PIXI from 'pixi.js';

import Loader from '../../controller/loader';

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
    private readonly speed: number = 0.1; // 速度
    private app: PIXI.Application = null; // 应用
    private container: PIXI.Container = null; // 容器
    private filter: PIXI.filters.DisplacementFilter = null; // 过滤器
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
            resource = _this.resource.data,
            spriteB = new PIXI.Sprite.from(resource.image_bg),
            spriteS = new PIXI.Sprite.from(resource.image_bg_shadow);
        
        _this.app = new PIXI.Application({
            width: 1500,
            height: 1000,
            transparent: true
        });
        _this.container = new PIXI.Container();
        
        _this.app.stage.addChild(_this.container);
        Global.Dom.appendChild(_this.app.view);
        
        spriteS.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        _this.filter = new PIXI.filters.DisplacementFilter(spriteS);
        
        _this.container.addChild(spriteB);
        _this.container.addChild(spriteS);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
        Global.Dom.addEventListener('mousemove', _this.mouseMove.bind(_this), false)
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
     * 鼠标移动执行动画
     * @param {MouseEvent} e 鼠标事件
     * @return {void}
     */
    private mouseMove(e: MouseEvent): void {
        const _this = this,
            centerP = Global.Function.getDomCenter(), // 中心位置
            x = (Global.mouseP.x - centerP.x) * _this.speed,
            y = (Global.mouseP.y - centerP.y) * _this.speed * 2;
        
        
    }
}
