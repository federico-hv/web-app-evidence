// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/tammi/OneDrive/Documents/Holdr/web-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/tammi/OneDrive/Documents/Holdr/web-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\tammi\\OneDrive\\Documents\\Holdr\\web-app";
var vite_config_default = (configEnv) => {
  process.env = {
    ...process.env,
    ...loadEnv(configEnv.mode, process.cwd(), "")
  };
  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_APP_BASE_URL,
    server: {
      watch: {
        usePolling: true
      },
      host: true,
      // needed for docker port mapping to work
      strictPort: true,
      port: 5174
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setup.ts"],
      coverage: {
        reporter: ["text", "json", "html"]
      }
    },
    resolve: {
      alias: [
        {
          find: "hooks",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/hooks")
        },
        {
          find: "layout",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/layout")
        },
        {
          find: "utilities",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/utilities")
        },
        { find: "lib", replacement: path.resolve(__vite_injected_original_dirname, "./src/lib") },
        {
          find: "pages",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/pages")
        },
        {
          find: "contexts",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/contexts")
        },
        {
          find: "configs",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/configs")
        },
        {
          find: "component",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/react")
        },
        {
          find: "shared",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/shared")
        },
        {
          find: "assets",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/assets")
        },
        {
          find: "content",
          replacement: path.resolve(__vite_injected_original_dirname, "./src/content")
        }
      ]
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0YW1taVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcSG9sZHJcXFxcd2ViLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdGFtbWlcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXEhvbGRyXFxcXHdlYi1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3RhbW1pL09uZURyaXZlL0RvY3VtZW50cy9Ib2xkci93ZWItYXBwL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHR5cGUgeyBDb25maWdFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoY29uZmlnRW52OiBDb25maWdFbnYpID0+IHtcclxuICAvLyBMb2FkIGFwcC1sZXZlbCBlbnYgdmFycyB0byBub2RlLWxldmVsIGVudiB2YXJzLlxyXG4gIHByb2Nlc3MuZW52ID0ge1xyXG4gICAgLi4ucHJvY2Vzcy5lbnYsXHJcbiAgICAuLi5sb2FkRW52KGNvbmZpZ0Vudi5tb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyksXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgICBiYXNlOiBwcm9jZXNzLmVudi5WSVRFX0FQUF9CQVNFX1VSTCxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICB3YXRjaDoge1xyXG4gICAgICAgIHVzZVBvbGxpbmc6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGhvc3Q6IHRydWUsIC8vIG5lZWRlZCBmb3IgZG9ja2VyIHBvcnQgbWFwcGluZyB0byB3b3JrXHJcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICAgIHBvcnQ6IDUxNzQsXHJcbiAgICB9LFxyXG4gICAgdGVzdDoge1xyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgc2V0dXBGaWxlczogWycuL3NyYy9zZXR1cC50cyddLFxyXG4gICAgICBjb3ZlcmFnZToge1xyXG4gICAgICAgIHJlcG9ydGVyOiBbJ3RleHQnLCAnanNvbicsICdodG1sJ10sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdob29rcycsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2hvb2tzJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnbGF5b3V0JyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbGF5b3V0JyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAndXRpbGl0aWVzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdXRpbGl0aWVzJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IGZpbmQ6ICdsaWInLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2xpYicpIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ3BhZ2VzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcGFnZXMnKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdjb250ZXh0cycsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbnRleHRzJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnY29uZmlncycsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbmZpZ3MnKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdjb21wb25lbnQnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9yZWFjdCcpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ3NoYXJlZCcsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3NoYXJlZCcpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ2Fzc2V0cycsXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ2NvbnRlbnQnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb250ZW50JyksXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGNBQWMsZUFBZTtBQUV0QyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsQ0FBQyxjQUF5QjtBQUV2QyxVQUFRLE1BQU07QUFBQSxJQUNaLEdBQUcsUUFBUTtBQUFBLElBQ1gsR0FBRyxRQUFRLFVBQVUsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQUEsRUFDOUM7QUFFQSxTQUFPLGFBQWE7QUFBQSxJQUNsQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsTUFBTSxRQUFRLElBQUk7QUFBQSxJQUNsQixRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0EsTUFBTTtBQUFBO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLGdCQUFnQjtBQUFBLE1BQzdCLFVBQVU7QUFBQSxRQUNSLFVBQVUsQ0FBQyxRQUFRLFFBQVEsTUFBTTtBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxRQUNwRDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUNyRDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBLFFBQ3hEO0FBQUEsUUFDQSxFQUFFLE1BQU0sT0FBTyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxRQUNqRTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLFFBQ3BEO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsUUFDdkQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsUUFDdEQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsUUFDcEQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDckQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDckQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsUUFDdEQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
