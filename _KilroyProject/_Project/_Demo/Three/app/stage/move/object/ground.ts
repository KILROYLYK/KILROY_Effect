import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 地面
 */
export default class Ground implements _Object {
    private readonly src: string = 'https://image.gaeamobile.net/image/20190718/130858/grassland.jpg'; // 资源地址
    private loader: THREE.TextureLoader = null; // 加载
    
    public instance: THREE.Mesh = null; // 实例
    
    
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
        
        if (_this.instance) return;
        
        _this.loader = new Global.THREE.TextureLoader();
        
        // 质地
        const texture = _this.loader.load(_this.src);
        texture.wrapS
            = texture.wrapT
            = Global.THREE.RepeatWrapping;
        texture.repeat.set(25, 25);
        texture.anisotropy = 16;
        texture.encoding = Global.THREE.sRGBEncoding;
        
        // 材料
        const material = new Global.THREE.MeshLambertMaterial({
            map: texture
        });
        
        // 几何
        const geometry = new Global.THREE.PlaneBufferGeometry(20000, 20000);
        
        // 啮合
        _this.instance = new Global.THREE.Mesh(geometry, material);
        _this.instance.position.x = 0;
        _this.instance.position.y = 0;
        _this.instance.rotation.x = -Math.PI / 2;
        _this.instance.rotation.y = 0;
        _this.instance.receiveShadow = true;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        if (_this.instance) return;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        if (isResize) { // 屏幕变化
        }
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.loader = null;
        _this.instance = null;
    }
}
