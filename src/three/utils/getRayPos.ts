import * as THREE from "three";
import useStore from "../../store";

function getRayPos(x: number, y: number) {
  const { camera, scene } = useStore.getState();
  let point = { x: 0, y: 0, z: 0 };
  if (!camera || !scene) return point;
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  // 获取屏幕坐标
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  // 发射射线
  raycaster.setFromCamera(mouse, camera);

  // 计算交点
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    // 获取世界坐标系中的点
    point = intersects[0].point;
  }
  return point;
}

export { getRayPos };
