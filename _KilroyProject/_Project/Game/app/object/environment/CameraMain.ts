import Global from '../../constant/Global';
import _Environment from '../../interface/Environment';

/**
 * 相机
 */
export default class CameraMain implements _Environment {
    public config: any = {};
    public instance: any = null;
    
    protected isCreate: boolean = false;
    
    /**
     * 构造函数
     * @constructor CameraMain
     */
    protected constructor() {
        const _this = this;
        
        _this.config = {
            dom: Global.GameDom,
            fov: 30, //摄像机视锥体垂直视野角度
            aspect: Global.Width / Global.Height, //摄像机视锥体长宽比
            near: 1, //摄像机视锥体近端面
            far: 1000, //摄像机视锥体远端面
            x: 1000,
            y: 50,
            z: 1500
        };
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    protected create(): void {
        const _this = this;
        
        if (_this.isCreate) return;
        _this.isCreate = true;
        
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
    protected init(): void {
        const _this = this;
        
        if (!_this.isCreate) return;
        
        _this.instance.position.set(
            _this.config.x,
            _this.config.y,
            _this.config.z
        );
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
    
        if (!_this.isCreate) return;
        
        if (isResize) {
            _this.instance.aspect = Global.Width / Global.Height;
            _this.instance.updateProjectionMatrix();
        }
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.isCreate) return;
        _this.instance = null;
        _this.isCreate = false;
    }
}
