import Global from '../constant/global';
import _Controller from '../interface/controller';

interface Resource { // 资源
    name: string // 图片名称
    position: [ number, number, number ] // 位置
    rotation: [ number, number, number ] // 角度
}

/**
 * 全景
 */
export default class Panoramic implements _Controller {
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private geometry: THREE.SphereGeometry = null; // 几何体
    private material: THREE.MeshBasicMaterial = null; // 材料
    
    public instance: THREE.Mesh = null; // 实例
    
    
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     * @param {THREE.Texture} texture 纹理
     */
    constructor(scene: object, texture: THREE.Texture) {
        const _this = this;
        
        _this.scene = scene.instance;
        _this.texture = texture;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.geometry = new Global.THREE.SphereGeometry(500, 60, 40);
        _this.geometry.scale(-1, 1, 1);
        _this.geometry.rotateY(-Math.PI / 2);
        
        _this.material = new Global.THREE.MeshBasicMaterial({
            map: _this.texture
        });
        
        _this.instance = new Global.THREE.Mesh(_this.geometry, _this.material);
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    private init(): void {
        const _this = this;
        
        _this.scene.add(_this.instance);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
}
