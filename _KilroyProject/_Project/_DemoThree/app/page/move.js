/**
 * Public
 */
import { d } from '../../../_Base/js/window';

/**
 * Three
 */
const THREE = require('three');

/**
 * Controller
 */
import Move from '../controller/move';

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
import ground from '../object/ground';

/**
 * Main
 */
const app = d.getElementById('app'),
    scene = new Scene({
        color: '#69abff',
        opacity: 0.0007
    }),
    camera = new Camera(app, {
        fov: 45
    }),
    renderer = new Renderer(app),
    update = new Update();

const lightList = [
    light.ambient({
        color: '#ffffff'
    }),
    light.directiona({
        color: '#ffffff',
        x: 1,
        y: 1,
        z: 1
    })
];

const groundList = [
    ground.create({
        img: 'https://image.gaeamobile.net/image/20190718/130858/grassland.jpg'
    })
];

scene.object.add(lightList[0]);
scene.object.add(lightList[1]);
scene.object.add(groundList[0]);

const move = new Move(camera.object);

update.autoUpdate(() => {
    move.update();
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
