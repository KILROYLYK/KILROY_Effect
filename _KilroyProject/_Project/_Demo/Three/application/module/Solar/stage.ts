import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './layout/renderer';
import Scene from './layout/scene';
import Camera from './layout/camera';
import Light from './component/light';
import Panoramic from './component/panoramic';
import Sun from './component/sun';
import Earth from './component/earth';
import Moon from './component/satellite/moon';
import Loader from '../../controller/loader';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: {
            universe: 'https://image.gaeamobile.net/image/20200527/173108/universe.jpg',
            // sun: 'https://image.gaeamobile.net/image/20200527/173108/sun.jpg',
            sunGround: 'https://image.gaeamobile.net/image/20200527/173108/sun_ground.jpg',
            sunCloud: 'https://image.gaeamobile.net/image/20200527/173108/sun_cloud.png',
            mercury: 'https://image.gaeamobile.net/image/20200527/173108/mercury.jpg',
            venus: 'https://image.gaeamobile.net/image/20200527/173108/venus.jpg',
            earth: 'https://image.gaeamobile.net/image/20200527/173108/earth.jpg',
            earthCloud: 'https://image.gaeamobile.net/image/20200527/173108/earth_cloud.jpg',
            moon: 'https://image.gaeamobile.net/image/20200527/173108/moon.jpg',
            mars: 'https://image.gaeamobile.net/image/20200527/173108/mars.jpg',
            jupiter: 'https://image.gaeamobile.net/image/20200527/173108/jupiter.jpg',
            saturn: 'https://image.gaeamobile.net/image/20200527/173108/saturn.jpg',
            saturn_ring: 'https://image.gaeamobile.net/image/20200527/173108/saturn_ring.png',
            uranus: 'https://image.gaeamobile.net/image/20200527/173108/uranus.jpg',
            neptune: 'https://image.gaeamobile.net/image/20200527/173108/neptune.jpg',
        } as object,
        data: null as object // 数据
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private component: object = { // 组件
        light: null as Light, // 光源
        panoramic: null as Panoramic, // 全景
        sun: null as Sun, // 太阳
        
        earth: null as Earth, // 地球
        moon: null as Moon // 月球
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
        
        _this.component.light = new Light(_this.scene);
        _this.component.panoramic = new Panoramic(_this.scene, resource.universe);
        _this.component.sun = new Sun(_this.scene, {
            sunGround: resource.sunGround,
            sunCloud: resource.sunCloud
        });
        
        _this.component.earth = new Earth(_this.scene,{
            earth: resource.earth,
            earthCloud: resource.earthCloud
        });
        _this.component.moon = new Moon(_this.component.earth.group, resource.moon);
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
        _this.component.panoramic.destroy();
        _this.component.sun.destroy();
        
        _this.component.earth.destroy();
        _this.component.moon.destroy();
        
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
        
        _this.component.sun.update();
        
        _this.component.earth.update();
        _this.component.moon.update();
        
        _this.camera.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.clear();
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
}
