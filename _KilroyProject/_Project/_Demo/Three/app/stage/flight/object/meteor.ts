import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 流星
 */
export default class Meteor implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private list: THREE.Mesh[] = []; // 流星列表
    
    /**
     * 构造函数
     * @constructor Star
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance as THREE.Scene;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    protected create(): void {
        const _this = this;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        Math.random() > 0.9 && _this.createStar();
        
        _this.list.forEach((v: THREE.Mesh, i: number, a: THREE.Mesh[]) => {
            if (v.position.z < -3000) {
                _this.list.splice(i, 1);
                this.scene.remove(v);
            }
            v.position.z -= 20;
        });
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        _this.list = [];
    }
    
    /**
     * 创建星星
     * @return {THREE.Mesh} 星星对象
     */
    private createStar(): void {
        const _this = this,
            spread = 1000, // 扩散范围
            geometry = new Global.THREE.CylinderGeometry(0, 2, 120, 10), // 几何
            material = new Global.THREE.MeshBasicMaterial({ // 材质
                color: '#ffffff',
                opacity: 1,
                blending: Global.THREE.AdditiveBlending,
                side: Global.THREE.FrontSide,
                transparent: false,
                depthTest: true
            }),
            cylinder = new Global.THREE.Mesh(geometry, material), // 圆柱
            random = Global.THREE.Math.randInt(-spread, spread); // 随机整数
        cylinder.position.set(random, 300, 200);
        cylinder.rotation.set(Math.PI / 2, 0, 0);
        _this.list.push(cylinder);
        _this.scene.add(cylinder);
    }
}
