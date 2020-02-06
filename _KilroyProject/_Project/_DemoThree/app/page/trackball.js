/**
 * Public
 */
import { W, D } from '../../../_Base/javascript/window';

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
import Light from '../object/light';
import Ground from '../object/ground';

/**
 * Main
 */
const app = D.getElementById('app'),
    scene = new Scene({
        color: '#cccccc',
        opacity: 0.0005
    }),
    camera = new Camera(app, {
        z: 500
    }),
    renderer = new Renderer(app),
    update = new Update();

renderer.object.setPixelRatio(W.devicePixelRatio);

const lightList = [
    Light.ambient({
        color: '#ffffff'
    }),
    Light.directiona(),
    Light.directiona({
        color: '#002288',
        x: -1,
        y: -1,
        z: -1
    })
];


const groundList = [
    Ground.create({
        img: 'https://image.gaeamobile.net/image/20190718/130858/grassland.jpg'
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
scene.object.add(groundList[0]);

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
