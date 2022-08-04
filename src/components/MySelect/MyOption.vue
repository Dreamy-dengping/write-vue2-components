<template>
  <div
    :class="[
      'my-option-item',
      activeValue == $attrs.value ? 'active-item' : '',
      disabled ? 'disbled-item' : '',
    ]"
    @click.stop="handleOptionsClick"
  >
    <slot></slot>
  </div>
</template>

<script>
import Pubsub from "./utils";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeValue: this.$parent.activeValue,
    };
  },
  methods: {
    // item项点击
    handleOptionsClick() {
      // 禁用项点击，直接终止后续操作
      if (this.disabled) return;
      Pubsub.notice("onChange", this.$attrs.value || "");
    },
  },
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
