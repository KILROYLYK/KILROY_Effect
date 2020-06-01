import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

import WaveVertex from './_OpenGL/waveVertex.c';
import WaveFragment from './_OpenGL/waveFragment.c';

/**
 * 波浪
 */
export default class Wave implements Component {
    private readonly name: string = 'Wave-波浪';
    
    private scene: THREE.Scene = null; // 场景
    
    private separation: number = 200; // 分离
    private mount: number = 50; // 山
    private cycle: number = 0; // 周期
    
    public instance: THREE.Points = null; // 实例
    
    /**
     * 构造函数
     * @constructor Wave
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this,
            particle = Math.pow(_this.mount, 2),
            positions = new Float32Array(particle * 3),
            scales = new Float32Array(particle);
        
        let i = 0,
            j = 0;
        
        for (let ix = 0; ix < _this.mount; ix++) {
            for (let iy = 0; iy < _this.mount; iy++) {
                positions[i] = ix * _this.separation - ((_this.mount * _this.separation) / 2); // x
                positions[i + 1] = 0; // y
                positions[i + 2] = iy * _this.separation - ((_this.mount * _this.separation) / 2); // z
                scales[j] = 1;
                i += 3;
                j++;
            }
        }
        
        const color = new THREE.Color('#ffffff');
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
        
        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: {
                    value: color
                },
            },
            vertexShader: WaveVertex,
            fragmentShader: WaveFragment
        });
        
        _this.instance = new THREE.Points(geometry, material);
        _this.instance.name = _this.name;
        _this.instance.position.set(0, -120, 0);
    }
    
    /**
     * 初始化
     * @return {void}
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
        
        if (!_this.instance) return;
        
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            positions = (_this.instance.geometry as any).attributes.position.array,
            scales = (_this.instance.geometry as any).attributes.scale.array;
        
        let i = 0,
            j = 0;
        
        for (let ix = 0; ix < _this.mount; ix++) {
            for (let iy = 0; iy < _this.mount; iy++) {
                positions[i + 1] = (Math.sin((ix + _this.cycle) * 0.3) * 50) +
                    (Math.sin((iy + _this.cycle) * 0.5) * 50);
                scales[j] = (Math.sin((ix + _this.cycle) * 0.3) + 1) * 8 +
                    (Math.sin((iy + _this.cycle) * 0.5) + 1) * 8;
                i += 3;
                j++;
            }
        }
    
        (_this.instance.geometry as any).attributes.position.needsUpdate = true;
        (_this.instance.geometry as any).attributes.scale.needsUpdate = true;
        
        _this.cycle += 0.1;
    }
}
