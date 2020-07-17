import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import * as PIXI from 'pixi.js';

import Background from './component/background';
import Loader from '../../controller/loader';

import '../.././../static/css/Parallax/index.less';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = [ // 资源
        {
            name: 'image_bg',
            url: 'image/Parallax/bg.jpg'
        },
        {
            name: 'image_bg_shadow',
            url: 'image/Parallax/bg_shadow.jpg'
        }
    ];
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        Loader.Instance.load(
            _this.resource,
            {
                loadedCallback(index, total, progress) {
                    // console.log(`加载进度：${ index } ${ total } ${ progress }`);
                },
                finishCallback(data) {
                    Global.Config.resource = data;
                    
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
        const _this = this;
        
        Global.Config.app = new PIXI.Application({
            width: Global.Width,
            height: Global.Height,
            backgroundColor: 0x222222,
            transparent: true,
            resizeTo: Global.Dom
        });
        Global.Config.container = new PIXI.Container();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
        Global.Config.app.stage.addChild(Global.Config.container);
        Global.Dom.appendChild(Global.Config.app.view);
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
        
        Background.Instance.update(isResize);
    }
}
