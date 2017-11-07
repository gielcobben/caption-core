import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    format: "cjs",
    file: "dist/index.js",
  },
  plugins: [
    resolve(),
    commonjs({
      include: "node_modules/**",
    }),
    babel({
      exclude: "node_modules/**", // only transpile our source code
      runtimeHelpers: true,
    }),
  ],
};
