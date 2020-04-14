import RendererMain from '../object/environment/RendererMain';
import SceneMain from '../object/environment/SceneMain';
import CameraMain from '../object/environment/CameraMain';

import LightMain from '../object/LightMain';

import GroundMain from '../object/GroundMain';

/**
 * Object
 */
export default class Object {
    readonly static RendererMain: Function = RendererMain; // 主要渲染器
    readonly static SceneMain: Function = SceneMain; // 主要场景
    readonly static CameraMain: Function = CameraMain; // 主要相机
    
    readonly static LightMain: Function = LightMain; // 灯光
    
    readonly static GroundMain: Function = GroundMain; // 地面
}
