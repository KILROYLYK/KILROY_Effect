/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 方向键
 */
const ArrowKey = new PIXI.Container(),
    Keyboard = {
        color: 0xCCCCCC,
        zIndex: 1,
        radius: 70,
        origin: 100,
        object: new PIXI.Graphics()
    },
    Key = {
        color: 0xCCCCCC,
        zIndex: 1,
        object: {
            top: new PIXI.Graphics(),
            left: new PIXI.Graphics(),
            right: new PIXI.Graphics(),
            bottom: new PIXI.Graphics()
        }
    };

Keyboard.object.lineStyle(0);
Keyboard.object.beginFill(Keyboard.color, Keyboard.zIndex);
Keyboard.object.drawCircle(Keyboard.origin, Keyboard.origin, Keyboard.radius);
Keyboard.object.endFill();

Key.object.top.beginFill(Key.color);
Key.object.top.lineStyle(0);
Key.object.top.moveTo(100, 0);
Key.object.top.lineTo(70, 30);
Key.object.top.lineTo(100, 20);
Key.object.top.lineTo(130, 30);
Key.object.top.lineTo(100, 0);
Key.object.top.closePath();
Key.object.top.endFill();

Key.object.bottom.beginFill(Key.color);
Key.object.bottom.lineStyle(0);
Key.object.bottom.moveTo(100, 200);
Key.object.bottom.lineTo(70, 170);
Key.object.bottom.lineTo(100, 180);
Key.object.bottom.lineTo(130, 170);
Key.object.bottom.lineTo(100, 200);
Key.object.bottom.closePath();
Key.object.bottom.endFill();

Keyboard.object.addChild(Key.object.top);
Keyboard.object.addChild(Key.object.left);
Keyboard.object.addChild(Key.object.right);
Keyboard.object.addChild(Key.object.bottom);

ArrowKey.addChild(Keyboard.object);

export default ArrowKey;
