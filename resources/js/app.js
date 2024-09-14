import { createApp } from "vue";
 import App from "@/App.vue";
 import router from "./router";
 import {createPinia} from "pinia"
 import Toast from "vue-toastification";
 import "vue-toastification/dist/index.css";
//import TestApp from "./TestApp.vue";
import "../../public/assets/style.css";




const app =  createApp(App);
const pinia = createPinia(); // Create a Pinia instance
const options = {
    // You can set your default options here
};
app.use(pinia); // Add Pinia to the Vue app/
app.use(router);
app.use(Toast, options);

app.mount("#app");