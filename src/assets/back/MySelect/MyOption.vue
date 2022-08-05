<template>
  <div
    :class="[
      'my-option-item',
      activeValue == value ? 'active-item' : '',
      disabled ? 'disbled-item' : '',
    ]"
    @click.stop="handleOptionsClick"
  >
    <!-- 用户提供的插槽内容优先级更高 -->
    <slot v-if="$slots.default"></slot>
    <!-- 没提供插槽的时候，使用label占位 -->
    <span v-else>{{ label }}</span>
  </div>
</template>

<script>
import emitter from "./emitter";

export default {
  name: "MyOption",
  componentName: "MyOption",

  mixins: [emitter],
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // label
    label: {
      type: String,
      default: "",
    },
    // 绑定的value值
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 当前活跃项
      activeValue: this.$parent.activeValue,
    };
  },
  mounted() {
    // 订阅更新当前activeValue的事件
    this.$on("activeValueChange", (value) => {
      this.activeValue = value;
    });
  },
  methods: {
    // item项点击
    handleOptionsClick() {
      // 禁用项点击，直接终止后续操作
      if (this.disabled) return;
      this.dispatch("MySelect", "onChange", this.value || "");
    },
  },
  watch: {},
};
</script>

<style lang="less">
.my-option-item {
  width: 100%;
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #f5f7fa;
  }
}
// 点击活跃项
.my-option-item.active-item {
  font-weight: bold;
  color: #008c8c;
  background-color: #f5f7fa;
}
// 禁用项
.my-option-item.disbled-item {
  color: #c0c4cc;
  cursor: not-allowed;
}
// 禁用项滑过
.disbled-item:hover {
  background-color: #fff;
}
</style>
