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
            flag: {
                r_1: true,
                r_2: false
            },
            speed: {
                r_1: 2,
                r_2: 2
            },
            size: {
                r_1: 0,
                r_2: 0
            },
            ripple_1: PIXI.Sprite.from(_this.config.img.ripple_2),
            ripple_2: PIXI.Sprite.from(_this.config.img.ripple_2)
        };
        
        _this.filter = {
            ripple_1: null,
            ripple_2: null
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
        _this.createRipple1();
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
    createRipple1() {
        const _this = this;
        
        _this.filter.ripple_1 = new PIXI.filters.DisplacementFilter(_this.sprite.ripple_1);
        _this.filter.ripple_1.scale.x = 20;
        _this.filter.ripple_1.scale.y = 20;
        _this.object.addChild(_this.sprite.ripple_1);
    }
    
    /**
     * 初始化图片位置
     * @return {void}
     */
    setImgPosition() {
        const _this = this;
        
        _this.imgCover(_this.img.object, _this.img.width, _this.img.height);
        _this.imgCover(_this.sprite.ripple_1, _this.sprite.wh, _this.sprite.wh);
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
     * 波浪循环放大
     * @return {void}
     */
    waveMove() {
        const _this = this;
        
        if (_this.sprite.flag.r_1) {
            _this.sprite.size.r_1 += 1;
            _this.sprite.ripple_1.width += 2 * _this.sprite.speed.r_1;
            _this.sprite.ripple_1.height += 2 * _this.sprite.speed.r_1;
            _this.sprite.ripple_1.x -= _this.sprite.speed.r_1;
            _this.sprite.ripple_1.y -= _this.sprite.speed.r_1;
            if (_this.sprite.size.r_1 > 1000) {
                _this.sprite.flag.r_1 = false;
            }
        }
    }
}

export default Wave;
