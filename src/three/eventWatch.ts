import { clickLight } from "./clickLight";
import {
  onTransformControlsChange,
  onWheel,
  onKeydown,
  onMouseUp,
} from "./objectControls";
import useStore from "../store";

export const watchEvent = () => {
  const { transformControls } = useStore.getState();
  document.body.addEventListener("click", clickLight);
  document.body.addEventListener("mouseup", onMouseUp);
  document.body.addEventListener("wheel", onWheel);
  document.body.addEventListener("keydown", onKeydown);
  transformControls.addEventListener("change", onTransformControlsChange);
};
export const removeEvent = () => {
  document.body.removeEventListener("click", clickLight);
  document.body.removeEventListener("mouseup", onMouseUp);
  transformControls.removeEventListener("change", onTransformControlsChange);
  document.body.removeEventListener("wheel", onWheel);
  document.body.removeEventListener("keydown", onKeydown);
};
