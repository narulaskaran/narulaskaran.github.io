import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    allowedHosts: ["beelink", "beelink.taileadfb.ts.net"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})