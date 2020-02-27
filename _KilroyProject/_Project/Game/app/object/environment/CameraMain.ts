import Global from '../../constant/Global';
import _Environment from './_Environment';

/**
 * 相机
 */
export default class CameraMain extends _Environment {
    /**
     * 构造函数
     * @constructor CameraMain
     */
    protected constructor() {
        super();
        
        const _this = this;
    
        _this.config = {
            dom: Global.GameDom,
            fov: 45, //摄像机视锥体垂直视野角度
            aspect: Global.Width / Global.Height, //摄像机视锥体长宽比
            near: 1, //摄像机视锥体近端面
            far: 1000, //摄像机视锥体远端面
            x: 0,
            y: 0,
            z: 0
        };
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
        
        super.create();
        
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
        
        super.init();
        
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
        
        super.update();
    }
}
