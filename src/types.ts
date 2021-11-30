enum COMMON_COLOR {
  red = "#F53F3F",
  orangered = "#F77234",
  orange = "#FF7D00",
  gold = "#F7BA1E",
  yellow = "#FADC19",
  lime = "#9FDB1D",
  green = "#00B42A",
  cyan = "#14C9C9",
  blue = "#3491FA",
  arcoblue = "#165DFF",
  purple = "#722ED1",
  pinkpurple = "#D91AD9",
  magenta = "#F5319D",
}

interface IPresetColorValue {
  primary: string[] | string;
  light: string[] | string;
  dark: string[] | string;
}

interface IPresetColor {
  red: IPresetColorValue;
  orangered: IPresetColorValue;
  orange: IPresetColorValue;
  gold: IPresetColorValue;
  yellow: IPresetColorValue;
  lime: IPresetColorValue;
  green: IPresetColorValue;
  cyan: IPresetColorValue;
  blue: IPresetColorValue;
  arcoblue: IPresetColorValue;
  purple: IPresetColorValue;
  pinkpurple: IPresetColorValue;
  magenta: IPresetColorValue;
}

const ColorFormats = ["hex", "rgb", "hsl"];
type ColorFormat = "hex" | "rgb" | "hsl";

interface GenerateColorOption {
  dark?: boolean;
  list?: boolean;
  index?: number;
  format?: ColorFormat;
}

export {
  COMMON_COLOR,
  IPresetColorValue,
  IPresetColor,
  ColorFormats,
  ColorFormat,
  GenerateColorOption,
};
