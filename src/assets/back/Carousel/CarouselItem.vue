<template>
  <transition name="carousel-item-animate">
    <div class="carousel-item" v-if="key == currentIndex">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Pubsub from "./utils";
export default {
  data() {
    return {
      key: this.$vnode.key,
      currentIndex: this.$parent.currentIndex,
    };
  },
  mounted() {
    Pubsub.subscribe("updateCurrentIndex", (...arg) => {
      // 参数为当前活跃索引
      this.currentIndex = arg[0];
    });
  },
};
</script>

<style lang="less">
.carousel-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
// 离开进入中
.carousel-item-animate-enter-active,
.carousel-item-animate-leave-active {
  transition: all 0.3s linear;
}
// 进入初始状态
.carousel-item-animate-enter {
  transform: translateX(100%);
}
// 进入后
.carousel-item-animate-enter-to {
  transform: translateX(0);
}
//离开后的状态
.carousel-item-animate-leave-to {
  transform: translateX(-100%);
}
</style>
