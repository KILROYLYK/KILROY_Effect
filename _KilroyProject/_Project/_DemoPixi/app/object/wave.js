/**
 * Constant
 */
import { app } from '../controller/window';
import { imgFilter } from '../constant/img';

/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 波浪
 */
class Wave {
    /**
     * 原型对象
     * @constructor Wave
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            speed: config.speed || 1,
            img: {
                url: config.url || '',
                ripple_1: imgFilter.PC + 'ripple_1.jpg',
                ripple_2: imgFilter.PC + 'ripple_2.jpg'
            }
        };
        
        _this.img = {
            width: 3840,
            height: 2160,
            object: PIXI.Sprite.from(_this.config.img.url)
        };
        
        _this.sprite = {
            wh: 2048,
            flag: false,
            speed: 5,
            size: 0,
            scale: 30,
            time: 2000,
            filter: null,
            object: PIXI.Sprite.from(_this.config.img.ripple_2)
        };
        
        _this.object = new PIXI.Container();
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.object.x = 0;
        _this.object.y = 0;
        
        _this.createImg();
        _this.createRipple();
        _this.resizeUpdate();
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
        
        _this.waveMove();
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
        
        _this.setImgPosition();
    }
    
    /**
     * 创建波纹1
     * @return {void}
     */
    createImg() {
        const _this = this;
        
        _this.object.addChild(_this.img.object);
    }
    
    /**
     * 创建波纹1
     * @return {void}
     */
    createRipple() {
        const _this = this;
        
        _this.sprite.filter = new PIXI.filters.DisplacementFilter(_this.sprite.object);
        _this.sprite.filter.scale.x = 0;
        _this.sprite.filter.scale.y = 0;
        _this.object.addChild(_this.sprite.object);
    }
    
    /**
     * 初始化图片位置
     * @return {void}
     */
    setImgPosition() {
        const _this = this;
        
        _this.imgCover(_this.img.object, _this.img.width, _this.img.height);
        _this.imgCover(_this.sprite.object, _this.sprite.wh, _this.sprite.wh);
    }
    
    /**
     * 图片平铺
     * @param {object} img 图片精灵
     * @param {number} imgWidth 图片宽
     * @param {number} imgHeight 图片高
     * @return {void}
     */
    imgCover(img, imgWidth, imgHeight) {
        const _this = this,
            appWidth = app.clientWidth,
            appHeight = app.clientHeight,
            appRatio = appWidth / appHeight,
            imgRatio = imgWidth / imgHeight;
        
        let x = 0,
            y = 0,
            width = 0,
            height = 0;
        
        if (appRatio >= imgRatio) {
            width = appWidth;
            height = width / imgRatio;
            x = 0;
            y = -(height - appHeight) / 2;
        } else if (appRatio < imgRatio) {
            height = appHeight;
            width = height * imgRatio;
            y = 0;
            x = -(width - appWidth) / 2;
        }
        
        img.x = x;
        img.y = y;
        img.width = width;
        img.height = height;
    }
    
    /**
     * 开启波浪动画
     * @return {void}
     */
    move() {
        const _this = this;
        
        _this.sprite.flag = true;
        _this.sprite.size = 0;
        _this.imgCover(_this.sprite.object, _this.sprite.wh, _this.sprite.wh);
        _this.sprite.filter.scale.x = _this.sprite.scale;
        _this.sprite.filter.scale.y = _this.sprite.scale;
    }
    
    /**
     * 波浪循环放大
     * @return {void}
     */
    waveMove() {
        const _this = this;
        
        if (_this.sprite.flag) {
            _this.sprite.size += 1;
            _this.sprite.object.width += 2 * _this.sprite.speed;
            _this.sprite.object.height += 2 * _this.sprite.speed;
            _this.sprite.object.x -= _this.sprite.speed;
            _this.sprite.object.y -= _this.sprite.speed;
            if (_this.sprite.size >= _this.sprite.time) {
                _this.sprite.flag = false;
                _this.move();
            }
        }
    }
}

export default Wave;
