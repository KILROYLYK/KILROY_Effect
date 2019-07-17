const THREE = require('three');
import { CSS3DRenderer, CSS3DObject } from '../../$Three/examples/jsm/renderers/CSS3DRenderer';

var camera, scene, renderer;

/* 相机聚焦点 */
var target = new THREE.Vector3();

/* lon:经度， lat:维度  经纬度是相机的聚焦点 */
var lon = 90, lat = 0;

/* 相机聚焦点，弧度制 */
var phi = 0, theta = 0;

/* 移动端输入的x,y */
var touchX, touchY;

/* 图片路径 */
var src = 'https://ithanmang.gitee.io/threejs/home/example/css3drenderer/images/siximg/par.front.jpg';

/* 因为图片加载比较慢可以先设置一个背景图 */
document.body.style.backgroundImage = 'url(' + src + ')';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundSize = window.innerWidth + 'px ' + window.innerHeight + 'px';

var img = new Image();
img.src = src;

/* 图片加载完之后调用 */
img.onload = function () {
    
    init(img.width, src);
    animate();
    
};

function init(width, imageSrc) {
    
    img = null;
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    
    scene = new THREE.Scene();
    
    /* 图片路径 */
    let src = 'https://ithanmang.gitee.io/threejs/home/example/css3drenderer/images/siximg/par.';
    
    /* 图片格式 */
    let format = '.jpg';
    
    /* 以下六个面 拼接成立方体 */
    var sides = [
        {
            url: src + 'left' + format,
            position: [-width / 2, 0, 0], /* 左 */
            rotation: [0, Math.PI / 2, 0]
        },
        {
            url: src + 'right' + format,
            position: [width / 2, 0, 0], /* 右 */
            rotation: [0, -Math.PI / 2, 0]
        },
        {
            url: src + 'top' + format,
            position: [0, width / 2, 0], /* 上 */
            rotation: [Math.PI / 2, 0, Math.PI]
        },
        {
            url: src + 'bottom' + format,
            position: [0, -width / 2, 0], /* 下 */
            rotation: [-Math.PI / 2, 0, Math.PI]
        },
        {
            url: src + 'back' + format,
            position: [0, 0, width / 2], /* 后 */
            rotation: [0, Math.PI, 0]
        },
        {
            url: src + 'front' + format,
            position: [0, 0, -width / 2], /* 前 */
            rotation: [0, 0, 0]
        }
    ];
    
    for (var i = 0; i < sides.length; i++) {
        
        var side = sides[i];
        
        var element = document.createElement('img');
        
        element.width = width + 6;
        element.src = side.url;
        
        var css3Loader = new CSS3DObject(element);
        css3Loader.position.fromArray(side.position);
        css3Loader.rotation.fromArray(side.rotation);
        
        scene.add(css3Loader);
        
    }
    
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('wheel', onDocumentMouseWheel, false);
    
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    
    window.addEventListener('resize', onWindowResize, false);
    
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}

function onDocumentMouseDown(event) {
    
    event.preventDefault();
    
    document.body.style.cursor = 'move';
    
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    
}

function onDocumentMouseMove(event) {
    
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    
    /* 拖动速度随相机视角的变动而变动 */
    var speed = camera.fov * 0.0015;
    
    /* 经纬度平移速度 */
    lon -= movementX * speed;
    lat += movementY * speed;
    
}

function onDocumentMouseUp(event) {
    
    event.preventDefault();
    
    document.body.style.cursor = 'auto';
    
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
    
}

function onDocumentMouseWheel(event) {
    
    /* 缩放速度 */
    var speed = 0.008;
    
    var fov = camera.fov + event.deltaY * speed;
    
    /* 角度缩放最值 */
    camera.fov = THREE.Math.clamp(fov, 45, 95);
    
    camera.updateProjectionMatrix();
    
}

function onDocumentTouchStart(event) {
    
    event.preventDefault();
    
    var touch = event.touches[0];
    
    touchX = touch.screenX;
    touchY = touch.screenY;
    
}

function onDocumentTouchMove(event) {
    
    event.preventDefault();
    
    var touch = event.touches[0];
    
    lon -= (touch.screenX - touchX) * 0.1;
    lat += (touch.screenY - touchY) * 0.1;
    
    touchX = touch.screenX;
    touchY = touch.screenY;
    
}

function animate() {
    
    requestAnimationFrame(animate);
    
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    
    target.x = Math.sin(phi) * Math.cos(theta);
    target.y = Math.cos(phi);
    target.z = Math.sin(phi) * Math.sin(theta);
    
    camera.lookAt(target);
    
    renderer.render(scene, camera);
    
}
