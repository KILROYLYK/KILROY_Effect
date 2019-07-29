/**
 * Public
 */
import { Base, Preload } from '../../../_Base/js/window';

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

Preload.process([imgWave + 'wave.jpg'],{
    loading_callback: (index, num, progress) => {
        // console.log(index, num, progress + '%');
    },
    finish_callback: () => {
        // console.log('完成');
        const wave = new Wave({
            url: imgWave + 'wave.jpg'
        });
    
        appWave.stage.addChild(wave.object);
        appWave.stage.filters = [wave.filter.ripple_1];
    
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
