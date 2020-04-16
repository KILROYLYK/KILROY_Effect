import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';

/**
 * 相机
 */
export default class Camera implements _Environment {
    public readonly config: object = { // 配置
        fov: 60, //摄像机视锥体垂直视野角度
        aspect: Global.Width / Global.Height, //摄像机视锥体长宽比
        near: 1, //摄像机视锥体近端面
        far: 1000, //摄像机视锥体远端面
        x: 0,
        y: 200,
        z: 0
    };
    public instance: object = null; // 实例
    
    /**
     * 构造函数
     * @constructor Camera
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
        const _this = this;
        
        if (_this.instance) return;
        
        _this.instance = new Global.THREE.PerspectiveCamera(
            _this.config.fov,
            _this.config.aspect,
            _this.config.near,
            _this.config.far
        );
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance.position.set(
            _this.config.x,
            _this.config.y,
            _this.config.z
        );
    }
    
    /**
     * 更新
     * @param {boolean} isResize 屏幕是否变化
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance) return;
        
       
        if (isResize) { // 屏幕变化
            _this.config.aspect = Global.Width / Global.Height;
            _this.instance.aspect = _this.config.aspect;
            _this.instance.updateProjectionMatrix();
        }
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        _this.instance.destroy(true)
        _this.instance = null;
    }
}
