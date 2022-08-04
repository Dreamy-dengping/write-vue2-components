<template>
  <transition name="back-up-fade">
    <div
      class="back-top"
      :style="{
        bottom: bottom + 'px',
        right: right + 'px',
      }"
      @click.stop="handleBackTopClick($event)"
      v-if="show"
    >
      <div class="back-text-contaner">
        <!-- 提供了插槽显示插槽内容 -->
        <slot v-if="$slots.default"></slot>
        <!-- 没提供,使用默认的 -->
        <div class="default-text" v-else>UP</div>
      </div>
    </div>
  </transition>
</template>

<script>
// 导入节流函数
import { throttle } from "./utils";
export default {
  props: {
    // 触发滚动的容器
    target: {
      type: String,
      default: "",
    },
    // 滚动高度达到此参数值才出现
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    // 控制其显示位置, 距离页面右边距
    right: {
      type: Number,
      default: 40,
    },
    // 控制其显示位置, 距离页面底部距离
    bottom: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      // 滚动容器
      container: null,
      // 是否显示
      show: false,
      // 定时器标识
      timer: null,
      // 包裹元素节点
      el: "",
    };
  },
  mounted() {
    //节流处理，避免频繁触发事件
    this.throttleHandleContanierScroll = throttle(
      this.handleContanierScroll,
      200,
      false
    );
    this.init();
  },
  methods: {
    init() {
      // 默认滚动元素为document
      this.container = document;
      this.el = document.documentElement;
      // 外部传入滚动包裹元素时候
      if (this.target) {
        const el = document.querySelector(this.target);
        el ? (this.container = el && (this.el = el)) : null;
      }
      console.log(this.container);
      this.container.addEventListener(
        "scroll",
        this.throttleHandleContanierScroll,
        false
      );
    },
    // 回到顶部点击
    handleBackTopClick(e) {
      // 给回到顶部一定过度事件
      this.timer = setInterval(() => {
        this.scrollToTop();
      }, 16);
      // 通知用户
      this.$emit("backUpClick", e);
    },
    // 滚动事件
    handleContanierScroll() {
      // 滚动超出给定高度则显示，否则隐藏
      if (this.el.scrollTop > this.visibilityHeight) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    // 滚动到顶部
    scrollToTop() {
      if (this.el.scrollTop > 0) {
        this.el.scrollTop -= 50;
      } else {
        clearInterval(this.timer);
      }
    },
  },
  beforeDestroy() {
    // 销毁定时器
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="less">
.back-top {
  position: fixed;
  background-color: rgb(235, 248, 226);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  cursor: pointer;
  z-index: 5;
}
.back-up-position {
  position: relative;
}

// 过度动画
.back-up-fade-enter-active {
  transition: opacity 0.3s linear;
}
.back-up-fade-enter {
  opacity: 0;
}
.back-up-leave-to {
  opacity: 0;
}
</style>
