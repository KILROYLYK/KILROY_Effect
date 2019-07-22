/**
 * Controller
 */
import { app } from '../controller/window';
import Application from '../controller/application';

/**
 * Object
 */
import Map from '../object/map';
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
const appWidth = app.clientWidth,
    appHeight = app.clientHeight,
    mazeMargin = 10,
    mazeWH = (appWidth >= appHeight ? appHeight : appWidth) - mazeMargin * 2,
    keyboardWH = 200,
    appMaze = Application.create('appMaze', {
        width: mazeWH,
        height: mazeWH,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0xCCCCCC,
        clearBeforeRender: true
    }),
    appKeyboard = Application.create('appKeyboard', {
        width: keyboardWH,
        height: keyboardWH,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0xFFFFFF,
        clearBeforeRender: true
    });

appMaze.stage.addChild(Map);
appKeyboard.stage.addChild(ArrowKey);

appMaze.start();
appKeyboard.start();
