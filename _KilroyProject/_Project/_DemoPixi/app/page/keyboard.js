/**
 * Controller
 */
import Application from '../controller/application';

/**
 * Object
 */
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
const appKeyboard = Application.create('appKeyboard', {
    width: 200,
    height: 200,
    transparent: true,
    autoDensity: true,
    antialias: true,
    preserveDrawingBuffer: true,
    backgroundColor: 0x000000,
    clearBeforeRender: true
});

appKeyboard.stage.addChild(ArrowKey.object);

appKeyboard.start();

ArrowKey.config.callback.top = () => {
    move('top');
};

ArrowKey.config.callback.left = () => {
    move('left');
};

ArrowKey.config.callback.right = () => {
    move('right');
};

ArrowKey.config.callback.bottom = () => {
    move('bottom');
};

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
