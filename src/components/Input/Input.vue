<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="gnip-input"
    @input="handleInput"
    :value="value"
    @change="handleChange"
    @blur="handleBlur"
  />
</template>

<script>
export default {
  inject: ["formInstance", "formItemInstance"],
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    value: {},
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
      // 触发表单验证
      this.formItemInstance.validate("input", e.target.value);
    },
    handleBlur(e) {
      this.$emit("blur", e.target.value);
      // 触发表单验证
      this.formItemInstance.validate("blur", e.target.value);
    },
    handleChange(e) {
      this.$emit("change", e.target.value);
      // 触发表单验证
      this.formItemInstance.validate("change", e.target.value);
    },
  },
};
</script>

<style lang="less">
.gnip-input {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 14px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  &:focus {
    border-color: #33a3a3;
    outline: 0;
    box-shadow: 0 0 0 2px rgb(0 140 140 / 20%);
  }
}
</style>
