/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */
import { app, px } from '../controller/window';

/**
 * Application
 */
import appMaze from '../application/maze';

/**
 * Object
 */
import Map from '../object/map';

/**
 * Main
 */
appMaze.stage.addChild(Map);
appMaze.start();
