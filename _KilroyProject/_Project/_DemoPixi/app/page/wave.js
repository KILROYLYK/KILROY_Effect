/**
 * Controller
 */
import Application from '../controller/application';

/**
 * Main
 */
const appWave = Application.create('appWave', {
    transparent: true,
    autoDensity: true,
    antialias: true,
    preserveDrawingBuffer: true,
    backgroundColor: 0x000000,
    clearBeforeRender: true
});

appWave.start();
