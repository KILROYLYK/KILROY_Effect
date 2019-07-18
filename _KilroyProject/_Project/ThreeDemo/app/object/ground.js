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
     * 地面
     * @param {object} config 配置
     * @return {object} 场景对象
     */
    create(config = {}) {
        const _this = this,
            groundTexture = _this.loader.load(config.img),
            repeat = config.repeat || 25,
            anisotropy = config.anisotropy || 16,
            size = config.size || 20000;
        
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(repeat, repeat);
        groundTexture.anisotropy = anisotropy;
        
        const groundObj = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(size, size),
            new THREE.MeshLambertMaterial({
                map: groundTexture
            })
        );
    
        groundObj.position.y = -250;
        groundObj.rotation.x = -Math.PI / 2;
        groundObj.receiveShadow = true;
        
        return groundObj;
    }
}

export default new Ground();
