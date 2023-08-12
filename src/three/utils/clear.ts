import useStore from "../../store";
export const clear = () => {
  const { renderer, scene, transformControls } = useStore.getState();

  scene.remove(transformControls);
  // 从场景中移除所有几何体
  const MeshList = scene.children.filter((item) => item.type === "Mesh");

  if (MeshList.length) {
    MeshList.forEach((child) => {
      if (child.type === "Mesh") {
        if (child.userData) {
          scene.remove(child.userData.highlightEdge);
        }
        scene.remove(child);
      }
    });
  }

  console.warn("MeshList", MeshList);

  // 清理画布
  renderer.clear();

  // 清除颜色缓冲区和深度缓冲区
  renderer.clearColor();
  renderer.clearDepth();
};
