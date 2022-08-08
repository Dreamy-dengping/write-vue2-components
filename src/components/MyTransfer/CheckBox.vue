<template>
  <label class="check-box-label">
    <input
      type="checkbox"
      :disabled="disabled"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less">
.check-box-label {
  input {
    margin-right: 5px;
  }
}
</style>
