import useStore from "../store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
export const onModelImport = () => {
  const { scene } = useStore.getState();
  const fileInput = document.getElementById("download") as HTMLAnchorElement;
  // 当用户选择文件时，触发文件选择事件
  fileInput.addEventListener("change", function (event) {
    // 获取用户选择的文件
    const file = event.target.files[0];

    // 创建一个 OBJ Loader 对象
    const loader = new GLTFLoader();
    // 加载模型
    loader.load(URL.createObjectURL(file), (gltf) => {
      // 获取加载的模型对象
      const model = gltf.scene;
      // 将模型添加到场景中
      scene.add(model);
    });
  });
};
export const onModelExport = () => {
  const { scene } = useStore.getState();

  // 创建一个 GLTFExporter 对象
  const exporter = new GLTFExporter();

  // 导出模型
  exporter.parse(scene, function (result) {
    const blob = new Blob([JSON.stringify(result)], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "model.gltf"; // 下载文件的名称
    link.click();
    URL.revokeObjectURL(url); // 释放 URL 对象
  });
};

export const exportImage = () => {
  const { renderer } = useStore.getState();
  // 将渲染结果转换为数据 URL
  const dataURL = renderer.domElement.toDataURL();

  // 创建一个链接元素
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "scene.png"; // 下载文件的名称

  // 模拟用户点击链接来下载图像文件
  link.click();
};
