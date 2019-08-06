/**
 * Public
 */
import { w } from '../../../_Base/js/window';

/**
 * Controller
 */
import App from '../controller/app';
import Application from '../controller/application';

/**
 * Object
 */
import Circle1 from '../object/graphics/circle1';

/**
 * 图形学
 */
class Graphics {
    /**
     * 原型对象
     * @constructor Graphics
     */
    constructor() {
        const _this = this;
        
        _this.config = {
            object: {
                circle1: Circle1
            }
        };
        
        _this.object = {};
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
    }
    
    /**
     * 创建
     * @param {object} config 配置
     * @return {object} 图形对象
     */
    create(config = {}) {
        const _this = this;
        
        const app = new App(config.id),
            object = new _this.config.object[config.type](config.config);
        
        _this.object[config.id] = Application.create(config.id + 'Canvas', {
            app: app,
            transparent: true,
            autoDensity: true,
            antialias: true,
            preserveDrawingBuffer: true,
            backgroundColor: 0x000000,
            clearBeforeRender: true,
            resizeTo: app
        });
        
        _this.object[config.id].stage.addChild(object.object);
        _this.object[config.id].ticker.add(() => {
            object.update();
        });
        _this.object[config.id].start();
        
        return _this.object[config.id];
    }
}

w.Graphics = new Graphics();

const c1 = w.Graphics.create({
    id: 'appKeyboard',
    type: 'circle1',
    config: {}
});

c1.move();
