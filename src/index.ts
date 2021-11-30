import { generate } from "./generate";
import { getRgbStr } from "./utils";
import { COMMON_COLOR, IPresetColor } from "./types";

/**
 * @title ColorPalette
 * @description 色板中包含了 13 个常见的颜色，每个颜色分为 10 个梯度。通常，我们把 6 号色作为色板中的主色。
 */

// 13个常见的颜色
const colorList = {
  red: COMMON_COLOR.red,
  orangered: COMMON_COLOR.orangered,
  orange: COMMON_COLOR.orange,
  gold: COMMON_COLOR.gold,
  yellow: COMMON_COLOR.yellow,
  lime: COMMON_COLOR.lime,
  green: COMMON_COLOR.green,
  cyan: COMMON_COLOR.cyan,
  blue: COMMON_COLOR.blue,
  arcoblue: COMMON_COLOR.arcoblue,
  purple: COMMON_COLOR.purple,
  pinkpurple: COMMON_COLOR.pinkpurple,
  magenta: COMMON_COLOR.magenta,
};

function getPresetColors() {
  const presetColors = {} as IPresetColor;

  Object.keys(colorList).forEach((key) => {
    presetColors[key] = {};
    presetColors[key].light = generate(colorList[key], { list: true });
    presetColors[key].dark = generate(colorList[key], {
      list: true,
      dark: true,
    });
    presetColors[key].primary = colorList[key];
  });

  return presetColors;
}

export { generate, getPresetColors, getRgbStr };
