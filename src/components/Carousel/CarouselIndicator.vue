<template>
  <div class="carousel-indicator">
    <span
      v-for="(item, index) in length"
      :key="index"
      :class="[currentIndex == index ? 'active' : '']"
      @click="$emit('carouselIndicatorChange', index)"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      default: 0,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="less">
.carousel-indicator {
  span {
    display: inline-block;
    width: 30px;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.4);
    margin: 0 5px;
    cursor: pointer;
  }
  span.active {
    background-color: #fff;
  }
}
</style>
