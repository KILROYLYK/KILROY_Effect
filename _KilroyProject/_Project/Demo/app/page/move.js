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

/**
 * Main
 */
const app = d.getElementById('app'),
    scene = new Scene({
        color: '#69abff',
        opacity: 0.0015
    }),
    camera = new Camera(app, {
        fov: 45,
        z: 100
    }),
    renderer = new Renderer(app),
    update = new Update();

const lightList = [
    light.createLightAmbient({
        color: '#ffffff'
    })
];

scene.object.add(lightList[0]);

var loader = new THREE.TextureLoader();
var groundTexture = loader.load('https://image.gaeamobile.net/image/20190718/130858/grassland.jpg');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);
groundTexture.anisotropy = 16;
var groundMaterial = new THREE.MeshLambertMaterial({map: groundTexture});
var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
mesh.position.y = -250;
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.object.add(mesh);

const move = new Move(
    camera.object,
    {
        speedClick: 0.5
    }
);

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
