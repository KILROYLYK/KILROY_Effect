/**
 * 声音
 */
class Sound {
    /**
     * 原型对象
     * @constructor Sound
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            resources: config.resources,
            flag: true,
            volume: config.volume || 0.2
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
     * 开启声音
     * @return {void}
     */
    open() {
        const _this = this;
        _this.config.flag = true;
    }
    
    /**
     * 关闭声音
     * @return {void}
     */
    close() {
        const _this = this,
            res = _this.config.resources;
        
        _this.config.flag = false;
        
        for (const key in res) {
            _this.pause(key);
        }
    }
    
    /**
     * 播放声音
     * @param {string} name 声音标识
     * @return {void}
     */
    play(name) {
        const _this = this,
            sound = _this.config.resources[name].sound;
        
        if (!_this.config.flag) return;
        
        if (sound && !sound.isPlaying) {
            if (name === 'walk') sound.loop = true;
            sound.volume = _this.config.volume;
            sound.play();
        }
    }
    
    /**
     * 暂停声音
     * @param {string} name 声音标识
     * @return {void}
     */
    pause(name) {
        const _this = this,
            sound = _this.config.resources[name].sound;
        
        if (sound && sound.isPlaying) sound.pause();
    }
}

export default Sound;
