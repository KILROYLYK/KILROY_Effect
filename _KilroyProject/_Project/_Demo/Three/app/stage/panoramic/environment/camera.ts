import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';

/**
 * 相机
 */
export default class Camera implements _Environment {
    public readonly config: object = { // 配置
    };
    public instance: THREE.PerspectiveCamera = null; // 实例
    
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
         60, _this.getAspect(), 1,  1000
        );
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance.position.set(0,0,0);
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
            _this.instance.aspect = _this.getAspect();
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
        
        _this.instance = null;
    }
    
    /**
     * 获取屏幕宽高比
     * @return {number} 宽高比
     */
    private getAspect(): number {
        const _this = this;
        return Global.Width / Global.Height;
    }
}
