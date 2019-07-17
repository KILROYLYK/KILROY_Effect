/**
 * Public
 */
import { d } from '../../../_Base/js/window';

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
    camera = new Camera(app, {
        fov: 75
    }),
    renderer = new Renderer(app, {
        type: 'CSS3D'
    });

const lightList = [
    light.createLightAmbient({
        color: '#ffffff'
    })
];

scene.add(lightList[0]);

const panoramic = new Panoramic(scene, camera, renderer);

new Animate(() => {
    panoramic.update();
    renderer.render(scene, camera);
});
