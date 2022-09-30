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
        <div class="err-tip" v-if="required">必填项</div>
      </div>
    </div>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["formInstance"],
  props: {
    label: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: Number,
    },
    labelPosition: {
      type: String,
      default: "",
    },
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
    checkIsRequired() {
      if (this.prop) {
        let curFomItem = this.rule[this.prop];
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
    validate() {},
  },
  watch: {
    mode: {
      deep: true,
      handler() {},
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
</style>
