/**
 * Public
 */
import { Base, Preload } from '../../../_Base/js/window';

/**
 * Controller
 */
import App from '../controller/app';
import Application from '../controller/application';

/**
 * Object
 */
import Wave from '../object/wave';

/**
 * Main
 */
const app = new App('appWave'),
    waveWH = app.clientWidth,
    appWave = Application.create('appWaveCanvas', {
        app: app,
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
    },
    img = 'https://image.gaeamobile.net/image/20190729/194701/bg.jpg';

let wave = null;

Preload.process([img], {
    loading_callback: (index, num, progress) => {
        // console.log(index, num, progress + '%');
    },
    finish_callback: () => {
        // console.log('完成');
        wave = new Wave({
            app: app,
            imgUrl: img,
            imgWidth: 750,
            imgHeight: 1334
        });
        
        appWave.stage.addChild(wave.object);
        appWave.stage.filters = [wave.sprite.filter];
        
        appWave.ticker.add(() => {
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
    }
});

/**
 * 激活
 */
setTimeout(() => {
    if (wave) wave.move();
}, 1000);
