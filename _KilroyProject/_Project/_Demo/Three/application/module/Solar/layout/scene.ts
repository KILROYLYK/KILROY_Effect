import Global from '../../../constant/global';
import Layout from '../../../interface/layout';

import * as THREE from 'three';

/**
 * 场景
 */
export default class Scene implements Layout {
    public instance: THREE.Scene = null; // 实例
    
    /**
     * 构造函数
     * @constructor Scene
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
        const _this = this,
            color = '#222222';
        
        _this.instance = new THREE.Scene();
        _this.instance.background = new THREE.Color(color);
        // _this.instance.fog = new THREE.FogExp2(color, 0.0003);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    }
}
