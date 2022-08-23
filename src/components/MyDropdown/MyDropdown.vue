<template>
  <div
    class="my-dropdown"
    @click.stop="trigger == 'click' ? (showMenu = !showMenu) : ''"
    @mouseenter="trigger == 'hover' ? (showMenu = true) : ''"
    @mouseleave="trigger == 'hover' ? (showMenu = false) : ''"
    ref="myDropDdown"
  >
    <div class="tip-text" ref="tipText">
      <slot></slot>
    </div>
    <slot name="list"></slot>
  </div>
</template>

<script>
import emitter from "./emitter";
export default {
  name: "MyDropdown",
  componentName: "MyDropdown",
  mixins: [emitter],
  props: {
    // 触发显示方式
    trigger: {
      type: String,
      default: "click",
    },
    // 下来菜单的出现位置（上方，下方）
    placement: {
      type: String,
      default: "bottom",
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["bottom", "top"].includes(value);
      },
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  mounted() {
    this.initEvent();
  },
  methods: {
    // 初始化
    initEvent() {
      this.$on("item-click", (params) => {
        this.$emit("on-click", params);
        this.showMenu = false;
      });
      this.handleEmptyDomElementClickBindThis =
        this.handleEmptyDomElementClick.bind(this);
      window.addEventListener("click", this.handleEmptyDomElementClickBindThis);
    },

    // 处理空白区域点击
    handleEmptyDomElementClick(e) {
      if (!Array.from(this.$refs.myDropDdown.childNodes).includes(e.target)) {
        this.showMenu = false;
      }
    },
  },
  beforeDestroy() {
    // 移除window上面的事件
    window.removeEventListener(this.handleEmptyDomElementClickBindThis);
  },
  watch: {
    showMenu() {
      this.broadcast("MyDropdownMenu", "set-menu-status", this.showMenu);
    },
  },
};
</script>

<style lang="less">
.my-dropdown {
  position: relative;
}
</style>
