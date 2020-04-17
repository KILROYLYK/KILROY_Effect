import Global from '../constant/global';
import _Controller from '../interface/controller';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

/**
 * 全景
 */
export default class Panoramic implements _Controller {
    public readonly config: object = { // 配置
        src: '',
        wh: 1024,
        side: [] as {
            name: string // 图片名称
            position: [number, number, number] // 位置
            rotation: [number, number, number] // 角度
        }[]
    };
    
    public scene: object = null; // 场景
    
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     */
    constructor(scene) {
        const _this = this;
        
        _this.scene = scene.instance;
        
        _this.config.src = 'https://image.gaeamobile.net/image/20190717/181948/';
        _this.config.side = [
            {
                name: 'img_before.jpg',
                position: [0, 0, -_this.config.wh / 2],
                rotation: [0, 0, 0]
            },
            {
                name: 'img_after.jpg',
                position: [0, 0, _this.config.wh / 2],
                rotation: [0, Math.PI, 0]
            },
            {
                name: 'img_top.jpg',
                position: [0, _this.config.wh / 2, 0],
                rotation: [Math.PI / 2, 0, Math.PI]
            },
            {
                name: 'img_bottom.jpg',
                position: [0, -_this.config.wh / 2, 0],
                rotation: [-Math.PI / 2, 0, Math.PI]
            },
            {
                name: 'img_left.jpg',
                position: [-_this.config.wh / 2, 0, 0],
                rotation: [0, Math.PI / 2, 0]
            },
            {
                name: 'img_right.jpg',
                position: [_this.config.wh / 2, 0, 0],
                rotation: [0, -Math.PI / 2, 0]
            }
        ];
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    private init(): void {
        const _this = this;
        
        _this.createSide();
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
    
    /**
     * 创建6面立方体
     * @return {void}
     */
    private createSide(): void {
        const _this = this,
            D = Global.Document;
        
        for (let i = 0; i < _this.config.side.length; i++) {
            const side = _this.config.side[i],
                img = D.createElement('img');
            
            img.width = _this.config.wh + 6;
            img.height = _this.config.wh + 6;
            img.src = _this.config.src + side.name;
    
            const css3Loader = new CSS3DObject(img);
            css3Loader.position.fromArray(side.position);
            css3Loader.rotation.fromArray(side.rotation);
            
            _this.scene.add(css3Loader);
        }
    }
}
