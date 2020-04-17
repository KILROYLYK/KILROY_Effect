import Global from '../constant/global';
import _Controller from '../interface/controller';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export interface PanoramicConfig { // 控制器配置
    src: string
    width: number
    height: number
    side: {
        name: string // 图片名称
        position: [number, number, number] // 位置
        rotation: [number, number, number] // 角度
    }[]
}

/**
 * 全景
 */
export default class Panoramic implements _Controller {
    public readonly config: PanoramicConfig = { // 配置
        src: '',
        width: 0,
        height: 0,
        side: []
    };
    
    public scene: object = null; // 场景
    
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     * @param {object} config 配置
     */
    constructor(scene, config: PanoramicConfig) {
        const _this = this;
        
        _this.scene = scene;
        _this.config.src = config.src;
        _this.config.width = config.width;
        _this.config.height = config.height;
        _this.config.side = config.side;
        
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
     * 创建3D面
     * @return {void}
     */
    private createSide(): void {
        const _this = this,
            D = Global.Document;
        
        for (let i = 0; i < _this.config.side.length; i++) {
            const side = _this.config.side[i],
                img = D.createElement('img');
            
            img.width = _this.config.width + 6;
            img.src = _this.config.src + side.name;
            
            const css3Loader = new CSS3DObject(img);
            css3Loader.position.fromArray(side.position);
            css3Loader.rotation.fromArray(side.rotation);
            
            _this.scene.add(css3Loader);
        }
    }
}
