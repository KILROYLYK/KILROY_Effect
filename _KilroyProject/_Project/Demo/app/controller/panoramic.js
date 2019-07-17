/**
 * Public
 */
import { Base } from '../../../_Base/js/window';

/**
 * 移动
 */
class panoramic {
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     * @param {object} camera 相机
     * @param {object} renderer 渲染器
     */
    constructor(scene, camera, renderer) {
        const _this = this;
        
        _this.scene = scene;
        _this.camera = camera;
        _this.renderer = renderer;
        
        _this.config = {
        
        };
        
        _this.object = null;
        
        return _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        

        _this.resizeUpdate();
        
        return _this.object;
    }
    
    /**
     * Resize自动更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
        
        Base.resizeWindow(() => {
  
        });
    }
}

export default panoramic;
