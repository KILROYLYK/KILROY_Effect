/**
 * Public
 */
import { w, d, Base, Preload } from '../../../_Base/js/window';

/**
 * Controller
 */
import { app } from '../controller/window';
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
    const appWave = Application.create('appWave', {
            app: d.getElementById('app1'),
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
})();

(function () {
    /**
     * Ability
     */
    const abilityWH = 530,
        appAbility = Application.create('appAbility', {
            app: d.getElementById('app2'),
            width: abilityWH,
            height: abilityWH,
            transparent: true,
            autoDensity: true,
            antialias: true,
            preserveDrawingBuffer: true,
            backgroundColor: 0x000000,
            clearBeforeRender: true
        });
    
    const ability = new Ability({
        wh: abilityWH
    });
    
    appAbility.stage.addChild(ability.object);
    
    appAbility.start();
    
    appAbility.ticker.add(() => {
        ability.update();
    });
})();
