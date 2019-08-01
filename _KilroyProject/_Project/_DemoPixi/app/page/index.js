/**
 * Public
 */
import { w, Base, Preload } from '../../../_Base/js/window';

/**
 * Controller
 */
import App from '../controller/app';
import Application from '../controller/application';

/**
 * Object
 */
import Wave from '../object/wave';
import Ability from '../object/ability';

/**
 * Main
 */
(function () {
    /**
     * Wave
     */
    const app = new App('appWave'),
        appWave = Application.create('canvasWave', {
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
    
    Preload.process([img], {
        loading_callback: (index, num, progress) => {
            // console.log(index, num, progress + '%');
        },
        finish_callback: () => {
            // console.log('完成');
            const wave = new Wave({
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
            
            w.wave = wave;
        }
    });
})();

(function () {
    /**
     * Ability
     */
    const app = new App('appAbility'),
        appAbility = Application.create('canvasAbility', {
            app: app,
            width: app.clientWidth,
            height: app.clientHeight,
            transparent: true,
            autoDensity: true,
            antialias: true,
            preserveDrawingBuffer: true,
            backgroundColor: 0x000000,
            clearBeforeRender: true
        });
    
    const ability = new Ability({
        wh: app.clientWidth
    });
    
    appAbility.stage.addChild(ability.object);
    
    appAbility.start();
    
    appAbility.ticker.add(() => {
        ability.update();
    });
})();
