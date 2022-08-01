<template>
  <div class="carousel-arrow" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<style lang="less">
.carousel-arrow {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  cursor: pointer;
}
</style>
