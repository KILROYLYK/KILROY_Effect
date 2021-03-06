import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import * as PIXI from 'pixi.js';

import Background from './component/background';
import Loader from '../../controller/loader';

import '../../../resource/css/Parallax/index.less';

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
    private app: PIXI.Application = null; // 应用
    private container: PIXI.Container = null; // 容器
    private component: object = { // 组件
        background: null as Background // 背景
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
            width: Global.Width,
            height: Global.Height,
            backgroundColor: 0x222222,
            transparent: false,
            resizeTo: Global.Dom
        });
        
        _this.container = new PIXI.Container();
        
        _this.component.background = new Background(
            _this.container, {
                bg: resource.image_bg,
                bg_shadow: resource.image_bg_shadow,
            });
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
        _this.app.stage.addChild(_this.container);
        
        Global.Dom.appendChild(_this.app.view);
        Global.Function.showCursor(false);
        Global.Function.updateResize(() => {
            Global.Function.resizeDom();
        });
        Global.Function.updateFocusPosition();
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.isInit) return;
        
        _this.component.background.update(isResize);
    }
}
