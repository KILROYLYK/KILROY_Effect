/**
 * Window
 */
import { $ } from '../../../_Base/js/window';

const defaultConfig = {
    dom: "body",
    text: "",
    delay: 150
};

/**
 * 文案
 */
class Text {
    /**
     * 原型对象
     * @constructor Text
     * @param {object} opt 配置
     */
    constructor(opt) {
        this.opt = $.extend({}, defaultConfig, opt);
        this.$dom = $(opt.dom);
        this.textArr = opt.text.split('');
        this.delay = this.opt.delay;
        this.str = "";
        
        initDom.call(this);
    }
    
    /**
     * 播放
     * @return {Object} 播放对象
     */
    play() {
        const _this = this,
            total = this.textArr.length;
        
        let count = 0;
        
        return new Promise((resolve, reject) => {
            this.$dom.find("i").each((i, item) => {
                delay(i * this.delay).then(() => {
                    $(item).css("opacity", 1);
                    count++;
                    if (count === total) {
                        resolve();
                    }
                });
                
            });
        });
    }
    
}

/**
 * 初始化dom
 * @return {void}
 */
function initDom() {
    for (let i = 0; i < this.textArr.length; i++) {
        this.str += "<i>" + this.textArr[i] + "</i>";
    }
    
    this.$dom.append(this.str);
}

/**
 * 延时
 * @param {number} time 间隔时间
 * @return {object} 延时对象
 */
function delay(time) {
    if (time === 0) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export default Text;
