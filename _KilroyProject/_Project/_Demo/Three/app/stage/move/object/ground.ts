import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 地面
 */
export default class Ground implements _Object {
    public readonly config: object = { // 配置
        loader: null,
        image: {
            grass: 'https://image.gaeamobile.net/image/20190718/130858/grassland.jpg'
        },
        repeat: 25, // 重复
        anisotropy: 16, // 各向异性
        size: 20000, // 尺寸
        x: 0,
        y: 0,
        rx: -Math.PI / 2,
        ry: 0
    };
    public readonly instance: object = { // 实例
        isCreate: false,
        texture: null,
        material: null,
        geometry: null,
        mesh: null
    };
    
    /**
     * 构造函数
     * @constructor Ground
     */
    constructor() {
        const _this = this;
        
        _this.config.loader = new Global.THREE.TextureLoader();
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
        
        if (_this.instance.isCreate) return;
        
        _this.instance.isCreate = true;
        
        // 质地
        const texture = _this.config.loader.load(_this.config.image.grass);
        texture.wrapS = texture.wrapT = Global.THREE.RepeatWrapping;
        texture.repeat.set(_this.config.repeat, _this.config.repeat);
        texture.anisotropy = _this.config.anisotropy;
        texture.encoding = Global.THREE.sRGBEncoding;
        _this.instance.texture = texture;
        
        // 材料
        const material = new Global.THREE.MeshLambertMaterial({ map: texture });
        _this.instance.material = material;
        
        // 几何
        const geometry = new Global.THREE.PlaneBufferGeometry(
            _this.config.size,
            _this.config.size
        );
        _this.instance.geometry = geometry;
        
        // 啮合
        const mesh = new Global.THREE.Mesh(geometry, material);
        mesh.position.x = _this.config.x;
        mesh.position.y = _this.config.y;
        mesh.rotation.x = _this.config.rx;
        mesh.rotation.y = _this.config.ry;
        mesh.receiveShadow = true;
        _this.instance.mesh = mesh;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        if (_this.instance.isCreate) return;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance.isCreate) return;
        
        if (isResize) { // 屏幕变化
        }
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    
        if (!_this.instance.isCreate) return;
        
        _this.instance.texture = null;
        _this.instance.material = null;
        _this.instance.geometry = null;
        _this.instance.mesh = null;
    }
}
