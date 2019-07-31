/**
 * Controller
 */
import Application from '../controller/application';

/**
 * Object
 */
import Ability from '../object/ability';

/**
 * Main
 */
const abilityWH = 530,
    appAbility = Application.create('appAbility', {
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

/**
 * 激活
 */
ability.showCapability([0, 2, 4, 6, 8, 10]);

