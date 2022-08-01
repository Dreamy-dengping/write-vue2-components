import { checkArriveBottom } from "./utils";
export default {
  install(Vue) {
    Vue.directive("infinite-scroll", {
      // 指令在插入的时候会执行一次
      inserted: function (el, binding, vnode) {
        const fn = binding.value;
        const context = vnode.context;
        let timer = null;
        // 指令的值必须是一个函数，我们好执行回调
        if (typeof fn != "function") {
          throw new Error("指令value必须为函数");
        }
        // 事件处理函数
        function handleScroll() {
          // 判断滚动条到达底部了，才开始执行回调
          if (checkArriveBottom(el)) {
            // 执行回调的时候，要把this指向组件实例
            fn.bind(context)();
          }
        }
        // 将滚动处理函数挂载到对应组件实例上面，便于组件更新的时候，对设置了loading和complate属性进行移除事件绑定
        context.handleScroll = handleScroll;
        // 如果设置有immediate说明立即执行，则立即执行回调，知道将内容撑满内容区
        if (binding?.modifiers?.immediate) {
          timer = setInterval(() => {
            // 子元素的总高度大于设置指令的父级包裹元素就表示填满了可视区，停止加载
            const childScrollHeight = el.firstElementChild.scrollHeight;
            if (childScrollHeight >= el.clientHeight) {
              return clearInterval(timer);
            }
            handleScroll();
          }, 1500);
        }
        // 绑定滚动处理函数
        el.addEventListener("scroll", context.handleScroll);
      },
      //   组件更新的时候，会不断触发（最明显就是data中的响应式数据变化，会继续执行update方法）
      update(el, binding, vnode) {
        const context = vnode.context;
        // 如果加载中或者已经加载完了，就移除滚动事件
        if (
          (binding?.modifiers?.complated && context.complated) ||
          (binding?.modifiers?.loading && context.loading)
        ) {
          el.removeEventListener("scroll", context.handleScroll);
        } else {
          // 当loading和complate都是false的时候，表示可以继续加载
          el.addEventListener("scroll", context.handleScroll);
        }
      },
    });
  },
};
