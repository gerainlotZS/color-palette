import { palette } from "./palette";
import { paletteDark } from "./palette-dark";
import { GenerateColorOption } from "./types";

const MAX_LEVEL = 10;
/**
 * generate
 * @description 生成颜色
 * @param {string} color
 * @param {Object} options
 **** @param {number} options.index 1 - 10 (default: 6)
 **** @param {boolean} options.dark
 **** @param {boolean} options.list
 **** @param {'hex' | 'rgb' | 'hsl'} options.format 'hex' | 'rgb' | 'hsl'
 *
 * @return string | string[]
 */
function generate(
  color: string,
  options?: GenerateColorOption
): string | string[] {
  const defaultOptions: GenerateColorOption = {
    dark: false,
    list: false,
    index: 6,
    format: "hex",
  };
  const assignOptions = { ...defaultOptions, ...options };

  if (assignOptions.list) {
    const list: string[] = [];
    const paletteFunc = assignOptions.dark ? paletteDark : palette;
    for (let i = 1; i <= MAX_LEVEL; i++) {
      list.push(paletteFunc(color, i, assignOptions.format));
    }
    return list;
  }
  return assignOptions.dark
    ? paletteDark(color, assignOptions.index, assignOptions.format)
    : palette(color, assignOptions.index, assignOptions.format);
}

export { generate };
