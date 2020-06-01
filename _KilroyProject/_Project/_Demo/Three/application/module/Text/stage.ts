import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './layout/renderer';
import Scene from './layout/scene';
import Camera from './layout/camera';
import Text from './component/text';
import Loader from '../../controller/loader';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: {
            font_text: '/font/Text/bold.json'
            // font_text: '/font/Text/regular.json'
        } as object,
        data: null as object // 数据
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private component: object = { // 组件
        text: null as Text // 文案
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
        
        _this.renderer = new Renderer();
        _this.scene = new Scene();
        _this.camera = new Camera();
        
        _this.component.text = new Text(_this.scene, resource.font_text);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
        Global.Dom.appendChild(_this.renderer.instance.domElement);
        Global.Function.updateFrame(() => {
            _this.update();
        });
        Global.Function.updateResize(() => {
            Global.Function.resizeDom();
            _this.update(true);
        });
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.isInit) return;
        _this.isInit = false;
        
        _this.controller.loader.destroy();
        
        _this.component.text.destroy();
        
        _this.camera.destroy();
        _this.scene.destroy();
        _this.renderer.destroy();
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.isInit) return;
    
        _this.component.text.update();
        
        _this.camera.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.clear();
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
}
