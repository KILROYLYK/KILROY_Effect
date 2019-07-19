/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Constant
 */
import { mazeWay, mazeList } from '../constant/maze';

/**
 * Controller
 */
import { WH } from '../controller/window';

/**
 * 地图
 */
const mapColor = 0xFFFFFF,
    borderWidth = 2,
    borderColor = 0x000000,
    grid = 6,
    wh = WH / grid,
    maze = mazeList[0],
    MapList = [];

let x = 0,
    y = 0;

for (let i = 0, n = grid * grid; i < n; i++) {
    MapList[i] = new PIXI.Graphics();
    MapList[i].border = mazeWay[maze[i]];
    MapList[i].beginFill(mapColor, 1);
    MapList[i].drawRect(x, y, wh, wh);
    MapList[i].endFill();
    
    if ((/top/i).test(mazeWay[maze[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(borderColor, 1);
        border.drawRect(x, y, wh, borderWidth);
        border.endFill();
        MapList[i].addChild(border);
    }
    
    if ((/left/i).test(mazeWay[maze[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(borderColor, 1);
        border.drawRect(x, y, borderWidth, wh);
        border.endFill();
        MapList[i].addChild(border);
    }
    
    if ((/right/i).test(mazeWay[maze[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(borderColor, 1);
        border.drawRect(x - borderWidth, y, borderWidth, wh);
        border.endFill();
        MapList[i].addChild(border);
    }
    
    if ((/bottom/i).test(mazeWay[maze[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(borderColor, 1);
        border.drawRect(x, y - borderWidth, wh, borderWidth);
        border.endFill();
    }
    
    x += wh;
    if (x > WH - 1) {
        x = 0;
        y += wh;
    }
}

export default MapList;
