/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 方向键
 */
class ArrowKey {
    /**
     * 原型对象
     * @constructor Application
     */
    constructor() {
        const _this = this;
        
        _this.config = {
            position: '',
            callback: {
                top: null,
                left: null,
                right: null,
                bottom: null
            }
        };
        
        _this.object = new PIXI.Container();
        
        _this.panel = {
            color: 0xCCCCCC,
            alpha: 0.5,
            origin: 100,
            radius: 65,
            object: new PIXI.Graphics()
        };
        
        _this.arrow = {
            color: 0xCCCCCC,
            alpha: 0.3,
            width: 60,
            height: 30,
            object: {
                top: new PIXI.Graphics(),
                left: new PIXI.Graphics(),
                right: new PIXI.Graphics(),
                bottom: new PIXI.Graphics()
            }
        };
        
        _this.rocker = {
            color: 0xCCCCCC,
            alpha: 0.5,
            origin: _this.panel.origin,
            flag: false,
            radius: 35,
            position: {
                x: 0,
                y: 0
            },
            object: new PIXI.Graphics()
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.createPanel();
        _this.createArrow();
        _this.createRocker();
    }
    
    /**
     * 创建底座
     * @return {void}
     */
    createPanel() {
        const _this = this;
        
        _this.panel.object.lineStyle(0);
        _this.panel.object.beginFill(_this.panel.color, _this.panel.alpha);
        _this.panel.object.drawCircle(_this.panel.origin, _this.panel.origin, _this.panel.radius);
        _this.panel.object.endFill();
        _this.object.addChild(_this.panel.object);
    }
    
    /**
     * 创建方向
     * @return {void}
     */
    createArrow() {
        const _this = this;
        
        for (const key in _this.arrow.object) {
            _this.arrow.object[key].beginFill(_this.arrow.color, _this.arrow.alpha);
            _this.arrow.object[key].lineStyle(0);
            
            if (key === 'top') {
                _this.arrow.object[key].moveTo(100, 0);
                _this.arrow.object[key].lineTo(70, 30);
                _this.arrow.object[key].lineTo(100, 20);
                _this.arrow.object[key].lineTo(130, 30);
                _this.arrow.object[key].lineTo(100, 0);
            } else if (key === 'left') {
                _this.arrow.object[key].moveTo(0, 100);
                _this.arrow.object[key].lineTo(30, 70);
                _this.arrow.object[key].lineTo(20, 100);
                _this.arrow.object[key].lineTo(30, 130);
                _this.arrow.object[key].lineTo(0, 100);
            } else if (key === 'right') {
                _this.arrow.object[key].moveTo(200, 100);
                _this.arrow.object[key].lineTo(170, 70);
                _this.arrow.object[key].lineTo(180, 100);
                _this.arrow.object[key].lineTo(170, 130);
                _this.arrow.object[key].lineTo(200, 100);
            } else if (key === 'bottom') {
                _this.arrow.object[key].moveTo(100, 200);
                _this.arrow.object[key].lineTo(70, 170);
                _this.arrow.object[key].lineTo(100, 180);
                _this.arrow.object[key].lineTo(130, 170);
                _this.arrow.object[key].lineTo(100, 200);
            }
            
            _this.arrow.object[key].closePath();
            _this.arrow.object[key].endFill();
            _this.arrow.object[key].alpha = 0;
            _this.object.addChild(_this.arrow.object[key]);
        }
    }
    
    /**
     * 创建摇杆
     * @return {void}
     */
    createRocker() {
        const _this = this;
        
        _this.rocker.object.lineStyle(0);
        _this.rocker.object.beginFill(_this.rocker.color, _this.rocker.alpha);
        _this.rocker.object.drawCircle(_this.rocker.origin, _this.rocker.origin, _this.rocker.radius);
        _this.rocker.object.endFill();
        _this.rocker.object.interactive = true;
        _this.rocker.object.buttonMode = true;
        _this.rocker.object
            .on('pointerdown', _this.rockerDragStart.bind(_this))
            .on('pointermove', _this.rockerDragMove.bind(_this))
            .on('pointerup', _this.rockerDragEnd.bind(_this))
            .on('pointerupoutside', _this.rockerDragEnd.bind(_this));
        _this.object.addChild(_this.rocker.object);
    }
    
    /**
     * 摇杆拖动开始
     * @param {object} e 焦点对象
     * @return {void}
     */
    rockerDragStart(e) {
        const _this = this;
        
        _this.rocker.flag = true;
        _this.rocker.position = e.data.getLocalPosition(_this.object);
        _this.rocker.object.alpha = 1;
    }
    
    /**
     * 摇杆拖动移动
     * @param {object} e 焦点对象
     * @return {void}
     */
    rockerDragMove(e) {
        const _this = this,
            position = e.data.getLocalPosition(_this.object),
            limit = _this.panel.radius - 10;
        
        if (!_this.rocker.flag) return;
        
        let x = position.x - _this.rocker.position.x,
            y = position.y - _this.rocker.position.y;
        
        if (x < -limit) x = -limit;
        if (x > limit) x = limit;
        if (y < -limit) y = -limit;
        if (y > limit) y = limit;
        
        _this.rocker.object.x = x;
        _this.rocker.object.y = y;
        
        _this.fixDirection(x, y);
    }
    
    /**
     * 摇杆拖动结束
     * @param {object} e 焦点对象
     * @return {void}
     */
    rockerDragEnd(e) {
        const _this = this;
        
        _this.rocker.flag = false;
        _this.rocker.position = {
            x: 0,
            y: 0
        };
        _this.rocker.object.x = 0;
        _this.rocker.object.y = 0;
        _this.rocker.object.alpha = 0.3;
        
        _this.directionStop();
    }
    
    /**
     * 判断方向
     * @param {number} x X
     * @param {number} y Y
     * @return {void}
     */
    fixDirection(x, y) {
        const _this = this;
        
        if (y < -_this.panel.radius / 2 &&
            Math.abs(x) < _this.panel.radius &&
            Math.abs(y) >= Math.abs(x)) {
            _this.directionTop();
        } else if (y > _this.panel.radius / 2 &&
            Math.abs(x) < _this.panel.radius &&
            Math.abs(y) >= Math.abs(x)) {
            _this.directionBottom();
        } else if (x < -_this.panel.radius / 2 &&
            Math.abs(y) < _this.panel.radius &&
            Math.abs(x) > Math.abs(y)) {
            _this.directionLeft();
        } else if (x > _this.panel.radius / 2 &&
            Math.abs(y) < _this.panel.radius &&
            Math.abs(x) > Math.abs(y)) {
            _this.directionRight();
        } else {
            _this.directionStop();
        }
    }
    
    /**
     * 没有移动
     * @return {void}
     */
    directionStop() {
        const _this = this;
        
        _this.config.position = '';
        _this.arrow.object.top.alpha = 0;
        _this.arrow.object.left.alpha = 0;
        _this.arrow.object.right.alpha = 0;
        _this.arrow.object.bottom.alpha = 0;
    }
    
    /**
     * 向上移动
     * @return {void}
     */
    directionTop() {
        const _this = this;
    
        _this.config.position = 'top';
        _this.arrow.object.top.alpha = 1;
        _this.arrow.object.left.alpha = 0;
        _this.arrow.object.right.alpha = 0;
        _this.arrow.object.bottom.alpha = 0;
        _this.config.callback.top();
    }
    
    /**
     * 向左移动
     * @return {void}
     */
    directionLeft() {
        const _this = this;
    
        _this.config.position = 'left';
        _this.arrow.object.top.alpha = 0;
        _this.arrow.object.left.alpha = 1;
        _this.arrow.object.right.alpha = 0;
        _this.arrow.object.bottom.alpha = 0;
        _this.config.callback.left();
    }
    
    /**
     * 向右移动
     * @return {void}
     */
    directionRight() {
        const _this = this;
    
        _this.config.position = 'right';
        _this.arrow.object.top.alpha = 0;
        _this.arrow.object.left.alpha = 0;
        _this.arrow.object.right.alpha = 1;
        _this.arrow.object.bottom.alpha = 0;
        _this.config.callback.right();
    }
    
    /**
     * 向下移动
     * @return {void}
     */
    directionBottom() {
        const _this = this;
    
        _this.config.position = 'bottom';
        _this.arrow.object.top.alpha = 0;
        _this.arrow.object.left.alpha = 0;
        _this.arrow.object.right.alpha = 0;
        _this.arrow.object.bottom.alpha = 1;
        _this.config.callback.bottom();
    }
}

export default new ArrowKey();
