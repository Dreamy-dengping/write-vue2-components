<template>
  <div :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  // Row组件的实例
  inject: ["rowInstance"],
  props: {
    // 所占具体空间份数
    span: {
      type: [String, Number],
    },
    // 对应弹性布局汇中的order属性
    order: {
      type: [String, Number],
    },
    // 偏移量
    offset: {
      type: [String, Number],
    },
    // 对应弹性布局flex属性
    flex: {
      type: [String, Number],
    },
    // 下面为响应式布局属性
    xs: {
      // <576px
      type: [String, Number],
    },
    sm: {
      // ≥576px
      type: [String, Number],
    },
    md: {
      // 	≥768px
      type: [String, Number],
    },
    lg: {
      // 	≥992px
      type: [String, Number],
    },
    xl: {
      // ≥1200px
      type: [String, Number],
    },
    xxl: {
      // 	≥1600px
      type: [String, Number],
    },
  },
  data() {
    return {};
  },
  computed: {
    colClass() {
      return [
        "g-col",
        this.xs ? `g-col-xs-${this.xs}` : "",
        this.sm ? `g-col-sm-${this.sm}` : "",
        this.md ? `g-col-md-${this.md}` : "",
        this.lg ? `g-col-lg-${this.lg}` : "",
        this.xl ? `g-col-xl-${this.xl}` : "",
        this.xxl ? `g-col-xxl-${this.xxl}` : "",
      ];
    },
    // style
    colStyle() {
      return {
        flex: this.span
          ? `calc(100% / 24 * ${this.span})`
          : this.flex
          ? this.flex
          : "",
        maxWidth: this.span ? `calc(100% / 24 * ${this.span})` : "none",
        paddingLeft: this.rowInstance.gutter / 2 + "px",
        paddingRight: this.rowInstance.gutter / 2 + "px",
        order: this.order * 1,
        marginLeft: this.offset ? `calc(100% / 24 * ${this.offset})` : "",
      };
    },
  },
};
</script>
