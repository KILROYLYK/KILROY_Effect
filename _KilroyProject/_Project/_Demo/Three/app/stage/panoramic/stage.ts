import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './environment/renderer';
import Scene from './environment/scene';
import Camera from './environment/camera';
import Panoramic from '../../controller/panoramic';
import Move from '../../controller/move';
import Loader from "../../controller/loader";

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: [ // 地址
            {
                name: 'map',
                path: 'https://image.gaeamobile.net/image/20200515/140131/map.jpg'
            }
        ] as object[],
        data: null as object // 数据
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private controller: object = { // 控制器
        panoramic: null as Panoramic, // 全景
        move: null as Move // 移动
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.controller.loader = new Loader(_this.resource.path, {
            loadedCallback(index, total, progress) {
                // console.log(`加载进度：${ index } ${ total } ${ progress }`);
            },
            finishCallback(data) {
                _this.resource.data = data;
                
                _this.create();
                _this.init();
            }
        });
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.renderer = new Renderer();
        _this.scene = new Scene();
        _this.camera = new Camera();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    
        _this.isInit = true;
        
        Global.GameDom.appendChild(_this.renderer.instance.domElement);
        
        // 全景控制器
        _this.controller.panoramic = new Panoramic(_this.scene, _this.resource.data.map);
        
        // 移动控制器
        _this.controller.move = new Move(_this.camera, {
            turn: true
        });
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
    
        if (!_this.isInit) return;
        
        _this.controller.move.update();
        
        _this.camera.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.camera.destroy();
        _this.scene.destroy();
        _this.renderer.destroy();
        
        _this.controller.panoramic.destroy();
        _this.controller.move.destroy();
    }
}
