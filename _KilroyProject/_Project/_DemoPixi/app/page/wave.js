/**
 * Public
 */
import { Base } from '../../../_Base/js/window';

/**
 * Constant
 */
import { imgWave } from '../constant/img';

/**
 * Controller
 */
import { app } from '../controller/window';
import Application from '../controller/application';

/**
 * Object
 */
import Wave from '../object/wave';

/**
 * Main
 */
const appWave = Application.create('appWave', {
        transparent: true,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true,
        resizeTo: app
    }),
    flag = {
        resize: false
    };

const wave = new Wave({
    url: imgWave + 'wave.jpg'
});

appWave.stage.addChild(wave.object);
appWave.stage.filters = [
    wave.filter.ripple_1,
    wave.filter.ripple_2
];

appWave.ticker.add((delta) => {
    // console.log(delta);
    wave.update();
    if (flag.resize) {
        flag.resize = false;
        wave.resizeUpdate();
    }
});

Base.resizeWindow(() => {
    flag.resize = true;
});

appWave.start();
