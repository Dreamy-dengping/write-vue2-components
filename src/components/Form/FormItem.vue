<template>
  <div :class="formItemClass">
    <div
      :class="formItemLabelClass"
      v-if="label"
      :style="computedLabeItemlStyle"
      ref="formItemLabel"
    >
      <span>{{ label }}</span>
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
// 导入async-validator表单验证插件
import Schema from "async-validator";
export default {
  // 接收form组件实例
  inject: ["formInstance"],
  provide() {
    return {
      // 将当前组件实例注入到下级子组件中，方便自定义封装的input checkbox datePicker等表单组件可以进行表单验证
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
    // 验证表单项字段
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // label的宽度（取值当前组件实例提供的labelWidth优先级高于form组件全局设置的labelWidth
      formCotentLeft: this.labelWidth || this.formInstance.labelWidth || 0,
      // 父组件传递过来的表单绑定值对象
      mode: {},
      // 父组件传递过来的rule规则对象
      rule: {},
      // 是否是必填项
      required: false,
      // 错误信息
      errorMessage: "",
      // label的高度
      labelHeight: 0,
    };
  },
  computed: {
    // label样式
    computedLabeItemlStyle() {
      return {
        width: this.labelWidth ? this.labelWidth + "px" : "",
        height: this.labelHeight + "px",
      };
    },
    // label类名
    formItemLabelClass() {
      return ["form-item-label", this.required ? "form-item-required" : ""];
    },
    // form表单项类名
    formItemClass() {
      return [
        "form-item",
        "form-item-" + (this.labelPosition ? this.labelPosition : "-default"),
      ];
    },
    //表单项内容区样式（包含表单组件和错误校验）
    formItemContent() {
      return {
        marginLeft: (this.formCotentLeft || 100) + "px",
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
        this.labelHeight = this.$refs.formItemLabel.parentNode.scrollHeight;
      });
      //将父组件规则保留到当前组件中
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
    // 验证表单(供form组件和自己内部调用)
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
    // 清空表单项(只需要将错误信息清空就行)
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
    display: flex;
    align-items: center;
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
.form-item-right {
  .form-item-label {
    justify-content: right;
  }
}
.form-item-left {
  .form-item-label {
    justify-content: left;
  }
}
.form-item-center {
  .form-item-label {
    justify-content: center;
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
.fade-content-leave-to {
  opacity: 0;
}
</style>
