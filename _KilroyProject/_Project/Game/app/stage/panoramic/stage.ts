import Global from '../../constant/global';
import _Stage from '../../interface/stage';

/**
 * Environment
 */
import Renderer from './environment/renderer';
import Scene from './environment/scene';
import Camera from './environment/camera';

/**
 * Controller
 */
import Panoramic from '../../controller/panoramic';
import Move from '../../controller/move';

/**
 * 场景
 */
export default class Stage implements _Stage {
    public readonly config: object = { // 配置
        dom: null as Element, // 元素
        
        // 环境
        renderer: null as Renderer,
        scene: null as Scene,
        camera: null as Camera,
        
        // 控制器
        controller: {}
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.config.dom = Global.GameDom;
        
        // 环境
        _this.config.renderer = new Renderer();
        _this.config.scene = new Scene();
        _this.config.camera = new Camera();
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
        
        // 添加渲染器
        _this.config.dom.appendChild(_this.config.renderer.instance.domElement);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this,
            imageWH = 1024;
        
        _this.config.constructor['panoramic'] = new Panoramic(_this.config.scene, {
            src: 'https://image.gaeamobile.net/image/20190717/181948/',
            width: imageWH,
            height: imageWH,
            side: [
                {
                    name: 'img_before.jpg',
                    position: [0, 0, -imageWH / 2],
                    rotation: [0, 0, 0]
                },
                {
                    name: 'img_after.jpg',
                    position: [0, 0, imageWH / 2],
                    rotation: [0, Math.PI, 0]
                },
                {
                    name: 'img_top.jpg',
                    position: [0, imageWH / 2, 0],
                    rotation: [Math.PI / 2, 0, Math.PI]
                },
                {
                    name: 'img_bottom.jpg',
                    position: [0, -imageWH / 2, 0],
                    rotation: [-Math.PI / 2, 0, Math.PI]
                },
                {
                    name: 'img_left.jpg',
                    position: [-imageWH / 2, 0, 0],
                    rotation: [0, Math.PI / 2, 0]
                },
                {
                    name: 'img_right.jpg',
                    position: [imageWH / 2, 0, 0],
                    rotation: [0, -Math.PI / 2, 0]
                }
            ]
        })
        _this.config.controller['move'] = new Move(_this.config.camera);
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        _this.config.controller['move'].update(isResize);
        
        _this.config.camera.update(isResize);
        _this.config.scene.update(isResize);
        _this.config.renderer.update(isResize);
        
        _this.config.renderer.instance.render(
            _this.config.scene.instance,
            _this.config.camera.instance
        );
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
    }
}
