import { GeomeryObj, Lang } from "../types/edit";
import { create } from "zustand";
import * as THREE from "three";

interface State {
  /** 几何体list */
  geoList: GeomeryObj[];
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  /** 网格平面控制 */
  controls: unknown;
  /** 物体编辑控制 */
  transformControls: unknown;
  /** 是否需要渲染 */
  needRender: boolean;
  /** 语言 */
  locale: Lang;
  /** 帧率 */
  frame: number;
  /** 帧率 */
  targetInfo: unknown;
  editStatus: "NONE" | "TRANSFORM";
  addGeomery: (v: GeomeryObj) => void;
  setGeomery: (v: GeomeryObj[]) => void;
  setLocale: (v: Lang) => void;
  setControls: (v: unknown) => void;
  setNeedRender: (v: boolean) => void;
  setFrame: (v: number) => void;
  setEditStatus: (v: "NONE" | "TRANSFORM") => void;
  setTargetInfo: (
    v: THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[]
    >
  ) => void;
  setTransformControls: (v: unknown) => void;
}

const useStore = create<State>((set) => {
  return {
    geoList: [],
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ),
    renderer: new THREE.WebGLRenderer({ antialias: true }),
    controls: null,
    needRender: true,
    locale: "en",
    frame: 0,
    targetInfo: {},
    editStatus: "NONE",
    addGeomery: (v) =>
      set((state) => ({
        ...state,
        geoList: [...state.geoList, v],
      })),
    setGeomery: (v) =>
      set((state) => ({
        ...state,
        geoList: v,
      })),
    setLocale: (v) =>
      set((state) => ({
        ...state,
        locale: v,
      })),
    setControls: (v) =>
      set((state) => ({
        ...state,
        controls: v,
      })),
    setNeedRender: (v) =>
      set((state) => ({
        ...state,
        needRender: v,
      })),
    setFrame: (v) =>
      set((state) => ({
        ...state,
        frame: v,
      })),
    setTargetInfo: (v) =>
      set((state) => ({
        ...state,
        targetInfo: v,
      })),
    setTransformControls: (v) =>
      set((state) => ({
        ...state,
        transformControls: v,
      })),
    setEditStatus: (v) =>
      set((state) => ({
        ...state,
        editStatus: v,
      })),
  };
});

export default useStore;
