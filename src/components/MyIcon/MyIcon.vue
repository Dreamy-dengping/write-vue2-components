<template>
  <i :class="selftClasses" :style="style"> </i>
</template>

<script>
const classPrefix = "my-icon";
export default {
  name: "MyIcon",
  props: {
    type: {
      type: String,
      default: "",
    },
    // 字体大小
    size: {
      type: Number,
      default: 16,
    },
    // 字体颜色
    color: {
      type: String,
      default: "",
    },
    // 自定义字体
    custom: {
      type: String,
      default: "",
    },
  },
  computed: {
    // style属性
    style() {
      return {
        fontSize: this.size ? this.size + "px" : "",
        color: this.color ? this.color : "",
      };
    },
    // class类名
    selftClasses() {
      return [
        classPrefix,
        this.type ? classPrefix + "-" + this.type : "",
        this.custom && !this.type ? this.custom : "",
      ];
    },
  },
};
</script>

<style lang="less"></style>
