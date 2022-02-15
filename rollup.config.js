import esbuild from "rollup-plugin-esbuild";

export default {
  input: "src/main.ts",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
  plugins: [
    esbuild({
      sourceMap: true, // by default inferred from rollup's `output.sourcemap` option
      target: "esnext", // default, or 'es20XX', 'esnext'
      loaders: {
        ".json": "json",
      },
    }),
  ],
};
