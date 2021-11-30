import * as path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import clear from "rollup-plugin-clear";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import pluginTypescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import pkg from "../package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");

const banner = `
  /**
   * @license
   * author: ${pkg.author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

export default {
  input: path.resolve(__dirname, "../src/index.ts"),
  output: [
    {
      file: `dist/${moduleName}.js`,
      format: "umd",
      name: moduleName,
      sourcemap: "inline",
      banner,
    },
    {
      file: `dist/${moduleName}.min.js`,
      format: "umd",
      name: moduleName,
      sourcemap: "inline",
      banner,
      plugins: [terser()],
    },
    {
      file: `dist/${moduleName}.cjs.js`,
      format: "cjs",
      name: moduleName,
      sourcemap: "inline",
      banner,
    },
    {
      file: `dist/${moduleName}.esm.js`,
      format: "es",
      sourcemap: "inline",
      banner,
    },
  ],
  plugins: [
    clear({
      targets: ["dist"],
    }),
    pluginTypescript({
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
      useTsconfigDeclarationDir: true,
    }),
    babel({
      babelHelpers: "bundled",
      configFile: path.resolve(__dirname, "../.babelrc.js"),
    }),
    alias(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      preventAssignment: true,
    }),
    nodeResolve(),
    commonjs({
      extensions: [".js", ".ts"],
    }),
  ],
};
