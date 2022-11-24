import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "@/assets/iconfont/ionicons.less";
import router from "./router/index";
import store from "./store/index";
// 导入插件
import vLazy from "./components/v-lazy";

import gnipLoad from "gnip-vue2-lazy-load"
Vue.use(gnipLoad)
// Vue.use(vLazy);
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.prototype.$bus = new Vue();
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

Vue.config.productionTip = false;
