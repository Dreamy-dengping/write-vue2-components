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
  methods: {
    // 全部验证
    async validate(callback) {
      let isValidatePass = true;
      for (let i = 0; i < this.$slots.default.length; i++) {
        const validateFn = this.$slots.default[i].child.validate;
        // 进行表单验证
        try {
          await validateFn();
        } catch (e) {
          // 当有一项不满足的时候就通知外部
          isValidatePass = false;
        }
      }
      if (isValidatePass) {
        //说明没有问题
        callback(true);
      } else {
        callback(false);
      }
    },
    // 清除表单验证
    resetFields() {
      for (let i = 0; i < this.$slots.default.length; i++) {
        const resetFieldsFn = this.$slots.default[i].child.resetFields;
        // 清空表单规则
        resetFieldsFn()
      }
    },
  },
};
</script>

<style lang="less"></style>
