import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vuePlugin from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        laravel(["resources/css/app.css", "resources/js/front.js"]),
        vuePlugin({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
