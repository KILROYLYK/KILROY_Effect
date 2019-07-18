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
import Update from '../environment/update';

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
    }),
    update = new Update();

const lightList = [
    light.createLightAmbient({
        color: '#ffffff'
    })
];

scene.object.add(lightList[0]);

const panoramic = new Panoramic(
    scene.object,
    camera.object
);

update.autoUpdate(() => {
    panoramic.update();
    renderer.object.render(
        scene.object,
        camera.object
    );
});

update.resizeUpdate(() => {
    camera.resizeUpdate();
    renderer.resizeUpdate();
    renderer.object.render(
        scene.object,
        camera.object
    );
});
