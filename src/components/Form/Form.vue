<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      // 将form组件注入到子组件中
      formInstance: this,
    };
  },
  props: {
    // 表单提交对象
    mode: {
      type: Object,
      default() {
        return {};
      },
    },
    // 全局设置label的宽度，如果form-item组件有定义，则优先级高于当前设置的全局的
    labelWidth: {
      type: Number,
    },
    // 整体表单规则对象
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
        // 返回的是promise
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

