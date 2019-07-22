/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 方向键
 */
const ArrowKey = new PIXI.Container(),
    Panel = {
        origin: 100,
        radius: 65,
        alpha: 0.3,
        color: 0xCCCCCC,
        object: new PIXI.Graphics()
    },
    Rocker = {
        origin: 100,
        position: {
            x: 0,
            y: 0
        },
        radius: 30,
        alpha: 0.3,
        color: 0xCCCCCC,
        flag: false,
        object: new PIXI.Graphics()
    },
    Arrow = {
        width: 60,
        height: 30,
        position: '',
        alpha: 0.3,
        color: 0xCCCCCC,
        object: {
            top: new PIXI.Graphics(),
            left: new PIXI.Graphics(),
            right: new PIXI.Graphics(),
            bottom: new PIXI.Graphics()
        }
    };

Panel.object.lineStyle(0);
Panel.object.beginFill(Panel.color, Panel.alpha);
Panel.object.drawCircle(Panel.origin, Panel.origin, Panel.radius);
Panel.object.endFill();

Rocker.object.lineStyle(0);
Rocker.object.beginFill(Rocker.color, Rocker.alpha);
Rocker.object.drawCircle(Rocker.origin, Rocker.origin, Rocker.radius);
Rocker.object.endFill();
Rocker.object.alpha = 0;
Rocker.object.interactive = true;
Rocker.object.buttonMode = true;
Rocker.object
    .on('pointerdown', rockerDragStart)
    .on('pointermove', rockerDragMove)
    .on('pointerup', rockerDragEnd)
    .on('pointerupoutside', rockerDragEnd);

for (const key in Arrow.object) {
    Arrow.object[key].beginFill(Arrow.color, Arrow.alpha);
    Arrow.object[key].lineStyle(0);
    
    if (key === 'top') {
        Arrow.object[key].moveTo(100, 0);
        Arrow.object[key].lineTo(70, 30);
        Arrow.object[key].lineTo(100, 20);
        Arrow.object[key].lineTo(130, 30);
        Arrow.object[key].lineTo(100, 0);
    } else if (key === 'left') {
        Arrow.object[key].moveTo(0, 100);
        Arrow.object[key].lineTo(30, 70);
        Arrow.object[key].lineTo(20, 100);
        Arrow.object[key].lineTo(30, 130);
        Arrow.object[key].lineTo(0, 100);
    } else if (key === 'right') {
        Arrow.object[key].moveTo(200, 100);
        Arrow.object[key].lineTo(170, 70);
        Arrow.object[key].lineTo(180, 100);
        Arrow.object[key].lineTo(170, 130);
        Arrow.object[key].lineTo(200, 100);
    } else if (key === 'bottom') {
        Arrow.object[key].moveTo(100, 200);
        Arrow.object[key].lineTo(70, 170);
        Arrow.object[key].lineTo(100, 180);
        Arrow.object[key].lineTo(130, 170);
        Arrow.object[key].lineTo(100, 200);
    }
    
    Arrow.object[key].closePath();
    Arrow.object[key].endFill();
    Arrow.object[key].alpha = 0;
    ArrowKey.addChild(Arrow.object[key]);
}

ArrowKey.addChild(Panel.object);
ArrowKey.addChild(Rocker.object);

export default ArrowKey;

/**
 * 摇杆拖动开始
 * @param {object} e 焦点对象
 * @return {void}
 */
function rockerDragStart(e) {
    if (!Rocker) return;
    
    Rocker.flag = true;
    Rocker.position = e.data.getLocalPosition(ArrowKey);
    Rocker.object.alpha = 1;
}

/**
 * 摇杆拖动移动
 * @param {object} e 焦点对象
 * @return {void}
 */
function rockerDragMove(e) {
    if (!Rocker || !Rocker.flag) return;
    
    const position = e.data.getLocalPosition(ArrowKey),
        limit = Panel.radius - 10;
    
    let x = position.x - Rocker.position.x,
        y = position.y - Rocker.position.y;
    
    if (x < -limit) x = -limit;
    if (x > limit) x = limit;
    if (y < -limit) y = -limit;
    if (y > limit) y = limit;
    
    Rocker.object.x = x;
    Rocker.object.y = y;
    
    fixDirection(x, y);
}

/**
 * 摇杆拖动结束
 * @param {object} e 焦点对象
 * @return {void}
 */
function rockerDragEnd(e) {
    if (!Rocker) return;
    
    Rocker.flag = true;
    Rocker.position = {
        x: 0,
        y: 0
    };
    Rocker.object.x = 0;
    Rocker.object.y = 0;
    Rocker.object.alpha = 0;
    
    moveStop();
}

/**
 * 判断方向
 * @param {number} x X
 * @param {number} y Y
 * @return {void}
 */
function fixDirection(x, y) {
    if (y < -Panel.radius / 2 &&
        Math.abs(x) < Panel.radius &&
        Math.abs(y) > Math.abs(x)) {
        moveTop();
    } else if (y > Panel.radius / 2 &&
        Math.abs(x) < Panel.radius &&
        Math.abs(y) > Math.abs(x)) {
        moveBottom();
    } else if (x < -Panel.radius / 2 &&
        Math.abs(y) < Panel.radius &&
        Math.abs(x) > Math.abs(y)) {
        moveLeft();
    } else if (x > Panel.radius / 2 &&
        Math.abs(y) < Panel.radius &&
        Math.abs(x) > Math.abs(y)) {
        moveRight();
    } else {
        moveStop();
    }
}

/**
 * 没有移动
 * @return {void}
 */
function moveStop() {
    Arrow.object.top.alpha = 0;
    Arrow.object.left.alpha = 0;
    Arrow.object.right.alpha = 0;
    Arrow.object.bottom.alpha = 0;
}

/**
 * 向上移动
 * @return {void}
 */
function moveTop() {
    Arrow.object.top.alpha = 1;
    Arrow.object.left.alpha = 0;
    Arrow.object.right.alpha = 0;
    Arrow.object.bottom.alpha = 0;
}

/**
 * 向左移动
 * @return {void}
 */
function moveLeft() {
    Arrow.object.top.alpha = 0;
    Arrow.object.left.alpha = 1;
    Arrow.object.right.alpha = 0;
    Arrow.object.bottom.alpha = 0;
}

/**
 * 向右移动
 * @return {void}
 */
function moveRight() {
    Arrow.object.top.alpha = 0;
    Arrow.object.left.alpha = 0;
    Arrow.object.right.alpha = 1;
    Arrow.object.bottom.alpha = 0;
}

/**
 * 向下移动
 * @return {void}
 */
function moveBottom() {
    Arrow.object.top.alpha = 0;
    Arrow.object.left.alpha = 0;
    Arrow.object.right.alpha = 0;
    Arrow.object.bottom.alpha = 1;
}
