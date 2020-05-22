import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './layout/renderer';
import Scene from './layout/scene';
import Camera from './layout/camera';
import Mountain from './component/mountain';
import Ground from './component/ground';
import Star from './component/star';
import Meteor from './component/meteor';
import Spaceship from './component/spaceship';
import Loader from '../../controller/loader';

import './static/css/flight.less';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: {
            star: 'https://image.gaeamobile.net/image/20200522/190159/star.png',
            mountain: 'https://image.gaeamobile.net/image/20200522/190159/mountain.jpg',
            engine: 'https://image.gaeamobile.net/image/20200522/190159/engine.jpg',
            spaceship: 'https://image.gaeamobile.net/image/20200522/190159/ship_03.obj'
        } as object,
        data: null as object // 数据
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private component: object = { // 组件
        mountain: null as Mountain, // 山脉
        ground: null as Ground, // 地形
        star: null as Star, // 星星
        meteor: null as Meteor, // 流星
        spaceship: null as Spaceship // 飞船
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
        const _this = this,
            resource = _this.resource.data;
        
        _this.renderer = new Renderer();
        _this.scene = new Scene();
        _this.camera = new Camera();
        
        _this.component.mountain = new Mountain(_this.scene, resource.mountain);
        _this.component.ground = new Ground(_this.scene);
        _this.component.star = new Star(_this.scene, resource.star);
        _this.component.meteor = new Meteor(_this.scene);
        _this.component.spaceship = new Spaceship(_this.scene, resource.spaceship, resource.engine);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
        Global.Dom.appendChild(_this.renderer.instance.domElement);
        Global.Function.showCursor(false);
        Global.Function.updateMouse();
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
        
        _this.component.mountain.destroy();
        _this.component.ground.destroy();
        _this.component.star.destroy();
        _this.component.meteor.destroy();
        _this.component.spaceship.destroy();
        
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
        
        _this.component.mountain.update();
        _this.component.ground.update();
        _this.component.star.update();
        _this.component.meteor.update();
        _this.component.spaceship.update();
        
        _this.camera.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
}
