<template>
  <div
    class="carousel"
    :style="{ height: height + 'px' }"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <!--S 主体内容 -->
    <slot></slot>
    <!--E 主体内容 -->

    <!--S 指示器 -->
    <div class="carousel-indicator-wrap" v-if="showIndicator">
      <carousel-indicator
        :length="len"
        :currentIndex="currentIndex"
        @carouselIndicatorChange="carouselIndicatorChange"
      ></carousel-indicator>
    </div>
    <!--E 指示器 -->

    <!--S 切换箭头 -->
    <transition-group name="arrow-animate">
      <carousel-arrow
        v-if="currentArrowStatus && showArrow"
        @click="arrowChange('prev')"
        class="left-arrow arrow"
        key="prev"
        >&lt;</carousel-arrow
      >
      <carousel-arrow
        v-if="currentArrowStatus && showArrow"
        @click="arrowChange('next')"
        class="right-arrow arrow"
        key="next"
        >&gt;</carousel-arrow
      >
    </transition-group>

    <!--E 切换箭头 -->
  </div>
</template>

<script>
import Pubsub from "./utils";
import CarouselIndicator from "./CarouselIndicator.vue";
import CarouselArrow from "./CarouselArrow.vue";
export default {
  components: { CarouselIndicator, CarouselArrow },
  props: {
    // 高度
    height: {
      type: Number,
      default: 300,
    },
    // 初始显示项
    initialIndex: {
      type: Number,
      default: 0,
    },
    // 指示器的触发方法
    trigger: {
      type: String,
      default: "click",
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 自动播放时间间隔
    interval: {
      type: Number,
      default: 3000,
    },
    // 是否显示左右箭头
    showArrow: {
      type: Boolean,
      default: false,
    },
    // 是否显示指示器
    showIndicator: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: this.initialIndex || 0,
      timer: null,
      len: this.$slots.default.length,
      currentArrowStatus: false,
    };
  },
  mounted() {
    this.autoPlay();
  },
  methods: {
    // 自动轮播
    autoPlay() {
      this.timer = setInterval(() => {
        this.handlePlay();
      }, this.interval);
    },
    /**
     * @Description 轮播逻辑
     * 轮播的下标在[0,lenght-1]之前，超出下标之后，要重置
     **/
    handlePlay(type) {
      switch (type) {
        case "prev":
          this.currentIndex--;
          if (this.currentIndex < 0) {
            this.currentIndex = this.len - 1;
          }
          //发布更新事件
          Pubsub.notice("updateCurrentIndex", this.currentIndex);
          break;
        case "next":
        default:
          this.currentIndex++;
          if (this.currentIndex >= this.len) {
            this.currentIndex = 0;
          }
          //发布更新事件
          Pubsub.notice("updateCurrentIndex", this.currentIndex);
          break;
      }
      // 切换后发布change事件，告知用户
      this.$emit("change", this.currentIndex);
    },
    // 切换箭头点击触发
    arrowChange(type) {
      this.handlePlay(type);
    },
    // 鼠标进入
    handleMouseEnter() {
      this.stopInterval();
      this.currentArrowStatus = true;
    },
    // 鼠标离开
    handleMouseLeave() {
      this.autoPlay();
      this.currentArrowStatus = false;
    },
    // 指示器点击切换
    carouselIndicatorChange(index) {
      this.currentIndex = index;
      //发布更新事件
      Pubsub.notice("updateCurrentIndex", this.currentIndex);
    },
    // 清除定时器
    stopInterval() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
  beforeDestroy() {
    // 销毁前清空订阅的事件和定时器
    this.clearInterval();
    Pubsub.clearEventQueen();
  },
};
</script>

<style lang="less">
.carousel {
  overflow: hidden;
  position: relative;
  width: 100%;
  overflow: hidden;
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .left-arrow {
    left: 10px;
  }
  .right-arrow {
    right: 10px;
  }
  .carousel-indicator-wrap {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
  .arrow-animate-enter-active,
  .arrow-animate-leave-active {
    transition: opacity 0.3s;
  }
  .arrow-animate-enter,
  .arrow-animate.leave-top {
    opacity: 0;
  }
}
</style>
