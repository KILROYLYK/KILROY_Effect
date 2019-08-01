/**
 * Controller
 */
import Application from '../controller/application';

/**
 * Object
 */
import App from '../controller/app';
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
const app = new App(),
    keyboardWH = app.clientWidth,
    appKeyboard = Application.create('canvasKeyboard', {
        app: app,
        width: keyboardWH,
        height: keyboardWH,
        transparent: true,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true
    }),
    arrowKey = new ArrowKey({
        wh: keyboardWH,
        topCallback: () => {
            move('top');
        },
        leftCallback: () => {
            move('left');
        },
        rightCallback: () => {
            move('right');
        },
        bottomCallback: () => {
            move('bottom');
        }
    });

appKeyboard.stage.addChild(arrowKey.object);

appKeyboard.start();

/**
 * 移动
 * @param {string} direction 方向
 * @return {void}
 */
function move(direction) {
    if (direction === 'top') {
        console.log('top');
    }
    
    if (direction === 'left') {
        console.log('left');
    }
    
    if (direction === 'right') {
        console.log('right');
    }
    
    if (direction === 'bottom') {
        console.log('bottom');
    }
}
