import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './environment/renderer';
import Scene from './environment/scene';
import Camera from './environment/camera';
import Light from './object/light';
import Meteor from './object/meteor';
import Loader from '../../controller/loader';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private readonly config: object = { // 配置
        resource: { // 资源
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
        light: null as Light, // 灯光
        meteor: null as Meteor, // 流星
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
        _this.object.meteor = new Meteor(_this.scene);
        
        _this.controller.loader = new Loader(_this.config.resource.path, {
            loadedCallback(index, total, progress) {
                // console.log(`加载进度：${ index } ${ total } ${ progress }`);
            },
            finishCallback(data) {
                _this.config.resource.data = data;
            }
        });
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        Global.GameDom.style.cursor = 'none'; // 隐藏鼠标
        Global.GameDom.appendChild(_this.renderer.instance.domElement);
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        _this.object.meteor.update();
        
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
        _this.object.meteor.destroy();
    }
}
