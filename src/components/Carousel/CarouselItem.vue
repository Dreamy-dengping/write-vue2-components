<template>
  <transition name="carousel-item-animate">
    <!-- 只显示当前活跃项 -->
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
      /* 
      *为什么获取这些这么麻烦，因为我们组件内部需要的东西，需要我们自己想办法，组件使用者只需要关注配置
      */
      // 在App中我们绑定了每个item组件的key值，可以通过当前组件的vnode对象获取到
      key: this.$vnode.key,
      // 当前活跃项，我们需要获取到父组件当中Carousel的currentIndex
      currentIndex: this.$parent.currentIndex,
    };
  },
  mounted() {
    // 挂载的时候订阅更新当前活跃索引，然后更新数据，触发视图更新
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

/* 
*下面的是轮播过渡的重点，本质就是前一个组件像左边移动自身的长度，下一个显示的组件从右边距离自身100%的地方进来，然后过程加上动画
*/
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
