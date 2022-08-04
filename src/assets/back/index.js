import MessageBox from "./MessageBox/index";
const componetns = [MessageBox];

export { MessageBox };

const messageQueen = [];
export default {
  install(Vue) {
    componetns.forEach((compoennt) => {
      Vue.component(compoennt.name, compoennt);
    });
    Vue.prototype.$message = {
      warning(message) {
        Vue.prototype.$show({ message, type: "warning" });
      },
      success(message) {
        Vue.prototype.$show({ message, type: "success" });
      },
      error(message) {
        Vue.prototype.$show({ message, type: "error" });
      },
      default(message) {
        Vue.prototype.$show({ message, type: "default" });
      },
    };
    Vue.prototype.$show = function (props) {
      // 向弹窗队列添加当前组件的偏移量(入栈)
      if (!messageQueen.length) {
        messageQueen.push(20);
      } else {
        messageQueen.push(messageQueen[messageQueen.length - 1] + 20 + 48);
      }
      /*
       *方法1：直接返回一个vnode组件虚拟dom也可以
       */
      // let MessageBoxConstructor = Vue.extend({
      //   render(h) {
      //     return h("message-box", {
      //       props: {
      //         ...props,
      //         show: true,
      //       },
      //     });
      //   },
      // });
      let MessageBoxConstructor = Vue.extend(MessageBox);
      // 方法2：实例化组件的时候传递配置项也是可以的
      let messageBoxInstance = new MessageBoxConstructor({
        // 向组件传递props数据，具体参考vue官方propsData
        propsData: {
          ...props,
          offset: !messageQueen.length
            ? 20
            : messageQueen[messageQueen.length - 1],
        },
      }).$mount();
      document.body.appendChild(messageBoxInstance.$el);
      // 显示弹窗（增加过渡效果）
      messageBoxInstance.setShow(true);
      setTimeout(() => {
        // 当前弹窗出栈
        messageQueen.shift();
        // 销毁弹窗（增加过渡效果）
        messageBoxInstance.setShow(false);
      }, 1500);
    };
  },
};
