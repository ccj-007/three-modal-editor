import useStore from "../store";
import * as THREE from "three";
import { TransformControls } from "./lib/TransformControls";

const objectControls = () => {
  const { scene, camera, renderer, setTransformControls } = useStore.getState();
  const transformControls = new TransformControls(camera, renderer.domElement);
  scene.add(transformControls);

  setTransformControls(transformControls);
};

const onTransformControlsChange = (e) => {
  console.log("onTransformControlsChange", e);
  const { setEditStatus } = useStore.getState();
  setEditStatus("TRANSFORM");
};

const onWheel = () => {
  const { setEditStatus } = useStore.getState();
  setEditStatus("NONE");
};

const onKeydown = (event) => {
  const { transformControls } = useStore.getState();

  switch (event.keyCode) {
    case 69: // E - rotate
      transformControls.setMode("rotate"); // 切换到旋转模式
      break;
    case 83: // S - scale
      transformControls.setMode("scale"); // 切换到缩放模式
      break;
    case 87: // W - translate
      transformControls.setMode("translate"); // 切换到平移模式
      break;
    default:
      break;
  }
};
export { objectControls, onTransformControlsChange, onWheel, onKeydown };
