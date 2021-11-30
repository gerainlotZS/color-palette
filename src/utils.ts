import Color from "color";
import { ColorFormats, ColorFormat } from "./types";

/**
 * getRgbStr
 * @description 获取RGB格式颜色字符串
 * @param color
 * @returns number[]
 * @example getRgbStr("#fff") ==> "255, 255, 255"
 */
function getRgbStr(color: string) {
  return Color(color)
    .rgb()
    .round()
    .array()
    .join(",");
}

/**
 * getFormat
 * @description 获取颜色格式
 * @param {"hex" | "rgb" | "hsl"} format
 * @returns "hex" | "rgb" | "hsl"
 */
function getFormat(format: ColorFormat) {
  const formats: string[] = [...ColorFormats];
  if (!format || formats.indexOf(format) < 0) {
    return "hex";
  }
  return format;
}

/**
 * getColorString
 * @description 获取颜色字符串(按照不同格式)
 * @param {string} color
 * @param {"hex" | "rgb" | "hsl"} format;
 * @returns string
 */
function getColorString(color: Color<string>, format: ColorFormat) {
  const innerFormat = getFormat(format);

  if (innerFormat === "hex") {
    return color[innerFormat]();
  }
  return color[innerFormat]()
    .round()
    .string();
}

export { getRgbStr, getFormat, getColorString };
