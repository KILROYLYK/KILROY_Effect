/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */
import { app, px } from '../controller/window';

/**
 * Environment
 */
import Application from '../environment/application';

/**
 * Object
 */
import Ground from '../object/ground';

/**
 * Main
 */

Application.stage.addChild(Ground);

Application.start();
