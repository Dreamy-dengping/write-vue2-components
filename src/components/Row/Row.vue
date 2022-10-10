<template>
  <div class="g-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  // 将Row组件注入到col组件中
  provide() {
    return {
      rowInstance: this,
    };
  },
  props: {
    // 间隙
    gutter: {
      type: [String, Number],
    },
    // 对应弹性布局justify-content
    justify: {
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return [
          "start",
          "end",
          "center",
          "space-around",
          "space-between",
        ].includes(value);
      },
    },
    // 对应弹性布局中align-items
    align: {
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["flex-start", "center", "flex-end", "stretch"].includes(value);
      },
    },
  },
  computed: {
    // style属性
    rowStyle() {
      return {
        marginLeft: -this.gutter / 2 + "px",
        marginRight: -this.gutter / 2 + "px",
        justifyContent: this.justify,
        alignItems: this.align,
      };
    },
  },
};
</script>

<style lang="less">
.g-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
