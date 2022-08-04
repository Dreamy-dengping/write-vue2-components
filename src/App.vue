<template>
  <div class="app">
    <my-select
      @on-change="handleChange"
      v-model="value"
      placeholder="请选择食品"
      :disabled="false"
      filterable
      clearable
    >
      <my-option
        v-for="item in options"
        :key="item.value"
        :value="item.label"
        :disabled="item.disabled"
        >{{ item.label }}</my-option
      >
    </my-select>
  </div>
</template>

<script>
import MySelect from "./components/MySelect/MySelect.vue";
import MyOption from "./components/MySelect/MyOption.vue";
export default {
  components: { MySelect, MyOption },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },

        {
          value: "选项3",
          label: "蚵仔煎",
          disabled: true,
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
          disabled: true,
        },
        {
          value: "选项6",
          label: "杂酱面",
        },
      ],
      value: "黄金糕",
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less">
.app {
  padding: 20px;
}
</style>
