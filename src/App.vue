<template>
  <div class="app">
    <Form :mode="formValue" :rule="ruleCustom" :label-width="100" ref="form">
      <form-item label="姓名：" prop="name" :label-width="100">
        <input type="text" v-model="formValue.name" placeholder="请输入姓名" />
      </form-item>
      <form-item
        label="年龄："
        prop="age"
        :rules="ruleCustom"
        :label-width="100"
        label-position="right"
      >
        <input type="text" v-model="formValue.age" placeholder="请输入年龄" />
      </form-item>
      <form-item>
        <button>提交</button>
        <button>清除</button>
      </form-item>
    </Form>
  </div>
</template>

<script>
import Schema from "async-validator";
import { Form, FormItem } from "./components/Form/index";
export default {
  components: { Form, FormItem },

  data() {
    return {
      formValue: {
        name: "小雅",
        age: 12,
      },
      ruleCustom: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        age: [
          {
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
        ],
      },
      labelPosition: {
        type: String,
        default: "right",
      },
    };
  },
  mounted() {
    const descriptor = {
      name: {
        type: "string",
        required: true,
        validator: (rule, value) => value === "muji",
      },
      age: {
        type: "number",
        asyncValidator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (value < 18) {
              reject("too young"); // reject with error message
            } else {
              resolve();
            }
          });
        },
      },
    };
    const validator = new Schema(descriptor);

    validator
      .validate({ name: "muji", age: 20 })
      .then(() => {
        console.log("成功");
      })
      .catch(({ errors, fields }) => {
        console.log(errors, fields);
      });
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
    handleReset(name) {
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
