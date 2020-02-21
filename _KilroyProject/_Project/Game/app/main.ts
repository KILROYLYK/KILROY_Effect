/**
 * Style
 */
import '../../_Base/css/common.less'
import '../src/css/main.less';

/**
 * Window
 */
import { W, D } from '../../_Base/javascript/window';

/**
 * Environment
 */
import Scene from './environment/Scene';
import Camera from './environment/Camera';
import Renderer from './environment/Renderer';

/**
 * Main
 */
const app = D.getElementById('app'),
    scene = new Scene({
        color: '#69abff',
        opacity: 0.0007
    }),
    camera = new Camera(app, {
        fov: 45
    }),
    renderer = new Renderer(app);

console.log(scene.instance);
