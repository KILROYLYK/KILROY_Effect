import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './environment/renderer';
import Scene from './environment/scene';
import Camera from './environment/camera';
import Light from './object/light';
import Loader from '../../controller/loader';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private readonly config: object = { // 配置
        resources: { // 资源
            path: [ // 地址
                {
                    name: 'star',
                    path: 'https://raw.githubusercontent.com/rainner/codepen-assets/master/images/star.png'
                },
                {
                    name: 'terrain',
                    path: 'https://raw.githubusercontent.com/rainner/codepen-assets/master/images/terrain2.jpg'
                },
                {
                    name: 'water',
                    path: 'https://raw.githubusercontent.com/rainner/codepen-assets/master/images/water.jpg'
                },
                {
                    name: 'fighter',
                    path: 'https://raw.githubusercontent.com/rainner/codepen-assets/master/models/SpaceFighter03/SpaceFighter03.obj'
                }
            ] as object[],
            data: {} as object // 数据
        } as object
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private object: object = { // 对象
        light: null as Light // 灯光
    };
    private controller: object = { // 控制器
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
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
        
        _this.object.light = new Light();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        Global.GameDom.appendChild(_this.renderer.instance.domElement);
        
        _this.controller.loader = new Loader({
            list: _this.config.resources.path,
            loadingCallback(progress) {
                // console.log(progress);
            },
            finishCallback(data) {
                _this.config.resources.data = data;
            }
        });
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        _this.camera.update(isResize);
        _this.scene.update(isResize);
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
        
        _this.object.light.destroy();
    }
}
