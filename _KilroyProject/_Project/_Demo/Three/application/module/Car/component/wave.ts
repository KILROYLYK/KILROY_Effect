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

    private row: number = 30; // 列行数
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
            interval = 20, // 间隔
            particle = Math.pow(_this.row, 2),
            positions = new Float32Array(particle * 3),
            scales = new Float32Array(particle);

        let i = 0,
            j = 0;

        for (let ix = 0; ix < _this.row; ix++) {
            for (let iy = 0; iy < _this.row; iy++) {
                positions[i] = ix * interval - ((_this.row * interval) / 2); // x
                positions[i + 1] = 0; // y
                positions[i + 2] = iy * interval - ((_this.row * interval) / 2); // z
                scales[j] = 1;
                i += 3;
                j++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: {
                    value: new THREE.Color('#ffffff')
                },
            },
            vertexShader: WaveVertex,
            fragmentShader: WaveFragment
        });

        _this.instance = new THREE.Points(geometry, material);
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 5, 0);
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
            slope = 2, // 坡度
            scale = 1, // 缩放
            geometry = _this.instance.geometry as any,
            positions = geometry.attributes.position.array,
            scales = geometry.attributes.scale.array;

        let i = 0,
            j = 0;

        for (let ix = 0; ix < _this.row; ix++) {
            for (let iy = 0; iy < _this.row; iy++) {
                positions[i + 1] =
                    (Math.sin((ix + _this.cycle) * 0.3) * slope) +
                    (Math.sin((iy + _this.cycle) * 0.5) * slope);
                scales[j] =
                    (Math.sin((ix + _this.cycle) * 0.3) + 1) * scale +
                    (Math.sin((iy + _this.cycle) * 0.5) + 1) * scale;
                i += 3;
                j++;
            }
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.scale.needsUpdate = true;

        _this.cycle -= 0.1;
    }
}
