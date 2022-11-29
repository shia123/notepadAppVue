import "./bootstrap";
import { createApp } from "vue/dist/vue.esm-bundler";
import App from "./layouts/App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faFile,
    faCopy,
    faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import {
    faDownload,
    faRotateLeft,
    faRotateRight,
    faMagnifyingGlassPlus,
    faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faFile,
    faDownload,
    faCopy,
    faClipboard,
    faRotateLeft,
    faRotateRight,
    faMagnifyingGlassPlus,
    faMagnifyingGlassMinus
);
createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .mount("#app");
