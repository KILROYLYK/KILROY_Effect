import * as THREE from 'three';
import _Environment from './_Environment';

/**
 * 场景
 */
export default class Scene extends _Environment {
    /**
     * 原型对象
     * @constructor Scene
     * @param {object:object} config 配置
     */
    constructor(config?: object) {
        super();
        const _this = this,
            color = (config && config.color) || '#000000',
            opacity = (config && config.opacity) || 0;
        
        _this.config = {
            background: new THREE.Color(color),
            fog: new THREE.FogExp2(color, opacity)
        };
        
        _this.create();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;

        _this.instance = new THREE.Scene();
        _this.instance.background = _this.config.background;
        _this.instance.fog = _this.config.fog;
    }
}
