/**
 * Public
 */
import { d } from '../../../_Base/js/window';

/**
 * Style
 */
import '../src/css/index.less';

/**
 * Controller
 */
import Panoramic from '../controller/panoramic';

/**
 * Environment
 */
import Scene from '../environment/scene';
import Camera from '../environment/camera';
import Renderer from '../environment/renderer';
import Animate from '../environment/animate';

/**
 * Object
 */
import light from '../object/light';

/**
 * Main
 */
const app = d.getElementById('app'),
    scene = new Scene(),
    camera = new Camera(app),
    renderer = new Renderer(app);

scene.add(light[0]);

new Animate(() => {
    renderer.render(scene, camera);
});
