import React from "react";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import useStore from "../store";

function GuiComp() {
  const { setGUI } = useStore.getState();
  const targetInfo = useStore((state) => state.targetInfo);
  const gui = React.useRef<GUI>();

  const createGUI = () => {
    gui.current = new GUI();
    setGUI(gui.current);
    gui.current.domElement.style.position = "absolute";
    gui.current.domElement.style.top = "200px";
    gui.current.domElement.style.left = "0px";
  };

  React.useEffect(() => {
    gui.current?.destroy();
    createGUI();
    if (targetInfo && JSON.stringify(targetInfo) !== "{}" && gui.current) {
      gui.current
        .add(targetInfo.position, "x", -60, 60)
        .listen()
        .name("x轴坐标")
        .onChange(function (x: number) {
          targetInfo.position.x = x;
        });
      gui.current
        .add(targetInfo.position, "y", -60, 60)
        .listen()
        .name("y轴坐标")
        .onChange(function (y: number) {
          targetInfo.position.y = y;
        });
      gui.current
        .add(targetInfo.position, "z", -60, 60)
        .listen()
        .name("z轴坐标")
        .onChange(function (z: number) {
          targetInfo.position.z = z;
        });
    }
  }, [targetInfo]);

  return <></>;
}

export default GuiComp;
