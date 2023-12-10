import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import useStore from "../store";
import { render } from "./render";
import { watchEvent } from "./eventWatch";
import { objectControls } from "./objectControls";
function sceneRender() {
  const { scene, camera, renderer, setControls } = useStore.getState();
  const container = document.getElementById("container") as HTMLDivElement;
  // 创建渲染器
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  camera.position.set(0, 5, 10);
  camera.lookAt(scene.position);

  // 创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 5); // 颜色和强度
  // 将环境光添加到场景中
  scene.add(ambientLight);

  // 创建网格平面
  const gridHelper = new THREE.GridHelper(30, 30, 0xaaaaaa, 0x444444);
  scene.add(gridHelper);

  // 物体操纵轴
  objectControls();
  watchEvent();

  // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  controls.update();
  setControls(controls);
  render();
}

export { sceneRender };
