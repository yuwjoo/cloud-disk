import { defineConfig } from "vite";
import { toFilePath } from "./builder/common";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": toFilePath("./src"),
      "~": toFilePath("./")
    }
  },
  build: {
    rollupOptions: {
      external: ['generated/prisma2/index', '../../generated/prisma2/client']
    }
  }
  // optimizeDeps: {
  //   include: ["generated/prisma"]
  // }
});
