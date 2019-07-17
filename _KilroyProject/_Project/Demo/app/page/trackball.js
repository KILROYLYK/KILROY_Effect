/**
 * Public
 */
import { d } from '../../../_Base/js/window';

/**
 * Three
 */
import * as THREE from '../../../$Three/build/three.module.js';

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

const geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1);
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true
});

for (let i = 0; i < 500; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 1000;
    mesh.position.y = (Math.random() - 0.5) * 1000;
    mesh.position.z = (Math.random() - 0.5) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
}

scene.add(light.object.ambient);
scene.add(light.object.light1);
scene.add(light.object.light2);

const trackball = new Trackball(scene, camera, renderer);

renderer.render(scene, camera);

new Animate(() => {
    trackball.update();
});
