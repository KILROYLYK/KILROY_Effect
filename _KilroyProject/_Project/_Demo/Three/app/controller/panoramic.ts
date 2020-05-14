import Global from '../constant/global';
import _Controller from '../interface/controller';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

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
    
    private readonly src: string = 'https://image.gaeamobile.net/image/20190717/181948/'; // 资源地址
    private readonly size: number = 1024; // 平面尺寸
    private side: Resource[] = []; // 平面列表
    
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance;
        _this.side = [
            {
                name: 'img_before.jpg',
                position: [ 0, 0, -_this.size / 2 ],
                rotation: [ 0, 0, 0 ]
            },
            {
                name: 'img_after.jpg',
                position: [ 0, 0, _this.size / 2 ],
                rotation: [ 0, Math.PI, 0 ]
            },
            {
                name: 'img_top.jpg',
                position: [ 0, _this.size / 2, 0 ],
                rotation: [ Math.PI / 2, 0, Math.PI ]
            },
            {
                name: 'img_bottom.jpg',
                position: [ 0, -_this.size / 2, 0 ],
                rotation: [ -Math.PI / 2, 0, Math.PI ]
            },
            {
                name: 'img_left.jpg',
                position: [ -_this.size / 2, 0, 0 ],
                rotation: [ 0, Math.PI / 2, 0 ]
            },
            {
                name: 'img_right.jpg',
                position: [ _this.size / 2, 0, 0 ],
                rotation: [ 0, -Math.PI / 2, 0 ]
            }
        ];
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
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
        
        _this.side.forEach((v: Resource, i: number, a: Resource[]) => {
            const side = _this.side[i],
                img = D.createElement('img');
            
            img.width = _this.size + 6;
            img.height = _this.size + 6;
            img.src = _this.src + side.name;
            
            const css3Loader = new CSS3DObject(img);
            css3Loader.position.fromArray(side.position);
            css3Loader.rotation.fromArray(side.rotation);
            
            _this.scene.add(css3Loader);
        });
    }
}
