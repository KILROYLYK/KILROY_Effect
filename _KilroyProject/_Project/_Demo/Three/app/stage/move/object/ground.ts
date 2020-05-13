import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 地面
 */
export default class Ground implements _Object {
    private readonly config: object = { // 配置
        image: 'https://image.gaeamobile.net/image/20190718/130858/grassland.jpg',
    };
    public readonly instance: object = { // 实例
        texture: null as THREE.Texture, // 质地
        material: null as THREE.MeshLambertMaterial, // 材料
        geometry: null as THREE.PlaneBufferGeometry, // 几何
        mesh: null as THREE.Mesh // 啮合
    };
    private loader: THREE.TextureLoader = null; // 加载
    
    
    /**
     * 构造函数
     * @constructor Ground
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        if (_this.instance.mesh) return;
        
        _this.loader = new Global.THREE.TextureLoader();
        
        // 质地
        _this.instance.texture = _this.loader.load(_this.config.image);
        _this.instance.texture.wrapS
            = _this.instance.texture.wrapT
            = Global.THREE.RepeatWrapping;
        _this.instance.texture.repeat.set(25, 25);
        _this.instance.texture.anisotropy = 16;
        _this.instance.texture.encoding = Global.THREE.sRGBEncoding;
        
        // 材料
        _this.instance.material = new Global.THREE.MeshLambertMaterial({
            map: _this.instance.texture
        });
        
        // 几何
        _this.instance.geometry = new Global.THREE.PlaneBufferGeometry(20000, 20000);
        
        // 啮合
        _this.instance.mesh = new Global.THREE.Mesh(_this.instance.geometry, _this.instance.material);
        _this.instance.mesh.position.x = 0;
        _this.instance.mesh.position.y = 0;
        _this.instance.mesh.rotation.x = -Math.PI / 2;
        _this.instance.mesh.rotation.y = 0;
        _this.instance.mesh.receiveShadow = true;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        if (_this.instance.mesh) return;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance.mesh) return;
        
        if (isResize) { // 屏幕变化
        }
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance.mesh) return;
        
        _this.loader = null;
        _this.instance.texture = null;
        _this.instance.material = null;
        _this.instance.geometry = null;
        _this.instance.mesh = null;
    }
}
