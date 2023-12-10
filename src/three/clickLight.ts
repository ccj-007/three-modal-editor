import * as THREE from "three";
import useStore from "../store";
const disableHighlight = (MeshList: any[]) => {
  const { scene } = useStore.getState();
  // 取消所有原来被选中的几何体的高亮
  for (let i = 0; i < MeshList.length; i++) {
    const mesh = MeshList[i] as THREE.Mesh;
    if (mesh.userData.isSelected) {
      mesh.material = mesh.userData.originalMaterial;
      mesh.userData.isSelected = false;

      // 移除外轮廓几何体
      scene.remove(mesh.userData.highlightEdge);
    }
  }
};

function clickLight(e: MouseEvent) {
  const { camera, scene, setTargetInfo, transformControls, setEditStatus } =
    useStore.getState();
  setEditStatus("NONE");

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  // 更新射线投射器的起始点和方向
  const x = e.clientX;
  const y = e.clientY;

  // 获取屏幕坐标
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // 递归查询Group内的Mesh
  function findMeshesInGroups(object) {
    const meshes = [];

    if (object.type === "Group") {
      object.children.forEach((child) => {
        if (child.type === "Mesh") {
          meshes.push(child);
        } else {
          meshes.push(...findMeshesInGroups(child));
        }
      });
    }

    return meshes;
  }
  // 计算射线和几何体的交点
  const groupsWithMeshes: THREE.Group[] = [];
  const meshes: THREE.Mesh[] = [];
  scene.children.forEach((child) => {
    if (child.type === "Group") {
      const meshs = findMeshesInGroups(child);
      if (meshs.length > 0) {
        groupsWithMeshes.push(...meshs);
      }
    } else if (child.type === "Mesh") {
      meshes.push(child);
    }
  });
  let MeshList = [...meshes, ...groupsWithMeshes];
  if (MeshList.length) {
    const intersects = raycaster.intersectObjects(MeshList);

    // 如果有交点，则对几何体进行高亮处理
    if (intersects.length > 0) {
      scene.add(transformControls);
      console.log(
        "🚀 ~ file: clickLight.ts:71 ~ clickLight ~ scene:",
        scene.children
      );

      // 取消原来的高亮
      disableHighlight(MeshList);

      // 获取被选中的几何体
      const selected = intersects[0].object as THREE.Mesh;

      // 记录原来的材质和缩放值
      selected.userData.originalMaterial = selected.material;
      selected.userData.originalScale = selected.scale.clone();
      // 创建外轮廓几何体
      const edge = new THREE.EdgesGeometry(selected.geometry);
      const edgeMesh = new THREE.LineSegments(edge);
      edgeMesh.position.setFromMatrixPosition(selected.matrixWorld);
      selected.userData.highlightEdge = edgeMesh;

      setTargetInfo(selected);

      // 物体操作
      transformControls.attach(selected);

      // 设置选中标志
      selected.userData.isSelected = true;
      // 在选中的几何体周围添加边框几何体
      scene.add(edgeMesh);
    } else {
      // 取消所有原来被选中的几何体的高亮
      disableHighlight(MeshList);
      scene.remove(transformControls);
    }
  }
}

export { clickLight };
