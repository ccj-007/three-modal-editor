import useStore from "../store";
import { createGeomary } from "./createGeomary";
import { clacFrame } from "./utils/clacFrame";

function render(timestamp: number) {
  const { scene, renderer, camera, controls, needRender, editStatus } =
    useStore.getState();

  clacFrame(timestamp, 1);

  if (needRender) {
    createGeomary();

    controls.enabled = editStatus === "NONE";
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
}

export { render };
