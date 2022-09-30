<template>
  <div class="app">
    <div class="box">其他页面元素</div>
    <Affix :offset-top="100" @on-change="onChange">
      <div class="menu">
        <h2>系统菜单</h2>
        <ul>
          <li>图书管理</li>
          <li>用户管理</li>
          <li>机构管理</li>
          <li>订单管理</li>
          <li>日志管理</li>
          <li>统计管理</li>
          <li>销售管理</li>
        </ul>
      </div>
    </Affix>
  </div>
</template>

<script>
import Affix from "./components/Affix/index";
export default {
  components: {
    Affix,
  },

  methods: {
    onChange(status) {
      console.log(status);
    },
  },
};
</script>

<style lang="less">
.app {
  height: 2000px;
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
