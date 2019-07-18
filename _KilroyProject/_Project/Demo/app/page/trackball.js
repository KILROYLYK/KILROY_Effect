/**
 * Public
 */
import { w, d } from '../../../_Base/js/window';

/**
 * Three
 */
const THREE = require('three');

/**
 * Controller
 */
import Trackball from '../controller/trackball';

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
    scene = new Scene({
        color: '#cccccc',
        opacity: 0.003
    }),
    camera = new Camera(app, {
        z: 500
    }),
    renderer = new Renderer(app),
    update = new Update();

renderer.object.setPixelRatio(w.devicePixelRatio);

const lightList = [
    light.createLightAmbient({
        color: '#ffffff'
    }),
    light.createLightDirectiona(),
    light.createLightDirectiona({
        color: '#002288',
        x: -1,
        y: -1,
        z: -1
    })
];

const geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1);
const material = new THREE.MeshPhongMaterial({
    color: '#ffffff',
    flatShading: true
});

for (let i = 0; i < 500; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 1000;
    mesh.position.y = (Math.random() - 0.5) * 1000;
    mesh.position.z = (Math.random() - 0.5) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.object.add(mesh);
}

scene.object.add(lightList[0]);
scene.object.add(lightList[1]);
scene.object.add(lightList[2]);

const trackball = new Trackball(
    scene.object,
    camera.object,
    renderer.object
);

update.autoUpdate(() => {
    trackball.update();
    renderer.object.render(
        scene.object,
        camera.object
    );
});

update.resizeUpdate(() => {
    trackball.resizeUpdate();
    camera.resizeUpdate();
    renderer.resizeUpdate();
    renderer.object.render(
        scene.object,
        camera.object
    );
});
