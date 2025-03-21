import { defineConfig } from "vite";
import { toFilePath } from "./builder/common";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": toFilePath("./src")
    }
  }
});
