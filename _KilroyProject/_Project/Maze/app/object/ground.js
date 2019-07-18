/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */
import { app, px } from '../controller/window';

/**
 * 地面
 */
const margin = 10,
    width = app.clientWidth - margin * 2,
    height = app.clientWidth - margin * 2,
    x = margin,
    y = (app.clientHeight - app.clientWidth) / 2,
    Ground = new PIXI.Graphics();

Ground.beginFill(0xffffff, 0.75);
Ground.drawRoundedRect(x, y, width, height, 5);
Ground.endFill();

export default Ground;
