/**
 * Application
 */
import appMaze from '../application/maze';
import appKeyboard from '../application/keyboard';

/**
 * Object
 */
import Map from '../object/map';
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
appMaze.stage.addChild(Map);
appKeyboard.stage.addChild(ArrowKey);

appMaze.start();
appKeyboard.start();
