import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './layout/renderer';
import Scene from './layout/scene';
import Camera from './layout/camera';
import Light from './component/light';
import Wave from './component/wave';
import Ground from './component/ground';
import Car from './component/car';
import Loader from '../../controller/loader';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: [
            {
                name: 'cube_bg',
                url: [
                    'image/Car/px.jpg',
                    'image/Car/nx.jpg',
                    'image/Car/py.jpg',
                    'image/Car/ny.jpg',
                    'image/Car/pz.jpg',
                    'image/Car/nz.jpg'
                ]
            },
            {
                name: 'json_car',
                url: 'json/Car/car.json'
            },
            {
                name: 'json_wheel_l1',
                url: 'json/Car/wheel.json'
            },
            {
                name: 'json_wheel_l2',
                url: 'json/Car/wheel.json'
            },
            {
                name: 'json_wheel_r1',
                url: 'json/Car/wheel.json'
            },
            {
                name: 'json_wheel_r2',
                url: 'json/Car/wheel.json'
            }
        ],
        data: null as object // 数据
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private component: object = { // 组件
        light: null as Light, // 光源
        wave: null as Wave, // 波浪
        ground: null as Ground, // 地面
        car: null as Car // 车
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
        
        _this.scene.instance.background = resource.cube_bg
        
        _this.component.light = new Light(_this.scene);
        _this.component.wave = new Wave(_this.scene);
        _this.component.ground = new Ground(_this.scene);
        _this.component.car = new Car(_this.scene, {
            bg: resource.cube_bg,
            car: resource.json_car,
            wheel_l1: resource.json_wheel_l1,
            wheel_l2: resource.json_wheel_l2,
            wheel_r1: resource.json_wheel_r1,
            wheel_r2: resource.json_wheel_r2
        });
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
        
        _this.component.light.destroy();
        _this.component.wave.destroy();
        _this.component.ground.destroy();
        
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
        
        _this.component.light.update();
        _this.component.wave.update();
        _this.component.car.update();
        
        _this.camera.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.clear();
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
}
