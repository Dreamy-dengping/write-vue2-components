<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      formInstance: this,
    };
  },
  props: {
    mode: {
      type: Object,
      default() {
        return {};
      },
    },
    labelWidth: {
      type: Number,
    },
    rule: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less"></style>
