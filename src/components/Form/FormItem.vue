<template>
  <div :class="formItemClass">
    <div
      :class="formItemLabelClass"
      v-if="label"
      :style="computedStyle"
      ref="formItemLabel"
    >
      {{ label }}
    </div>
    <div class="form-item-content" :style="formItemContent">
      <slot></slot>
      <div class="form-item-error-content">
        <transition name="fade-content">
          <div class="err-tip" v-if="errorMessage.length">
            {{ errorMessage }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["formInstance"],
  provide() {
    return {
      formItemInstance: this,
    };
  },
  props: {
    // 表单标签
    label: {
      type: String,
      default: "",
    },
    // 标签宽度
    labelWidth: {
      type: Number,
    },
    // 标签位置
    labelPosition: {
      type: String,
      default: "",
    },
    // 验证表单
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formCotentLeft: this.labelWidth || 0,
      mode: {},
      rule: {},
      required: false,
      errorMessage: "",
    };
  },
  computed: {
    computedStyle() {
      return { width: this.labelWidth ? this.labelWidth + "px" : "" };
    },
    formItemLabelClass() {
      return ["form-item-label", this.required ? "form-item-required" : ""];
    },
    formItemClass() {
      return [
        "form-item",
        "form-item-" + this.labelPosition ? this.labelPosition : "default",
      ];
    },
    formItemContent() {
      return {
        marginLeft: this.formCotentLeft + "px",
        textAlign: this.labelPosition,
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 设置label的宽度
      this.$nextTick(() => {
        this.formCotentLeft = this.$refs.formItemLabel
          ? this.$refs.formItemLabel.scrollWidth
          : 0;
      });
      //将父组件保留到当前组件中
      this.mode = this.formInstance.mode;
      this.rule = this.formInstance.rule;
      // 判断当前项是否是必填项
      this.checkIsRequired();
    },
    // 检测是否是必填项，必填项加*号
    checkIsRequired() {
      if (this.prop) {
        let curFomItem = this.rule[this.prop] || [];
        if (curFomItem) {
          for (let i = 0; i < curFomItem.length; i++) {
            if (curFomItem[i].required) {
              this.required = true;
              break;
            }
          }
        }
      }
    },
    // 验证表单
    async validate(type) {
      return new Promise(async (resolve, reject) => {
        let formItemValidate = [];
        let formItemRule = this.rule[this.prop] || [];
        if (type) {
          formItemValidate = formItemRule.filter(
            (item) => item.trigger == type
          );
        } else {
          formItemValidate = formItemRule;
        }
        // 单个表单验证
        let formItemValidateLen = formItemValidate.length;
        if (formItemValidateLen > 0) {
          // 进行表单验证
          let validateCount = 0;
          for (let i = 0; i < formItemValidateLen; i++) {
            const validator = new Schema({
              [this.prop]: formItemValidate[i],
            });
            try {
              // 验证成功
              await validator.validate({
                [this.prop]: this.$parent.mode[this.prop],
              });
              this.errorMessage = "";
              validateCount++;
            } catch ({ errors, fields }) {
              // 验证失败
              this.errorMessage = errors[0].message;
              break;
            }
          }
          // 说明所有表单项的验证规则校验正确
          if (validateCount == formItemValidateLen) {
            resolve();
          } else {
            reject();
          }
        } else {
          resolve();
        }
      });
    },
    // 清空表单项
    resetFields() {
      this.errorMessage = "";
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.form-item {
  margin-bottom: 24px;
  .form-item-label {
    float: left;
    padding: 0 12px;
    line-height: 1;
    vertical-align: middle;
    position: relative;
  }
  .form-item-error-content {
    position: relative;
    .err-tip {
      position: absolute;
      left: 0;
      top: 0;
      color: red;
    }
  }
}
.form-item-required:before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 14px;
  color: #ed4014;
}
.form-item.form-item-right {
  .form-item-label {
    text-align: right;
  }
}
.fade-content-enter-active,
.fade-content-leave-active {
  transition: opacity 0.25s;
}
.fade-content-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
