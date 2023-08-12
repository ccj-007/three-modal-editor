import useStore from "../../store";
let fps = 0;
let lastTimestamp = 0;
let frameCount = 0;
let isFirst = true;
let s = 2;

function updateFPS() {
  const { setFrame } = useStore.getState();
  fps = Math.round(frameCount / s);
  setFrame(fps);
  frameCount = 0;
}

export function clacFrame(timestamp: number, newS: number) {
  if (newS) s = newS;
  if (isFirst) {
    setInterval(updateFPS, s * 1000);
    isFirst = false;
  }

  if (lastTimestamp !== 0) {
    const elapsed = timestamp - lastTimestamp;
    fps = Math.round(1000 / elapsed);
    frameCount++;
  }
  lastTimestamp = timestamp;
}
