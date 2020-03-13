import RendererMain from '../object/environment/RendererMain';
import SceneMain from '../object/environment/SceneMain';
import CameraMain from '../object/environment/CameraMain';

import LightMain from '../object/LightMain';

import GroundMain from '../object/GroundMain';

/**
 * Object
 */
export default class Object {
    readonly static RendererMain: RendererMain = RendererMain; // 主要渲染器
    readonly static SceneMain: SceneMain = SceneMain; // 主要场景
    readonly static CameraMain: CameraMain = CameraMain; // 主要相机
    
    readonly static LightMain: LightMain = LightMain; // 灯光
    
    readonly static GroundMain: GroundMain = GroundMain; // 地面
}
