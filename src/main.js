import Vue from "vue";
import App from "./App.vue";
import "tailwindcss/tailwind.css";
Vue.config.productionTip = false;
import myUi from "./components/index";
import vInfiniteScroll from "./components/v-infinite-scroll";
import ElementUI from "element-ui";
import VueCookies from "vue-cookies";
import "element-ui/lib/theme-chalk/index.css";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ElementUI);
Vue.use(vInfiniteScroll);
Vue.use(ViewUI);
Vue.prototype.$bus = new Vue();
Vue.use(myUi);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
