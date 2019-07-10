/**
 * Public
 */
import { w, d, Three } from '../../../_Base/js/window';

//场景
const scene = new Three.Scene();

//相机
const camera = new Three.PerspectiveCamera(75, w.innerWidth / w.innerHeight, 0.1, 1000);

//渲染器
const renderer = new Three.WebGLRenderer();
renderer.setSize(w.innerWidth, w.innerHeight);
d.body.appendChild(renderer.domElement);

console.log('Three:', Three);
console.log('scene:', scene);
console.log('camera:', camera);
console.log('renderer:', renderer);

/**
 * 动画
 */
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();
