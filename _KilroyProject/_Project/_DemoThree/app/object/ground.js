/**
 * Three
 */
const THREE = require('three');

/**
 * 地面
 */
class Ground {
    /**
     * 原型对象
     * @constructor Ground
     */
    constructor() {
        const _this = this;
        
        _this.loader = new THREE.TextureLoader();
        
        _this.config = {
            repeat: 25,
            anisotropy: 16,
            size: 20000,
            x: -Math.PI / 2,
            y: -250
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
    }
    
    /**
     * 创建
     * @param {object} config 配置
     * @return {object} 地面对象
     */
    create(config = {}) {
        const _this = this,
            groundTexture = _this.loader.load(config.img),
            repeat = config.repeat || _this.config.repeat,
            anisotropy = config.anisotropy || _this.config.anisotropy,
            size = config.size || _this.config.size;
        
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(repeat, repeat);
        groundTexture.anisotropy = anisotropy;
        
        const ground = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(size, size),
            new THREE.MeshLambertMaterial({
                map: groundTexture
            })
        );
        
        ground.rotation.x = config.x || _this.config.x;
        ground.position.y = config.y || _this.config.y;
        ground.receiveShadow = true;
        
        return ground;
    }
}

export default new Ground();
