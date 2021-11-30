import Color from "color";
import { ColorFormat } from "./types";
import { getColorString } from "./utils";

/**
 * 色板
 * palette
 * @description 动态梯度算法
 * @param {string} originColor
 * @param {number} index
 * @param {'hex' | 'rgb' | 'hsl'} format
 * @returns
 */
function palette(originColor: string, index: number, format: ColorFormat) {
  const color = Color(originColor);

  // HSV/HSB/HSL
  // HSL即色相、饱和度、亮度（英语：Hue, Saturation, Lightness）。
  // HSV即色相、饱和度、明度（英语：Hue, Saturation, Value），又称HSB，其中B即英语：Brightness。
  //
  // 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等
  const h = color.hue();
  // 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值
  const s = color.saturationv();
  // 明度（V），亮度（L），取0-100%
  const v = color.value();

  const hueStep = 2;
  const maxSaturationStep = 100;
  const minSaturationStep = 9;

  const maxValue = 100;
  const minValue = 30;

  function getNewHue(isLight: boolean, i: number): number {
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * i : h + hueStep * i;
    } else {
      hue = isLight ? h + hueStep * i : h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  }

  function getNewSaturation(isLight: boolean, i: number): number {
    let newSaturation;

    if (isLight) {
      newSaturation =
        s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i;
    } else {
      newSaturation = s + ((maxSaturationStep - s) / 4) * i;
    }
    return newSaturation;
  }

  function getNewValue(isLight: boolean, i: number): number {
    return isLight
      ? v + ((maxValue - v) / 5) * i
      : v <= minValue
      ? v
      : v - ((v - minValue) / 4) * i;
  }

  const isLight = index < 6;
  const _index = isLight ? 6 - index : index - 6;

  const retColor =
    index === 6
      ? color
      : Color({
          h: getNewHue(isLight, _index),
          s: getNewSaturation(isLight, _index),
          v: getNewValue(isLight, _index),
        });

  return getColorString(retColor, format);
}

export { palette };
