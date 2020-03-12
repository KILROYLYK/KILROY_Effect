import RendererMain from '../object/environment/RendererMain';
import SceneMain from '../object/environment/SceneMain';
import CameraMain from '../object/environment/CameraMain';


import Light from '../object/LightMain';

/**
 * Object
 */
export default class Object {
    readonly static RendererMain: RendererMain = RendererMain; // 主要渲染器
    readonly static SceneMain: SceneMain = SceneMain; // 主要场景
    readonly static CameraMain: CameraMain = CameraMain; // 主要相机
    
    readonly static Light: Light = Light; // 灯光
}
