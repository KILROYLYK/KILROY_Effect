/**
 * Controller
 */
import { app } from '../controller/window';
import Application from '../controller/application';

/**
 * Object
 */
import Maze from '../object/maze';
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
const appWidth = app.clientWidth,
    appHeight = app.clientHeight,
    mazeMargin = 10,
    mazeWH = (appWidth >= appHeight ? appHeight : appWidth) - mazeMargin * 2,
    keyboardWH = 200,
    appGame = Application.create('appGame', {
        width: mazeWH,
        height: mazeWH,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0xFFFFFF,
        clearBeforeRender: true
    }),
    appKeyboard = Application.create('appKeyboard', {
        width: keyboardWH,
        height: keyboardWH,
        transparent: true,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true
    });

appGame.stage.addChild(Maze.object);
appKeyboard.stage.addChild(ArrowKey.object);

appGame.start();
appKeyboard.start();
