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
     * @constructor ArrowKey
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            wh: config.wh || 200,
            direction: config.direction || 8,
            callback: config.callback || {}
        };
        
        _this.object = new PIXI.Container();
        
        _this.panel = {
            color: 0xCCCCCC,
            alpha: 0.5,
            origin: _this.config.wh / 2,
            radius: _this.config.wh / 2 * 0.6,
            zIndex: 0,
            object: new PIXI.Graphics()
        };
        
        _this.rocker = {
            color: 0xCCCCCC,
            alpha: 0.5,
            origin: _this.panel.origin,
            radius: _this.panel.radius * 0.55,
            zIndex: 1,
            flag: true,
            angle: 0,
            maxAngle: 1.6,
            sensitivity: _this.panel.radius * 0.2,
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
        _this.createRocker();
        
        _this.object.x = _this.panel.origin;
        _this.object.y = _this.panel.origin;
    }
    
    /**
     * 创建面板
     * @return {void}
     */
    createPanel() {
        const _this = this;
        
        _this.panel.object.lineStyle(0);
        _this.panel.object.beginFill(_this.panel.color, 1);
        _this.panel.object.drawCircle(0, 0, _this.panel.radius);
        _this.panel.object.endFill();
        _this.panel.object.alpha = _this.panel.alpha;
        _this.panel.object.zIndex = _this.panel.zIndex;
        _this.object.addChild(_this.panel.object);
    }
    
    /**
     * 创建摇杆
     * @return {void}
     */
    createRocker() {
        const _this = this;
        
        _this.rocker.object.lineStyle(0);
        _this.rocker.object.beginFill(_this.rocker.color, 1);
        _this.rocker.object.drawCircle(0, 0, _this.rocker.radius);
        _this.rocker.object.endFill();
        _this.rocker.object.alpha = _this.rocker.alpha;
        _this.rocker.object.zIndex = _this.rocker.zIndex;
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
        const _this = this,
            position = e.data.getLocalPosition(_this.object);
        
        if (!_this.rocker.flag) return;
        
        _this.rocker.position = position;
        _this.rocker.object.alpha = 0.7;
    }
    
    /**
     * 摇杆拖动移动
     * @param {object} e 焦点对象
     * @return {void}
     */
    rockerDragMove(e) {
        const _this = this,
            position = e.data.getLocalPosition(_this.object),
            x = position.x - _this.rocker.position.x,
            y = position.y - _this.rocker.position.y;
        
        if (!_this.rocker.flag) return;
        
        _this.rocker.angle = Math.atan(x / y);
        _this.rockerMove(x, y);
        _this.directionMove(x, y);
    }
    
    /**
     * 摇杆拖动结束
     * @param {object} e 焦点对象
     * @return {void}
     */
    rockerDragEnd(e) {
        const _this = this;
        
        _this.rocker.position = {
            x: 0,
            y: 0
        };
        _this.rocker.object.x = 0;
        _this.rocker.object.y = 0;
        _this.rocker.object.alpha = _this.rocker.alpha;
    }
    
    /**
     * 摇杆移动
     * @param {number} x X
     * @param {number} y Y
     * @return {object} 范围内坐标
     */
    rockerMove(x, y) {
        const _this = this,
            range = _this.panel.radius,
            angle = _this.rocker.angle,
            maxAngle = _this.rocker.maxAngle,
            X = Math.cos(angle),
            Y = Math.sin(angle),
            position = {
                x: x,
                y: y
            };
        
        if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) >= range) {
            if (x >= 0 && angle < 0 && angle > -maxAngle ||
                x < 0 && angle > 0 && angle < maxAngle) {
                position.x = -range * Y;
                position.y = -range * X;
            } else if (x >= 0 && angle > 0 && angle < maxAngle ||
                x < 0 && angle < 0 && angle > -maxAngle) {
                position.x = range * Y;
                position.y = range * X;
            } else {
                position.x = 0;
                position.y = 0;
            }
        }
        
        _this.rocker.object.x = position.x;
        _this.rocker.object.y = position.y;
    }
    
    /**
     * 方向移动
     * @param {number} x X
     * @param {number} y Y
     * @return {void}
     */
    directionMove(x, y) {
        const _this = this,
            angle = _this.rocker.angle,
            maxAngle = _this.rocker.maxAngle,
            absAngle = Math.abs(angle),
            sheet = maxAngle / 4;
        
        let direction = '';
        
        if (!_this.config.callback) return;
        
        if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < _this.rocker.sensitivity) return;
        
        if (x >= 0 && angle < 0 && angle > -maxAngle) {
            if (absAngle > 0 && absAngle <= sheet) {
                direction = 'top';
            } else if (absAngle > sheet && absAngle < sheet * 3) {
                direction = 'top right';
            } else if (absAngle >= sheet * 3 && absAngle < sheet * 4) {
                direction = 'right';
            }
        } else if (x >= 0 && angle > 0 && angle < maxAngle) {
            if (absAngle > 0 && absAngle <= sheet) {
                direction = 'bottom';
            } else if (absAngle > sheet && absAngle < sheet * 3) {
                direction = 'bottom right';
            } else if (absAngle >= sheet * 3 && absAngle < sheet * 4) {
                direction = 'right';
            }
        } else if (x < 0 && angle > 0 && angle < maxAngle) {
            if (absAngle > 0 && absAngle <= sheet) {
                direction = 'top';
            } else if (absAngle > sheet && absAngle < sheet * 3) {
                direction = 'top left';
            } else if (absAngle >= sheet * 3 && absAngle < sheet * 4) {
                direction = 'left';
            }
        } else if (x < 0 && angle < 0 && angle > -maxAngle) {
            if (absAngle > 0 && absAngle <= sheet) {
                direction = 'bottom';
            } else if (absAngle > sheet && absAngle < sheet * 3) {
                direction = 'bottom left';
            } else if (absAngle >= sheet * 3 && absAngle < sheet * 4) {
                direction = 'left';
            }
        }
        
        if (direction) _this.config.callback(direction);
    }
}

export default ArrowKey;
