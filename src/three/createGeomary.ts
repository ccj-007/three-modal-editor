import { GeomeryObj } from "../types/edit";
import * as THREE from "three";
import { getRayPos } from "./utils/getRayPos";
import useStore from "../store";
const readlyRenderList: GeomeryObj[] = [];

function createGeomary() {
  const { scene, geoList } = useStore.getState();

  if (geoList.length) {
    const diff = geoList.filter(
      (obj1) => !readlyRenderList.some((obj2) => obj1.gid === obj2.gid)
    );
    diff.length &&
      diff.forEach((el) => {
        const { BoxGeometry, ConeGeometry, SphereGeometry, type } = el;
        let geometry = null,
          h = 0;
        if (type === "CUBE" && BoxGeometry) {
          geometry = new THREE.BoxGeometry(...BoxGeometry);
          h = BoxGeometry[1] / 2;
        }
        if (type === "CONE" && ConeGeometry) {
          geometry = new THREE.ConeGeometry(...ConeGeometry);
          h = ConeGeometry[1] / 2;
        }
        if (type === "SPHERE" && SphereGeometry) {
          geometry = new THREE.SphereGeometry(...SphereGeometry);
          h = SphereGeometry[0];
        }

        if (geometry) {
          const material = new THREE.MeshNormalMaterial();
          const renderGeometry = new THREE.Mesh(geometry, material);
          renderGeometry.userData.el = el;

          const { x, y, z } = getRayPos(el.x, el.y);
          renderGeometry.position.set(x, y + h, z);
          scene.add(renderGeometry);
          readlyRenderList.push(el);
        }
      });
  }
}

export { createGeomary };
