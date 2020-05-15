import Global from '../../../constant/global';
import _Object from '../../../interface/object';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/**
 * 山脉
 */
export default class Mountain implements _Object {
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private simplex: SimplexNoise = null; // 简单声音
    private geometry: THREE.PlaneGeometry = null; // 几何体
    private light: THREE.PointLight = null; // 灯光
    private material: THREE.MeshPhongMaterial = null; // 材料
    private terrain: THREE.Mesh = null; // 实例
    private cycle: number = 0; // 周期
    private readonly centerP: object = { // 中心位置
        x: 0,
        y: 0
    };
    private readonly mouseP: object = { // 鼠标位置
        x: 0,
        y: 0
    };
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: 0,
        z: -3500
    };
    private readonly lookP: object = { // 视觉位置
        x: 0,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Object3D = null; // 3D对象
    
    /**
     * 构造函数
     * @constructor Mountain
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
        const _this = this,
            color = new Global.THREE.Color();
        color.setHSL(0.038, 0.8, 0.5);
        
        _this.texture.wrapT
            = _this.texture.wrapS
            = Global.THREE.RepeatWrapping;
        
        _this.simplex = new SimplexNoise();
        _this.geometry = new Global.THREE.PlaneGeometry(10000, 1000, 128, 32);
        
        // 灯光
        _this.light = new Global.THREE.PointLight('#ffffff', 8, 5500);
        _this.light.position.set(0, 1200, -3500);
        _this.light.color = color;
        _this.light.castShadow = false;
        
        // 材料
        _this.material = new Global.THREE.MeshPhongMaterial({
            color: '#ffffff',
            opacity: 1,
            map: _this.texture,
            blending: Global.THREE.NoBlending,
            side: Global.THREE.BackSide,
            transparent: true,
            depthTest: false
        });
        
        _this.terrain = new Global.THREE.Mesh(_this.geometry, _this.material);
        _this.terrain.position.set(0, -500, -3000);
        _this.terrain.rotation.x = (Math.PI / 2) + 1.35;
        
        _this.instance = new Global.THREE.Object3D();
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.centerP.x = Global.Width / 2;
        _this.centerP.y = Global.Height / 2;
        
        _this.instance.add(_this.light);
        _this.instance.add(_this.terrain);
        _this.scene.add(_this.instance);
        
        Global.Window.addEventListener('mousemove', (e: MouseEvent) => {
            _this.mouseP.x = e.clientX;
            _this.mouseP.y = e.clientY;
        }, false);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            factor = 1000,
            scale = 500,
            speed = 0.0005,
            ease = 10;
        
        _this.moveP.x = -((_this.mouseP.x - _this.centerP.x) * 0.2);
        
        for (const vertex of _this.geometry.vertices) {
            const xoff = (vertex.x / factor),
                yoff = (vertex.y / factor) + _this.cycle,
                rand = _this.simplex.noise3d(xoff, yoff, 0) * scale;
            
            vertex.z = rand;
        }
        _this.geometry.verticesNeedUpdate = true;
        _this.cycle -= speed;
        
        Global.Function.setEasePosition(_this.instance.position, _this.moveP, ease);
        Global.Function.setEasePosition(_this.instance.rotation, _this.lookP, ease);
    }
}
