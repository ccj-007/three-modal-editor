import * as THREE from "three";
import useStore from "../store";

function isCollision(e: MouseEvent) {
  const { camera, scene } = useStore.getState();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const x = e.clientX;
  const y = e.clientY;

  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // 计算射线和几何体的交点
  const MeshList = scene.children.filter((item) => item.type === "Mesh");
  if (MeshList.length) {
    const intersects = raycaster.intersectObjects(MeshList);

    return intersects.length > 0;
  }

  return false;
}

export { isCollision };
