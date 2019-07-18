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
 * Main
 */
const app = d.getElementById('app'),
    scene = new Scene(),
    camera = new Camera(app, {
        fov: 70
    }),
    renderer = new Renderer(app, {
        type: 'CSS3D'
    }),
    update = new Update();

const panoramic = new Panoramic(
    scene.object,
    camera.object,
    {
        img: 'https://image.gaeamobile.net/image/20190717/181948/'
    }
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
