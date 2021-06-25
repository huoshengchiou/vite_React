import { defineConfig } from "vite";
// import fs from "fs/promises";

import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
});

// read js as jsx //仍有問題需要調整
// esbuild: {
//   loader: "jsx",
//   include: /src\/.*\.jsx?$/,
//   // loader: "tsx",
//   // include: /src\/.*\.[tj]sx?$/,
//   exclude: [],
// },
// optimizeDeps: {
//   esbuildOptions: {
//     plugins: [
//       {
//         name: "load-js-files-as-jsx",
//         setup(build) {
//           build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
//             loader: "jsx",
//             contents: await fs.readFile(args.path, "utf8"),
//           }));
//         },
//       },
//     ],
//   },
// },
