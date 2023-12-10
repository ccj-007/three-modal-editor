import { useState, useEffect, useRef } from "react";
import { RadioChangeEvent } from "antd/lib";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { Radio, Space } from "antd";
import { ConfigProvider, Button } from "antd";
import T from "../langs/T";
import useStore from "../store";
import { Locale } from "antd/es/locale";
import { GeomeryObj, GeomeryViewObj, GEOMARY } from "../types/edit";
import { v4 as uuidv4 } from "uuid";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { clear } from "../three/utils/clear";
import { reset } from "../three/utils/reset";
import GuiComp from "./GUI";
import { onModelImport, onModelExport, exportImage } from "../three/model";
dayjs.locale("en");

function Page() {
  const frame = useStore((state) => state.frame);
  const targetInfo = useStore((state) => state.targetInfo);
  const { addGeomery, setLocale } = useStore.getState();
  const [locale, setLocal] = useState<Locale>(enUS);
  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;

    setLocal(localeValue);
    setLocale(localeValue.locale);
    if (!localeValue) {
      dayjs.locale("en");
    } else {
      dayjs.locale("zh-cn");
    }
  };
  const geomeryViewList: GeomeryViewObj[] = [
    {
      parentType: "GEOMARY",
      type: "CUBE",
    },
    {
      parentType: "GEOMARY",
      type: "CONE",
    },
    {
      parentType: "GEOMARY",
      type: "SPHERE",
    },
  ];
  const modelList: string[] = ["import", "export", "image"];
  const onDragStart = (e: React.DragEvent, item: GeomeryViewObj) => {
    console.log("onDragStart", e, item);
  };

  const onDragEnd = (e: React.DragEvent, item: GeomeryViewObj) => {
    const prop: GeomeryObj = {
      ...item,
      gid: uuidv4(),
      x: e.clientX,
      y: e.clientY,
    };
    if (item.type === GEOMARY.CUBE) prop.BoxGeometry = [5, 5, 5];
    if (item.type === GEOMARY.CONE) prop.ConeGeometry = [5, 5, 5];
    if (item.type === GEOMARY.SPHERE) prop.SphereGeometry = [3, 32, 16];
    addGeomery(prop);
    console.log("onDragEnd", e.clientX, e.clientY);
  };
  useEffect(() => {
    onModelImport();
  }, []);

  return (
    <ConfigProvider locale={locale}>
      <div className="penel panel-lt">
        <Space style={{ marginBottom: "8px" }}>
          {modelList.map((item, i) => {
            if (item === "import") {
              return (
                <Button type="primary" key={i}>
                  <T t={item}></T>
                  <input
                    alt=""
                    placeholder=""
                    type="file"
                    id="download"
                  ></input>
                </Button>
              );
            } else if (item === "export") {
              return (
                <Button type="primary" key={i} onClick={() => onModelExport()}>
                  <T t={item}></T>
                </Button>
              );
            } else if (item === "image") {
              return (
                <Button type="primary" key={i} onClick={() => exportImage()}>
                  <T t={item}></T>
                </Button>
              );
            }
          })}
        </Space>
        <br />
        <Space>
          {geomeryViewList.map((item, i) => (
            <Button
              type="primary"
              key={i}
              onDragStart={(e) => onDragStart(e, item)}
              onDragEnd={(e) => onDragEnd(e, item)}
              draggable
            >
              <T t={item.type}></T>
            </Button>
          ))}
        </Space>

        <GuiComp></GuiComp>
      </div>
      <div className="penel panel-lb">
        <div style={{ margin: "8px 0px" }}>
          <Radio.Group value={locale} onChange={changeLocale}>
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={zhCN}>
              中文
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="penel panel-rt">
        FPS: <span>{frame}</span>
        <br />
        {/* userData: <span>{JSON.stringify(targetInfo?.userData?.el)}</span> */}
      </div>
      <div className="penel panel-rb">
        {/* <Slider defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} />
                <Slider defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} />
                <Slider defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} /> */}
        <Space>
          <Button type="primary" onClick={clear}>
            clear
          </Button>
          <Button type="primary" onClick={reset}>
            reset
          </Button>
        </Space>
      </div>
    </ConfigProvider>
  );
}

export default Page;
