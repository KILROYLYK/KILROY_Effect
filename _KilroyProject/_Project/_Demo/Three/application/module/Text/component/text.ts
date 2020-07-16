import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';

import TextVertex from './_OpenGL/textVertex.c';
import TextFragment from './_OpenGL/textFragment.c';

/**
 * 文案
 */
export default class Text implements Component {
    private readonly name: string = 'Text-文案';
    
    private scene: THREE.Scene = null; // 场景
    private font: THREE.Font = null; // 字体
    
    private uniform: { // 匀实
        [uniform: string]: {
            value: any
        }
    } = null;
    
    public instance: THREE.Mesh = null; // 实例
    
    /**
     * 构造函数
     * @constructor Text
     * @param {object} scene 场景
     * @param {THREE.Font)} font 字体
     */
    constructor(scene: object, font: THREE.Font) {
        const _this = this;
        
        _this.scene = scene.instance;
        _this.font = font;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        const geometry = new THREE.TextGeometry('KILROY', {
            font: _this.font,
            size: 40,
            height: 5,
            curveSegments: 3,
            bevelThickness: 2,
            bevelSize: 1,
            bevelEnabled: true
        });
        geometry.center();
        
        const tessellateModifier = new TessellateModifier(8);
        for (let i = 0; i < 6; i++) {
            tessellateModifier.modify(geometry);
        }
        
        const bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
        
        const numFaces = bufferGeometry.attributes.position.count / 3,
            colors = new Float32Array(numFaces * 3 * 3),
            displacement = new Float32Array(numFaces * 3 * 3),
            color = new THREE.Color();
        
        for (let f = 0; f < numFaces; f++) {
            const index = 9 * f,
                d = 10 * (0.5 - Math.random());
            
            color.setHSL(
                0.8 * Math.random(),
                0.5 + 0.5 * Math.random(),
                0.5 + 0.5 * Math.random()
            );
            
            for (let i = 0; i < 3; i++) {
                colors[index + (3 * i)] = color.r;
                colors[index + (3 * i) + 1] = color.g;
                colors[index + (3 * i) + 2] = color.b;
                displacement[index + (3 * i)] = d;
                displacement[index + (3 * i) + 1] = d;
                displacement[index + (3 * i) + 2] = d;
            }
        }
        
        bufferGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        bufferGeometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 3));
        
        _this.uniform = {
            amplitude: {
                value: 0.0
            }
        };
        
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: _this.uniform,
            vertexShader: TextVertex,
            fragmentShader: TextFragment
        });
        
        _this.instance = new THREE.Mesh(bufferGeometry, shaderMaterial);
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
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
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            time = Date.now() * 0.002;
        
        if (!_this.instance) return;
        
        _this.uniform.amplitude.value = 1.0 + Math.sin(time * 0.5);
    }
}
