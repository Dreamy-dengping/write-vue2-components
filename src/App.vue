<template>
  <div class="app">
    <Form :mode="formValue" :rule="ruleCustom" :label-width="100" ref="form">
      <form-item label="姓名：" prop="name" :label-width="100">
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
        <button @click="handleSubmit('form')">提交</button>
        <button @click="handleCancel('form')">清除</button>
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
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
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
button {
  border: 1px solid #000;
  background-color: antiquewhite;
}
.app {
  width: 500px;
  margin: 20px auto;
}
.box {
  width: 500px;
  height: 500px;
  background-color: pink;
}
.menu {
  background-color: #000;
  color: #fff;
  width: 130px;
  text-align: center;
  line-height: 40px;
  ul {
    list-style: none;
    padding: 0 20px;
  }
}
</style>
