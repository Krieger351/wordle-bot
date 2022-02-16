import esbuild from "rollup-plugin-esbuild";

export default {
  input: "src/main.ts",
  output: {
    file: "bundle.js",
    format: "cjs",
    sourceMap: "inline",
  },
  plugins: [
    esbuild({
      // minify: true,
      target: "esnext",
    }),
  ],
};
