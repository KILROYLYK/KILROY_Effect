/**
 * 碰撞
 */
class Collision {
    /**
     * 原型对象
     * @constructor Collision
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {};
        
        _this.speed = {
            x: 0,
            y: 0
        };
        
        _this.object = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
    }
    
    /**
     * 检测碰撞
     * @param {object} obj1 对象1
     * @param {object} obj2 对象2
     * @return {boolean} 是否重叠
     */
    detection(obj1, obj2) {
        const _this = this,
            a = [
                {
                    x: obj1.x,
                    y: obj1.y
                },
                {
                    x: obj1.x,
                    y: obj1.y + obj1.h
                },
                {
                    x: obj1.x + obj1.w,
                    y: obj1.y
                },
                {
                    x: obj1.x + obj1.w,
                    y: obj1.y + obj1.h
                }
            ],
            b = [
                {
                    x: obj2.x,
                    y: obj2.y
                },
                {
                    x: obj2.x,
                    y: obj2.y + obj2.h
                },
                {
                    x: obj2.x + obj2.w,
                    y: obj2.y
                },
                {
                    x: obj2.x + obj2.w,
                    y: obj2.y + obj2.h
                }
            ];
        
        for (let i = 0, il = a.length; i < il; i++) {
            const segA = [a[i], a[i === il - 1 ? 0 : i + 1]];
            for (let j = 0, jl = b.length; j < jl; j++) {
                const segB = [b[j], b[j === jl - 1 ? 0 : j + 1]];
                if (isOverlap(segA, segB)) return true;
            }
        }
        return false;
    }
    
    /**
     * 检测运动碰撞
     * @param {object} speed 速度对象
     * @param {object} obj1 对象1
     * @param {object} obj2 对象2
     * @return {object} 碰上的速度
     */
    detectionRun(speed, obj1, obj2) {
        const _this = this;
        
        obj1.x += speed.x;
        obj1.y += speed.y;
        
        if (!_this.detection(obj1, obj2)) return speed;
        
        if (speed.x > 0 && obj1.x + obj1.w >= obj2.x) {
            speed.x -= obj1.x + obj1.w - obj2.x;
            if (speed.x < 0) speed.x = 0;
        } else if (speed.x < 0 && obj1.x <= obj2.x + obj2.w) {
            speed.x += obj2.x + obj2.w - obj1.x;
            if (speed.x > 0) speed.x = 0;
        }
        
        if (speed.y > 0 && obj1.y + obj1.h >= obj2.y) {
            speed.y -= obj1.y + obj1.h - obj2.y;
            if (speed.y < 0) speed.y = 0;
        } else if (speed.y < 0 && obj1.y <= obj2.y + obj2.h) {
            speed.y += obj2.y + obj2.h - obj1.y;
            if (speed.y > 0) speed.y = 0;
        }
        
        console.log(speed);
        
        return speed;
    }
}

/**
 * 检测重叠
 * @param {object} segA 物体A
 * @param {object} segB 物体B
 * @return {boolean} 是否重叠
 */
function isOverlap(segA, segB) {
    const a = (segA[0].x - segB[0].x) *
        (segA[1].y - segB[0].y) -
        (segA[0].y - segB[0].y) *
        (segA[1].x - segB[0].x),
        b = (segA[0].x - segB[1].x) *
            (segA[1].y - segB[1].y) -
            (segA[0].y - segB[1].y) *
            (segA[1].x - segB[1].x);
    
    if (a * b >= 0) return false;
    
    const c = (segB[0].x - segA[0].x) *
        (segB[1].y - segA[0].y) -
        (segB[0].y - segA[0].y) *
        (segB[1].x - segA[0].x),
        d = c + a - b;
    
    return !(c * d >= 0);
}

export default Collision;
