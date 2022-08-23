<template>
<!-- 涉及到高度，位移，过渡使用js钩子函数的方式比较好处理些 -->
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    v-bind:css="false"
  >
    <div class="my-dropdown-menu" v-if="showMeune" ref="myDroupdownMenu">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import emitter from "./emitter";
export default {
  name: "MyDropdownMenu",
  componentName: "MyDropdownMenu",
  mixins: [emitter],
  data() {
    return {
      showMeune: false,
      timer: null,
    };
  },
  mounted() {
    this.$on("set-menu-status", (status) => {
      this.showMeune = status;
    });
  },
  methods: {
    beforeEnter: function (el) {
      // 初始化
      el.style.opacity = 0;
      el.style.transform = "scaleY(0)";
      el.style.transformOrigin = "top center";
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      const htmlClientHeight = document.documentElement.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollHeight = el.scrollHeight;
      const { bottom } = el.getBoundingClientRect();
      // 说明底部高度不够显示菜单了,这时候我们需要调整菜单朝上面显示
      if (htmlClientHeight - bottom < scrollHeight) {
        el.style.transformOrigin = "bottom center";
        el.style.top = -(scrollHeight + 20) + "px";
      } else {
        if (this.$parent.placement == "top") {
          el.style.transformOrigin = "bottom center";
          el.style.top = -(scrollHeight + 20) + "px";
        } else {
          el.style.top = offsetTop + "px";
        }
      }
      el.style.transform = "scaleY(1)";
      el.style.opacity = 1;

      done();
    },
    // 回调函数 done 是可选的
    leave: function (el, done) {
      el.style.transform = "scaleY(0)";
      el.style.opacity = 0;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        done();
      }, 250);
    },
  },
};
</script>

<style lang="less">
.my-dropdown-menu {
  min-width: 100px;
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
  z-index: 900;
  transform-origin: top center;
  position: absolute;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
</style>
