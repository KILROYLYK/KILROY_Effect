/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */
import { mazeWH } from '../controller/window';

/**
 * Constant
 */
import { way, matrix } from '../constant/maze';

/**
 * 迷宫
 */
class Maze {
    /**
     * 原型对象
     * @constructor Application
     */
    constructor() {
        const _this = this,
            maze = matrix[0];
        
        _this.config = {
            flag: true,
            // time: 3,
            // row: 10,
            time: 1,
            row: 30,
            enter: maze.enter,
            out: maze.out
        };
        
        _this.object = new PIXI.Container();
        
        _this.map = {
            color: 0xCCCCCC,
            alpha: 0.3,
            x: 0,
            y: 0,
            wh: mazeWH * _this.config.time,
            way: way,
            matrix: maze.map,
            object: new PIXI.Graphics()
        };
        
        _this.grid = {
            color: 0xCCCCCC,
            alpha: 0.3,
            x: 0,
            y: 0,
            wh: _this.map.wh / (_this.config.row * _this.config.time),
            row: _this.config.row * _this.config.time,
            object: new PIXI.Graphics()
        };
        
        _this.wall = {
            color: 0x000000,
            alpha: 0.8,
            wh: 1
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.createMap();
        _this.createGrid();
        
        // _this.object.x = _this.grid.wh * 4.5;
        // _this.object.y = _this.grid.wh * 5 - _this.map.wh;
    }
    
    /**
     * 创建地图
     * @return {void}
     */
    createMap() {
        const _this = this;
        
        _this.map.object.beginFill(_this.map.color, _this.map.alpha);
        _this.map.object.drawRect(_this.map.x, _this.map.y, _this.map.wh, _this.map.wh);
        _this.map.object.endFill();
        _this.object.addChild(_this.map.object);
    }
    
    /**
     * 创建格子
     * @return {void}
     */
    createGrid() {
        const _this = this;
        
        for (let i = 0, n = Math.pow(_this.grid.row, 2); i < n; i++) {
            const grid = new PIXI.Container(),
                fill = new PIXI.Graphics();
            
            grid.x = _this.grid.x;
            grid.y = _this.grid.y;
            grid.wall = _this.map.way[_this.map.matrix[i]];
            
            fill.beginFill(_this.grid.color, _this.grid.alpha);
            fill.drawRect(0, 0, _this.grid.wh, _this.grid.wh);
            fill.endFill();
            fill.interactive = true;
            fill.buttonMode = true;
            fill.on('pointertap', () => {
                console.log(i, grid.wall);
            });
            
            grid.addChild(fill);
            _this.createWall(grid);
            _this.grid.object.addChild(grid);
            
            _this.grid.x += _this.grid.wh;
            
            if (_this.grid.x > _this.map.wh - 1) {
                _this.grid.x = 0;
                _this.grid.y += _this.grid.wh;
            }
        }
        
        _this.map.object.addChild(_this.grid.object);
    }
    
    /**
     * 创建墙壁
     * @param {object} grid 格子
     * @return {void}
     */
    createWall(grid) {
        const _this = this;
        
        if ((/top/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(0, 0, _this.grid.wh, _this.wall.wh);
            wall.endFill();
            grid.addChild(wall);
        }
        
        if ((/left/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(0, 0, _this.wall.wh, _this.grid.wh);
            wall.endFill();
            grid.addChild(wall);
        }
        
        if ((/right/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(_this.grid.wh - _this.wall.wh, 0, _this.wall.wh, _this.grid.wh);
            wall.endFill();
            grid.addChild(wall);
        }
        
        if ((/bottom/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(0, _this.grid.wh - _this.wall.wh, _this.grid.wh, _this.wall.wh);
            wall.endFill();
            grid.addChild(wall);
        }
    }
}

export default new Maze();
