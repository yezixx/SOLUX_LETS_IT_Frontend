import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
//vite 프록시 설정
//서버 주소 full x, /api 로 불러올 수 있음
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      //프론트엔드 상에서 대치할 주소명
      "/api": {
        //백엔드 서버 주소
        target: "http://172.20.6.43:8080",
        // 프론트엔드 상에서 다른 주소 (api)로 대치할 것인가? true
        changeOrigin: true,
        // /api로 보낸 요청 api를 제거하고 실제 요청 주소로 대치
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
//vite 설정, 프록시 설정
