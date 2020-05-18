import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './environment/renderer';
import Scene from './environment/scene';
import Camera from './environment/camera';
import Light from './object/light';
import Mountain from './object/mountain';
import Ground from './object/ground';
import Star from './object/star';
import Meteor from './object/meteor';
import Spaceship from './object/spaceship';
import Loader from '../../controller/loader';

import './flight.less';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: [ // 地址
            {
                name: 'star',
                path: 'https://image.gaeamobile.net/image/20200515/164632/star.png'
            },
            {
                name: 'mountain',
                path: 'https://image.gaeamobile.net/image/20200515/164632/mountain.jpg'
            },
            {
                name: 'engine',
                path: 'https://image.gaeamobile.net/image/20200515/164632/engine.jpg'
            },
            {
                name: 'spaceship',
                path: 'https://image.gaeamobile.net/image/20200515/164632/ship_03.obj'
            }
        ] as object[],
        data: null as object // 数据
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private object: object = { // 对象
        light: null as Light, // 灯光
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
        
        Global.Function.hideCursor();
        
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
        
        _this.object.light = new Light(_this.scene);
        _this.object.mountain = new Mountain(_this.scene, resource.mountain);
        _this.object.ground = new Ground(_this.scene);
        _this.object.star = new Star(_this.scene, resource.star);
        _this.object.meteor = new Meteor(_this.scene);
        _this.object.spaceship = new Spaceship(_this.scene, resource.spaceship, resource.engine);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
        Global.GameDom.appendChild(_this.renderer.instance.domElement);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.isInit) return;
        
        _this.object.light.destroy();
        _this.object.mountain.destroy();
        _this.object.ground.destroy();
        _this.object.star.destroy();
        _this.object.meteor.destroy();
        _this.object.spaceship.destroy();
        
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
        
        _this.object.mountain.update();
        _this.object.ground.update();
        _this.object.star.update();
        _this.object.meteor.update();
        _this.object.spaceship.update();
        
        _this.camera.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
}
