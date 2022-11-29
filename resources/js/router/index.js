import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
