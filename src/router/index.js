import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("../pages/Home.vue"),
      meta: {
        index: 1,
      },
    },
    {
      path: "/detail",
      component: () => import("../pages/Detail.vue"),
      meta: {
        index: 2,
      },
    },
  ],
});

// 设置路由切换动画
Vue.prototype.setoRouteTransitionName = function (to, from) {
  let transitionName = "";
  if (to.meta.index > from.meta.index) {
    transitionName = "slide-l"; // 向左滑动
  } else if (to.meta.index < from.meta.index) {
    // 由次级到主级
    transitionName = "slide-r";
  } else {
    transitionName = ""; // 同级无过渡效果
  }
  store.commit("setTransitionName", transitionName);
};
router.beforeEach((to, from, next) => {
  Vue.prototype.setoRouteTransitionName(to, from);
  next();
});
export default router;
