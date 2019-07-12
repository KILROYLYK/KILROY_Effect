/**
 * Three
 */
const THREE = require('three');

/**
 * 移动
 */
class Move {
    /**
     * Move原型对象
     * @constructor Move
     * @param {object} dom 父级Dom
     * @param {object} camera 相机
     */
    constructor(dom, camera) {
        const _this = this;
        
        _this.dom = dom;
        
        _this.camera = camera;
        
        _this.config = {
            isMove: true, //开关移动
        };
        
        return _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        _this.moveClick();
        
        return _this.camera;
    }
    
    /**
     * 点击移动
     * @return {void}
     */
    moveClick() {
        const _this = this;
        
        /**
         * 鼠标按下
         * @param {object} e 鼠标
         * @return {void}
         */
        function mousedown(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!_this.config.isMove) return;
            
            
            _this.dom.addEventListener('mousemove', mousemove, false);
            _this.dom.addEventListener('mouseup', mouseup, false);
        }
        
        /**
         * 鼠标移动
         * @param {object} e 鼠标
         * @return {void}
         */
        function mousemove(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const mouseX = e.x || e.clientX,
                mouseY = e.y || e.clientY;
            
            if (!_this.config.isMove) return;
            
     
            _this.renderCamera();
        }
        
        /**
         * 鼠标抬起
         * @param {object} e 鼠标
         * @return {void}
         */
        function mouseup(e) {
            e.preventDefault();
            e.stopPropagation();
            
            _this.dom.removeEventListener('mousemove', mousemove, false);
            _this.dom.removeEventListener('mouseup', mouseup, false);
        }
        
        _this.dom.addEventListener('mousedown', mousedown, false);
    }
    
    /**
     * 刷新镜头
     * @return {void}
     */
    renderCamera() {
        const _this = this;
        
     
    }
}

export default Move;
