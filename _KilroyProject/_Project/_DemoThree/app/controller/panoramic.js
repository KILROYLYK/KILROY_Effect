/**
 * Public
 */
import { d } from '../../../_Base/js/window';

/**
 * Three
 */
import { CSS3DObject } from '../../../$Plugin/Three/examples/jsm/renderers/CSS3DRenderer';

/**
 * Controller
 */
import Move from '../controller/move';

/**
 * 全景
 */
class Panoramic {
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     * @param {object} camera 相机
     * @param {object} config 配置
     */
    constructor(scene, camera, config = {}) {
        const _this = this;
        
        _this.scene = scene;
        _this.camera = camera;
        
        _this.config = {
            side: [
                {
                    url: 'img_before.jpg',
                    position: [0, 0, -_this.img.width / 2],
                    rotation: [0, 0, 0]
                },
                {
                    url: 'img_after.jpg',
                    position: [0, 0, _this.img.width / 2],
                    rotation: [0, Math.PI, 0]
                },
                {
                    url: 'img_top.jpg',
                    position: [0, _this.img.width / 2, 0],
                    rotation: [Math.PI / 2, 0, Math.PI]
                },
                {
                    url: 'img_bottom.jpg',
                    position: [0, -_this.img.width / 2, 0],
                    rotation: [-Math.PI / 2, 0, Math.PI]
                },
                {
                    url: 'img_left.jpg',
                    position: [-_this.img.width / 2, 0, 0],
                    rotation: [0, Math.PI / 2, 0]
                },
                {
                    url: 'img_right.jpg',
                    position: [_this.img.width / 2, 0, 0],
                    rotation: [0, -Math.PI / 2, 0]
                }
            ]
        };
        
        _this.object = null;
    
        _this.move = new Move(_this.camera, {
            walk: false
        });
    
        _this.img = {
            src: config.img,
            width: config.width || 1024,
            height: config.width || 1024
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        _this.createSide();
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
        
        _this.move.update();
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
    }
    
    /**
     * 创建3D面
     * @return {void}
     */
    createSide() {
        const _this = this;
        
        for (let i = 0; i < _this.config.side.length; i++) {
            const side = _this.config.side[i];
            const img = d.createElement('img');
            
            img.width = _this.img.width + 6;
            img.src = _this.img.src + side.url;
            
            const css3Loader = new CSS3DObject(img);
            css3Loader.position.fromArray(side.position);
            css3Loader.rotation.fromArray(side.rotation);
            
            _this.scene.add(css3Loader);
        }
    }
}

export default Panoramic;
