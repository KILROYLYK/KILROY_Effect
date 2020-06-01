import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './layout/renderer';
import Scene from './layout/scene';
import Camera from './layout/camera';
import Light from './component/light';
import Panoramic from './component/panoramic';
import Sun from './component/sun';
import Mercury from './component/planet/mercury';
import Venus from './component/planet/venus';
import Earth from './component/planet/earth';
import Moon from './component/satellite/moon';
import Mars from './component/planet/mars';
import Jupiter from './component/planet/jupiter';
import Saturn from './component/planet/saturn';
import Uranus from './component/planet/uranus';
import Neptune from './component/planet/neptune';
import Loader from '../../controller/loader';

/**
 * 场景
 * 知识点
 * 太阳半径为【69.63】（万千米）
 * 距离太阳由近及远分别是【水星，金星，地球，火星，木星，土星，天王星，海王星】
 * 他们分别到太阳的距离为【5791，10820，14960，22794，77833，142940，287099，450400】（万千米）
 * 他们的半径分别为【0.2440，0.6052，0.6371，0.3397，7.1492，6.0268，2.5559，2.4766】（万千米）
 * 他们的公转周期分别为【88，225，365，687，4329，10767，30769，60152】（天）
 * 他们的自转周期分别为【58，243，1， 1， 0.41，0.42， 0.64，0.65】
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: {
            image_universe: 'image/Solar/universe.jpg',
            // image_sun: 'image/Solar/sun.jpg',
            image_sunGround: 'image/Solar/sun_ground.jpg',
            image_sunCloud: 'image/Solar/sun_cloud.png',
            image_mercury: 'image/Solar/mercury.jpg',
            image_venus: 'image/Solar/venus.jpg',
            image_earth: 'image/Solar/earth.jpg',
            image_earthSky: 'image/Solar/earth_sky.jpg',
            image_moon: 'image/Solar/moon.jpg',
            image_mars: 'image/Solar/mars.jpg',
            image_jupiter: 'image/Solar/jupiter.jpg',
            image_saturn: 'image/Solar/saturn.jpg',
            image_saturnRing: 'image/Solar/saturn_ring.png',
            image_uranus: 'image/Solar/uranus.jpg',
            image_neptune: 'image/Solar/neptune.jpg'
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
        mercury: null as Mercury, // 水星
        venus: null as Venus, // 金星
        earth: null as Earth, // 地球
        moon: null as Moon, // 月球
        mars: null as Mars, // 火星
        jupiter: null as Jupiter, // 木星
        saturn: null as Saturn, // 土星
        uranus: null as Uranus, // 天王星
        neptune: null as Neptune, // 海王星
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
        _this.component.panoramic = new Panoramic(_this.scene, resource.image_universe);
        
        _this.component.sun = new Sun(_this.scene, {
            sunGround: resource.image_sunGround,
            sunCloud: resource.image_sunCloud
        });
        _this.component.mercury = new Mercury(_this.scene, resource.image_mercury);
        _this.component.venus = new Venus(_this.scene, resource.image_venus);
        _this.component.earth = new Earth(_this.scene, {
            earth: resource.image_earth,
            sky: resource.image_earthSky
        });
        _this.component.moon = new Moon(_this.component.earth.group, resource.image_moon);
        _this.component.mars = new Mars(_this.scene, resource.image_mars);
        _this.component.jupiter = new Jupiter(_this.scene, resource.image_jupiter);
        _this.component.saturn = new Saturn(_this.scene, {
            saturn: resource.image_saturn,
            ring: resource.image_saturnRing
        });
        _this.component.uranus = new Uranus(_this.scene, resource.image_uranus);
        _this.component.neptune = new Neptune(_this.scene, resource.image_neptune);
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
        _this.component.mercury.destroy();
        _this.component.venus.destroy();
        _this.component.earth.destroy();
        _this.component.moon.destroy();
        _this.component.mars.destroy();
        _this.component.jupiter.destroy();
        _this.component.saturn.destroy();
        _this.component.uranus.destroy();
        _this.component.neptune.destroy();
        
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
        _this.component.mercury.update();
        _this.component.venus.update();
        _this.component.earth.update();
        _this.component.moon.update();
        _this.component.mars.update();
        _this.component.jupiter.update();
        _this.component.saturn.update();
        _this.component.uranus.update();
        _this.component.neptune.update();
        
        _this.camera.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.clear();
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
}
