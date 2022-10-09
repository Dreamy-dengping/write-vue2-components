<template>
  <div class="app">
    <Form :mode="formValue" :rule="ruleCustom" :label-width="100" ref="form">
      <form-item
        label="姓名："
        prop="name"
        :label-width="100"
        label-position="right"
      >
        <Input type="text" v-model="formValue.name" placeholder="请输入姓名" />
      </form-item>
      <form-item
        label="年龄："
        prop="age"
        :label-width="100"
        label-position="right"
      >
        <Input type="text" v-model="formValue.age" placeholder="请输入年龄" />
      </form-item>
      <form-item label="家庭住址：" :label-width="100" label-position="right">
        <Input
          type="text"
          v-model="formValue.address"
          placeholder="请输入家庭住址"
        />
      </form-item>
      <form-item>
        <button class="btn primary" @click="handleSubmit('form')">提交</button>
        <button class="btn" @click="handleCancel('form')">清除</button>
      </form-item>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem } from "./components/Form/index";
import Input from "./components/Input";
export default {
  components: { Form, FormItem, Input },
  data() {
    return {
      formValue: {
        name: "小明",
        age: 12,
        address: "四川省成都市",
      },
      ruleCustom: {
        name: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value.length) {
                callback(new Error("必填项!"));
              }
              if (value.length < 5) {
                callback(new Error("姓名最少5个字符!"));
              }
              if (!/[a-zA-Z]/.test(value)) {
                callback(new Error("姓名包含英文字母!"));
              }
              callback();
            },
          },
        ],
        age: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, callback) => {
              if (!value.length) {
                callback(new Error("必填项!"));
              }
              if (value * 1 < 15) {
                callback(new Error("太年轻!"));
              }
              if (!Number.isInteger(value * 1)) {
                callback(new Error("姓名必须是数字!"));
              }
              if (value * 1 > 100) {
                callback(new Error("年龄最多100!"));
              }
              callback();
            },
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("成功");
        } else {
          this.$Message.error("失败");
        }
      });
    },
    handleCancel(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>

<style lang="less">
input {
  border: 1px solid #000;
  width: 100%;
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 20px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  user-select: none;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
}
.primary {
  background-color: #008c8c;
  color: #fff;
}
.app {
  width: 500px;
  margin: 20px auto;
}

</style>
