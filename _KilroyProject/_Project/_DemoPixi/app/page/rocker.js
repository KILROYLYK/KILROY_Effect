/**
 * Controller
 */
import Application from '../controller/application';

/**
 * Object
 */
import App from '../controller/app';

/**
 * Module
 */
import Preload from '../module/pre';
import Rocker from '../module/rocker';

/**
 * Main
 */
const app = new App('appRocker'),
    rockerWH = app.clientWidth,
    appRocker = Application.create('appRockerCanvas', {
        app: app,
        width: rockerWH,
        height: rockerWH,
        transparent: true,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true
    });

let rocker = null;

const preload = new Preload({
    loadingCallback(progress) {
    },
    finishCallback(resources) {
        rocker = new Rocker({
            wh: rockerWH,
            resources: resources,
            direction: 8,
            callback: (direction) => {
                move(direction);
            }
        });
    
        appRocker.stage.addChild(rocker.object);
    
        appRocker.start();
    
        appRocker.ticker.add(() => {
            if (rocker) rocker.move();
        });
    }
});

/**
 * 移动
 * @param {string} direction 方向
 * @return {void}
 */
function move(direction) {
    console.log(direction);
}
