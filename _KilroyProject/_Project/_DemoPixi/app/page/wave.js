/**
 * Public
 */
import { w, Base, Preload } from '../../../_Base/js/window';

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
    },
    img = 'https://image.gaeamobile.net/image/20190729/194701/bg.jpg';

Preload.process([img], {
    loading_callback: (index, num, progress) => {
        // console.log(index, num, progress + '%');
    },
    finish_callback: () => {
        // console.log('完成');
        const wave = new Wave({
            url: img,
            width: 750,
            height: 1334
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
        
        w.wave = wave;
    }
});
