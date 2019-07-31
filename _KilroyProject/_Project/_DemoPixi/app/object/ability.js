/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 能力图
 */
class Ability {
    /**
     * 原型对象
     * @constructor Ability
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            wh: config.wh || 520,
            floor: config.floor || 5,
            speed: config.speed || 0.02,
            position: config.position || [0, 0, 0, 0, 0, 0]
        };
        
        _this.panel = {
            color: 0x1B334C,
            alpha: 0.3,
            origin: _this.config.wh / 2,
            floor: _this.config.floor,
            padding: 15,
            border: {
                color: 0xA49956,
                alpha: 0.7,
                width: 1,
                surface: 6
            },
            object: new PIXI.Container()
        };
        
        _this.point = {
            color: 0xA49956,
            alpha: 1,
            wh: 10,
            padding: 2,
            position: [],
            object: new PIXI.Container()
        };
        
        _this.capability = {
            color: 0xA49956,
            alpha: 0.5,
            wh: 2,
            object: new PIXI.Graphics()
        };
        
        _this.object = new PIXI.Container();
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.createPanel();
        _this.createPoint();
        _this.createCapability();
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            if (_this.config.position[i] > _this.point.position[i]) {
                const position = parseInt(_this.point.position[i] * 1000 + _this.config.speed * 1000) / 1000;
                _this.movePoint(i, position);
            } else if (_this.config.position[i] < _this.point.position[i]) {
                const position = parseInt(_this.point.position[i] * 1000 - _this.config.speed * 1000) / 1000;
                _this.movePoint(i, position);
            }
        }
        
        _this.drawPolygon();
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
        
    }
    
    /**
     * 创建面板
     * @return {void}
     */
    createPanel() {
        const _this = this;
        
        for (let i = 0, n = _this.panel.floor; i < n; i++) {
            const floor = new PIXI.Graphics(),
                polygon = [],
                ability = 1 - (i + 1) / _this.panel.floor || 1;
            
            floor.lineStyle(_this.panel.border.width, _this.panel.border.color, _this.panel.border.alpha);
            floor.beginFill(_this.panel.color, _this.panel.alpha);
            
            for (let ii = 0, nn = _this.panel.border.surface; ii < nn; ii++) {
                const coordinate = _this.getCoordinate(ii, ability);
                polygon.push(coordinate.x);
                polygon.push(coordinate.y);
            }
            
            floor.drawPolygon(polygon);
            floor.endFill();
            
            _this.panel.object.addChild(floor);
        }
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            const border = new PIXI.Graphics(),
                coordinate = _this.getCoordinate(i, 1);
            
            border.lineStyle(_this.panel.border.width, _this.panel.border.color, _this.panel.border.alpha);
            border.beginFill(_this.panel.border.color, _this.panel.border.alpha);
            border.moveTo(_this.panel.origin, _this.panel.origin);
            border.lineTo(coordinate.x, coordinate.y);
            border.endFill();
            
            _this.panel.object.addChild(border);
        }
        
        _this.object.addChild(_this.panel.object);
    }
    
    /**
     * 创建点
     * @return {void}
     */
    createPoint() {
        const _this = this;
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            const point = new PIXI.Graphics();
            
            _this.point.position[i] = _this.config.position[i];
            
            const coordinate = _this.getCoordinate(i, _this.point.position[i]);
            
            point.lineStyle(0);
            point.beginFill(_this.point.color, _this.point.alpha);
            point.drawCircle(0, 0, _this.point.wh);
            point.endFill();
            
            point.lineStyle(1, _this.point.color, _this.point.alpha);
            point.beginFill(_this.point.color, 0);
            point.drawCircle(0, 0, _this.point.wh + _this.point.padding);
            point.endFill();
            point.zIndex = 2;
            point.x = coordinate.x;
            point.y = coordinate.y;
            
            _this.point.object.addChild(point);
        }
        
        _this.object.addChild(_this.point.object);
    }
    
    /**
     * 创建能力图
     * @return {void}
     */
    createCapability() {
        const _this = this;
        
        _this.capability.object.zIndex = 1;
        
        _this.object.addChild(_this.capability.object);
    }
    
    /**
     * 获取坐标
     * @param {number} n 点
     * @param {number} ability 能力百分比
     * @return {object} 坐标
     */
    getCoordinate(n, ability) {
        const _this = this,
            coordinate = {
                x: _this.panel.origin,
                y: _this.panel.origin
            },
            angle = Math.atan(0.6),
            spacing = _this.panel.origin - _this.panel.padding,
            position = spacing * ability,
            x = Math.cos(angle),
            y = Math.sin(angle);
        
        // 点-上
        if (n === 0) {
            coordinate.y -= position;
        }
        
        // 点-右上
        if (n === 1) {
            coordinate.x += position * x;
            coordinate.y -= position * y;
        }
        
        // 点-右下
        if (n === 2) {
            coordinate.x += position * x;
            coordinate.y += position * y;
        }
        
        // 点-下
        if (n === 3) {
            coordinate.y += position;
        }
        
        // 点-左下
        if (n === 4) {
            coordinate.x -= position * x;
            coordinate.y += position * y;
        }
        
        // 点-左上
        if (n === 5) {
            coordinate.x -= position * x;
            coordinate.y -= position * y;
        }
        
        return coordinate;
    }
    
    /**
     * 移动点
     * @param {number} n 点
     * @param {number} ability 能力百分比
     * @return {void}
     */
    movePoint(n, ability) {
        const _this = this,
            coordinate = _this.getCoordinate(n, ability);
        
        _this.point.position[n] = ability;
        _this.point.object.children[n].x = coordinate.x;
        _this.point.object.children[n].y = coordinate.y;
    }
    
    /**
     * 绘制多边形
     * @return {void}
     */
    drawPolygon() {
        const _this = this,
            polygon = [];
        
        _this.capability.object.clear();
        _this.capability.object.lineStyle(_this.capability.wh, _this.capability.color, 1);
        _this.capability.object.beginFill(_this.capability.color, _this.capability.alpha);
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            const coordinate = _this.getCoordinate(i, _this.point.position[i]);
            polygon.push(coordinate.x);
            polygon.push(coordinate.y);
        }
        
        _this.capability.object.drawPolygon(polygon);
        _this.capability.object.endFill();
    }
    
    /**
     * 显示能力图
     * @param {array} capability 能力值
     * @return {void}
     */
    showCapability(capability) {
        const _this = this,
            length = capability.length;
        
        if (capability.length !== 6) return;
        
        for (let i = 0; i < length; i++) {
            let value = parseInt(capability[i]);
            if (value <= 0) value = 0;
            if (value >= 10) value = 10;
            _this.config.position[i] = value / 10;
        }
    }
}

export default Ability;
