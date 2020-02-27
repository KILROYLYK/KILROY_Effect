/**
 * Environment
 */
import RendererMain from '../object/environment/RendererMain';
import SceneMain from '../object/environment/SceneMain';
import CameraMain from '../object/environment/CameraMain';

/**
 * Object
 */
export default class Object {
    readonly static RendererMain = RendererMain; // 主要渲染器
    readonly static SceneMain = SceneMain; // 主要场景
    readonly static CameraMain = CameraMain; // 主要相机
}
