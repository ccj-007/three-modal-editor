import { sceneRender } from "..";
import { clear } from "./clear";
export const reset = () => {
  clear();
  sceneRender();
};
