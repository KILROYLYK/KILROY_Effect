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
import Animate from '../environment/animate';

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
        opacity: 0.005
    }),
    camera = new Camera(app, {
        z: 500
    }),
    renderer = new Renderer(app);

renderer.setPixelRatio(w.devicePixelRatio);

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

scene.add(lightList[0]);
scene.add(lightList[1]);
scene.add(lightList[2]);

const trackball = new Trackball(scene, camera, renderer);

new Animate(() => {
    trackball.update();
});
