import Global from '../../../constant/global';
import _Object from '../../../interface/object';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/**
 * 地面
 */
export default class Ground implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private simplex: SimplexNoise = null; // 简单声音
    private geometry: THREE.PlaneGeometry = null; // 几何体
    private material: THREE.MeshPhongMaterial = null; // 材料
    private plane: THREE.Mesh = null; // 平原
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
        y: -300,
        z: -1000
    };
    private readonly lookP: object = { // 视觉位置
        x: 29.8,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Ground
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
        const _this = this;
        
        _this.instance = new Global.THREE.Object3D();
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
        
        this.simplex = new SimplexNoise()
        this.geometry = new Global.THREE.PlaneGeometry(4000, 2000, 128, 64);
        
        this.material = new Global.THREE.MeshLambertMaterial({
            color: '#ffffff',
            opacity: 1,
            blending: Global.THREE.NoBlending,
            side: Global.THREE.FrontSide,
            transparent: false,
            depthTest: false,
            wireframe: true
        });
        
        this.plane = new Global.THREE.Mesh(this.geometry, this.material);
        this.plane.position.set(0, 0, 0);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    
        _this.centerP.x = Global.Width / 2;
        _this.centerP.y = Global.Height / 2;
        
        _this.instance.add(_this.plane);
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
        
        if (!_this.instance) return;
        
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            factor = 300,
            scale = 30,
            speed = 0.0015,
            ease = 30;
        
        for (const vertex of _this.geometry.vertices) {
            const xoff = (vertex.x / factor),
                yoff = (vertex.y / factor) + _this.cycle,
                rand = _this.simplex.noise3d(xoff, yoff, 0) * scale;
            vertex.z = rand;
        }
        _this.geometry.verticesNeedUpdate = true;
        _this.cycle += speed;
        
        _this.moveP.x = -((_this.mouseP.x - _this.centerP.x) * 0.4);
        
        Global.Function.setEasePosition(_this.instance.position, _this.moveP, ease);
        Global.Function.setEasePosition(_this.instance.rotation, _this.lookP, ease);
    }
}
