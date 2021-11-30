const Color = require('color');
import { palette } from "./palette";
import { ColorFormat } from "./types";
import { getColorString } from "./utils";

/**
 * 暗色色板
 * palette dark
 * @description 动态梯度算法
 * @param {string} originColor
 * @param {number} index
 * @param {'hex' | 'rgb' | 'hsl'} format
 * @returns
 */
function paletteDark(originColor: string, index: number, format: ColorFormat) {
  const lightColor = Color(palette(originColor, 10 - index + 1, "hex"));

  const originBaseColor = Color(originColor);
  const originBaseHue = originBaseColor.hue();
  const originBaseSaturation = originBaseColor.saturationv();

  const baseColor = Color({
    h: originBaseColor.hue(),
    s: getNewSaturation(6),
    v: originBaseColor.value(),
  });

  const baseSaturation = baseColor.saturationv();

  const maxSaturationStep = 100;
  const minSaturationStep = 9;

  const step = Math.ceil((baseSaturation - minSaturationStep) / 4);
  const step1to5 = Math.ceil((maxSaturationStep - baseSaturation) / 5);

  function getNewSaturation(_index: number) {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5;
    }
    if (_index === 6) {
      if (originBaseHue >= 0 && originBaseHue < 50) {
        return originBaseSaturation - 15;
      }
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20;
      }
      if (originBaseHue >= 191 && originBaseHue <= 360) {
        return originBaseSaturation - 15;
      }
    }

    return baseSaturation - step * (_index - 6);
  }

  const retColor = Color({
    h: lightColor.hue(),
    s: getNewSaturation(index),
    v: lightColor.value(),
  });

  return getColorString(retColor, format);
}

export { paletteDark };
