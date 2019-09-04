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
     * 元素对象转点描述
     * @param {object} obj 面对象
     * @return {array} 点数组
     */
    conversionPointArray(obj) {
        const _this = this;
        
        return [
            {
                x: obj.x,
                y: obj.y
            },
            {
                x: obj.x + obj.width,
                y: obj.y
            },
            {
                x: obj.x + obj.width,
                y: obj.y + obj.height
            },
            {
                x: obj.x,
                y: obj.y + obj.height
            }
        ];
    }
    
    /**
     * 防止撞墙
     * @param {object} speed 速度
     * @param {array} plyA 面
     * @param {array} plyB 面
     * @return {object} 优化后速度
     */
    preventAgainstWall(speed, plyA, plyB) {
        const _this = this,
            speedOld = {
                x: speed.x,
                y: speed.y
            },
            plyANew = [];
        
        if (speed.y < 0 && plyA[0].y === plyB[2].y && plyA[2].y > plyB[2].y) speed.y = 0;
        if (speed.x < 0 && plyA[0].x === plyB[1].x && plyA[1].x > plyB[1].x) speed.x = 0;
        if (speed.x > 0 && plyA[1].x === plyB[0].x && plyA[0].x < plyB[0].x) speed.x = 0;
        if (speed.y > 0 && plyA[2].y === plyB[0].y && plyA[0].y < plyB[0].y) speed.y = 0;
        
        for (let i = 0, n = plyA.length; i < n; i++) {
            plyANew.push(plyA[i]);
            plyA[i].x += speed.x;
            plyA[i].y += speed.y;
        }
        
        if (!_this.isPolygonsOverlap(plyA, plyB)) return speed;
        
        if (speed.y < 0 && plyA[0].y < plyB[2].y && plyA[2].y > plyB[2].y) {
            speed.direction = 'top';
            speed.y = plyB[2].y - plyANew[0].y;
            console.log('top', speed.y);
        }
        
        if (speed.x < 0 && plyA[0].x < plyB[1].x && plyA[1].x > plyB[1].x) {
            speed.direction = 'left';
            speed.x = plyB[1].x - plyANew[0].x;
            console.log('left', speed.x);
        }
        
        if (speed.x > 0 && plyA[1].x > plyB[0].x && plyA[0].x < plyB[0].x) {
            speed.direction = 'right';
            speed.x = plyB[0].x - plyANew[1].x;
            console.log('right', speed.x);
        }
        
        if (speed.y > 0 && plyA[2].y > plyB[0].y && plyA[0].y < plyB[0].y) {
            speed.direction = 'bottom';
            speed.y = plyB[0].y - plyANew[2].y;
            console.log('bottom', speed.y);
        }
        
        return speed;
    }
    
    /**
     * 判断两多边形线段是否相交
     * @param {array} segA 线段
     * @param {array} segB 线段
     * @return {boolean} 是否相交
     */
    isSegmentsIntersectant(segA, segB) {
        const _this = this,
            abc = (segA[0].x - segB[0].x) * (segA[1].y - segB[0].y) - (segA[0].y - segB[0].y) * (segA[1].x - segB[0].x),
            abd = (segA[0].x - segB[1].x) * (segA[1].y - segB[1].y) - (segA[0].y - segB[1].y) * (segA[1].x - segB[1].x);
        
        if (abc * abd >= 0) {
            return false;
        }
        
        const cda = (segB[0].x - segA[0].x) * (segB[1].y - segA[0].y) - (segB[0].y - segA[0].y) * (segB[1].x - segA[0].x),
            cdb = cda + abc - abd;
        
        return !(cda * cdb >= 0);
    }
    
    /**
     * 判断两多边形边界是否相交
     * @param {array} plyA 面
     * @param {array} plyB 面
     * @return {boolean} 是否相交
     */
    isPolygonsIntersectant(plyA, plyB) {
        const _this = this;
        
        for (let i = 0, il = plyA.length; i < il; i++) {
            for (let j = 0, jl = plyB.length; j < jl; j++) {
                const segA = [plyA[i], plyA[i === il - 1 ? 0 : i + 1]];
                const segB = [plyB[j], plyB[j === jl - 1 ? 0 : j + 1]];
                if (_this.isSegmentsIntersectant(segA, segB)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
     * 判断点是否在另一平面图中
     * @param {object} point 点
     * @param {array} polygon 面
     * @return {boolean} 是否重叠
     */
    isPointInPolygon(point, polygon) {
        const _this = this,
            N = polygon.length,
            boundOrVertex = true,
            precision = 2e-10,
            p = point;
        
        let intersectCount = 0,
            p1 = polygon[0],
            p2 = {};
        
        for (let i = 1; i <= N; ++i) {
            if (p.x === p1.x && p.y === p1.y) {
                return boundOrVertex;
            }
            
            p2 = polygon[i % N];
            if (p.y < Math.min(p1.y, p2.y) || p.y > Math.max(p1.y, p2.y)) {
                p1 = p2;
                continue;
            }
            
            if (p.y > Math.min(p1.y, p2.y) && p.y < Math.max(p1.y, p2.y)) {
                if (p.x <= Math.max(p1.x, p2.x)) {
                    if (p1.y === p2.y && p.x >= Math.min(p1.x, p2.x)) {
                        return boundOrVertex;
                    }
                    
                    if (p1.x === p2.x) {
                        if (p1.x === p.x) {
                            return boundOrVertex;
                        } else {
                            ++intersectCount;
                        }
                    } else {
                        const xinters = (p.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
                        if (Math.abs(p.x - xinters) < precision) {
                            return boundOrVertex;
                        }
                        
                        if (p.x < xinters) {
                            ++intersectCount;
                        }
                    }
                }
            } else {
                if (p.y === p2.y && p.x <= p2.x) {
                    const p3 = polygon[(i + 1) % N];
                    if (p.y >= Math.min(p1.y, p3.y) && p.y <= Math.max(p1.y, p3.y)) {
                        ++intersectCount;
                    } else {
                        intersectCount += 2;
                    }
                }
            }
            p1 = p2;
        }
        
        if (intersectCount % 2 === 0) {
            return false;
        } else { //奇数在多边形内
            return true;
        }
    }
    
    /**
     * 判断两多变形是否存在点与区域的包含关系
     * @param {array} plyA 面
     * @param {array} plyB 面
     * @return {boolean} 是否相交
     */
    isPointInPolygonBidirectional(plyA, plyB) {
        const _this = this;
        
        let [a, b] = [false, false];
        a = plyA.some((item) => {
            return _this.isPointInPolygon(item, plyB);
        });
        if (!a) {
            b = plyB.some((item) => {
                return _this.isPointInPolygon(item, plyA);
            });
        }
        return a || b;
    }
    
    /**
     * 判断多边形是否重叠
     * @param {array} plyA 面
     * @param {array} plyB 面
     * @return {boolean} 是否相交
     */
    isPolygonsOverlap(plyA, plyB) {
        const _this = this;
        
        return _this.isPolygonsIntersectant(plyA, plyB) || _this.isPointInPolygonBidirectional(plyA, plyB);
    }
}

export default new Collision();
