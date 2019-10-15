/**
 * Plugin
 */
const PIXI = require('pixi.js');

/**
 * Constant
 */
import { type, matrix } from '../constant/maze';

/**
 * 迷宫
 */
class Maze {
    /**
     * 原型对象
     * @constructor Maze
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this,
            maze = matrix[config.map || 0];
        
        _this.config = {
            resources: config.resources,
            wh: config.wh || 500,
            row: maze.grid,
            multiple: config.multiple || 5,
            enter: maze.enter,
            out: maze.out
        };
        
        _this.object = new PIXI.Container();
        
        _this.map = {
            color: 0xEAD8A0,
            alpha: 1,
            x: 0,
            y: 0,
            wh: _this.config.wh * _this.config.multiple,
            wall: type,
            matrix: maze.map,
            object: new PIXI.Graphics()
        };
        
        _this.grid = {
            color: 0x85B211,
            alpha: 1,
            x: 0,
            y: 0,
            wh: _this.config.wh * _this.config.multiple / _this.config.row,
            row: _this.config.row,
            object: new PIXI.Graphics()
        };
        
        _this.wall = {
            wh: _this.grid.wh / 3,
            num: 3,
            color: 0xEAD8A0
        };
        
        _this.border = {
            width: _this.map.wh / 50,
            height: _this.map.wh / 50 / (96 / 27),
            num: 50
        };
        
        _this.img = {
            border: _this.config.resources.border.texture,
            lawn: _this.config.resources.lawn.texture,
            grass: _this.config.resources.grass.texture
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        createMap.call(_this);
        createBorder.call(_this);
        createGrid.call(_this);
    }
}

/**
 * 创建地图
 * @return {void}
 */
function createMap() {
    const _this = this;
    
    _this.object.addChild(_this.map.object);
}

/**
 * 创建边界
 * @return {void}
 */
function createBorder() {
    const _this = this,
        wh = _this.map.wh,
        paste = 0.35;
    
    for (let i = 0, n = 4; i < n; i++) {
        const border = new PIXI.Container();
        
        border.width = _this.border.width * _this.border.index;
        border.height = _this.border.height;
        
        if (i === 0) {
            border.x = -_this.border.height * paste + _this.border.width / 2 - _this.border.height;
            border.y = -_this.border.height * paste - _this.wall.wh / 2;
        }
        if (i === 1) {
            border.x = -_this.border.height * paste - _this.wall.wh / 2;
            border.y = -_this.border.height * paste + _this.border.width / 2 - _this.border.height;
        }
        if (i === 2) {
            border.x = _this.border.height * paste + wh + _this.wall.wh / 2;
            border.y = -_this.border.height * paste + _this.border.width / 2 - _this.border.height;
        }
        if (i === 3) {
            border.x = -_this.border.height * paste + _this.border.width / 2 - _this.border.height;
            border.y = _this.border.height * paste + wh + _this.wall.wh / 2;
        }
        
        for (let ii = 0, nn = _this.border.num; ii < nn; ii++) {
            const b = new PIXI.Sprite.from(_this.img.border);
            b.width = _this.border.width;
            b.height = _this.border.height;
            if (i === 0) {
                b.anchor.x = 0.5;
                b.anchor.y = 0.5;
                b.rotation = 3.1;
            }
            if (i === 1) {
                b.anchor.x = 0.5;
                b.anchor.y = 0.5;
                b.rotation = 1.5;
            }
            if (i === 2) {
                b.anchor.x = 0.5;
                b.anchor.y = 0.5;
                b.rotation = 4.7;
            }
            if (i === 3) {
                b.anchor.x = 0.5;
                b.anchor.y = 0.5;
                b.rotation = 0;
            }
            if (i === 0 || i === 3) {
                b.x = ii * _this.border.width;
                b.y = 0;
            }
            if (i === 1 || i === 2) {
                b.x = 0;
                b.y = ii * _this.border.width;
            }
            border.addChild(b);
        }
        
        _this.map.object.addChild(border);
    }
}

/**
 * 创建格子
 * @return {void}
 */
function createGrid() {
    const _this = this;
    
    for (let i = 0, n = Math.pow(_this.grid.row, 2); i < n; i++) {
        const grid = new PIXI.Container(),
            fill = PIXI.Sprite.from(_this.img.lawn);
        
        if (i !== 0 && i % 30 === 0) {
            _this.grid.x = 0;
            _this.grid.y += _this.grid.wh;
        }
        
        grid.wall = _this.map.wall[_this.map.matrix[i]];
        grid.x = _this.grid.x;
        grid.y = _this.grid.y;
        
        fill.width = _this.grid.wh;
        fill.height = _this.grid.wh;
        fill.x = 0;
        fill.y = 0;
        fill.interactive = true;
        fill.buttonMode = true;
        fill.on('pointertap', () => {
            console.log(i, grid.wall);
        });
        
        grid.addChild(fill);
        createWall.call(_this, i, grid);
        _this.grid.object.addChild(grid);
        
        _this.grid.x += _this.grid.wh;
    }
    
    _this.map.object.addChild(_this.grid.object);
}

/**
 * 创建墙壁
 * @param {number} index 格子位置
 * @param {object} grid 格子
 * @return {void}
 */
function createWall(index, grid) {
    const _this = this,
        wallGroup = new PIXI.Container(),
        wh = _this.wall.wh,
        n = _this.wall.num;
    
    if ((/top/i).test(grid.wall)) {
        const wall = new PIXI.Container();
        wall.x = 0;
        wall.y = -wh / 2;
        for (let i = 0; i < n; i++) {
            const grass = new PIXI.Sprite.from(_this.img.grass);
            grass.width = wh;
            grass.height = wh;
            grass.x = i * wh;
            grass.y = 0;
            wall.addChild(grass);
        }
        wallGroup.addChild(wall);
    }
    
    if ((/left/i).test(grid.wall)) {
        const wall = new PIXI.Container();
        wall.x = -wh / 2;
        wall.y = 0;
        for (let i = 0; i < n; i++) {
            const grass = new PIXI.Sprite.from(_this.img.grass);
            grass.width = wh;
            grass.height = wh;
            grass.x = 0;
            grass.y = i * wh;
            wall.addChild(grass);
        }
        wallGroup.addChild(wall);
    }
    
    if ((/right/i).test(grid.wall)) {
        const wall = new PIXI.Container();
        wall.x = _this.grid.wh - _this.wall.wh + wh / 2;
        wall.y = 0;
        for (let i = 0; i < n; i++) {
            const grass = new PIXI.Sprite.from(_this.img.grass);
            grass.width = wh;
            grass.height = wh;
            grass.x = 0;
            grass.y = i * wh;
            wall.addChild(grass);
        }
        wallGroup.addChild(wall);
    }
    
    if ((/bottom/i).test(grid.wall)) {
        const wall = new PIXI.Container();
        wall.x = 0;
        wall.y = _this.grid.wh - _this.wall.wh + wh / 2;
        for (let i = 0; i < n; i++) {
            const grass = new PIXI.Sprite.from(_this.img.grass);
            grass.width = wh;
            grass.height = wh;
            grass.x = i * wh;
            grass.y = 0;
            wall.addChild(grass);
        }
        wallGroup.addChild(wall);
    }
    
    if (index === _this.config.enter.grid) wallGroup.addChild(createDoor.call(_this, 'enter'));
    if (index === _this.config.out.grid) wallGroup.addChild(createDoor.call(_this, 'out'));
    
    grid.addChild(wallGroup);
}

/**
 * 创建出入口
 * @param {object} name 出入口
 * @return {object} 门
 */
function createDoor(name) {
    const _this = this,
        door = new PIXI.Container(),
        bg = new PIXI.Graphics(),
        children = door.children,
        wh = _this.wall.wh;
    
    bg.lineStyle(0);
    bg.beginFill(_this.wall.color, 1);
    bg.drawRect(0, 0, _this.grid.wh, wh * 2);
    bg.endFill();
    door.addChild(bg);
    
    if (name === 'enter') door.name = '入口';
    if (name === 'out') door.name = '出口';
    
    for (let i = 0; i < 4; i++) {
        const grass = new PIXI.Sprite.from(_this.img.grass);
        grass.width = wh;
        grass.height = wh;
        door.addChild(grass);
    }
    
    if (_this.config[name].door === 'top') {
        door.x = 0;
        door.y = -wh;
        children[0].x = 0;
        children[0].y = -children[0].height / 2;
        children[1].x = -wh / 2;
        children[1].y = 0;
        children[2].x = 2 * wh + wh / 2;
        children[2].y = 0;
        children[3].x = -wh / 2;
        children[3].y = -wh;
        children[4].x = 2 * wh + wh / 2;
        children[4].y = -wh;
    }
    
    if (_this.config[name].door === 'bottom') {
        door.x = 0;
        door.y = _this.grid.wh - _this.wall.wh + wh;
        children[0].x = 0;
        children[0].y = 0;
        children[1].x = -wh / 2;
        children[1].y = 0;
        children[2].x = 2 * wh + wh / 2;
        children[2].y = 0;
        children[3].x = -wh / 2;
        children[3].y = wh;
        children[4].x = 2 * wh + wh / 2;
        children[4].y = wh;
    }
    
    return door;
}

export default Maze;
