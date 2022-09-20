<template>
  <div class="page detail">
    <p>详情页面</p>
    <button @click="$router.back()">返回home页面</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="less">
.detail {
  background-color: #008c8c;
  button {
    background-color: pink;
  }
}
</style>
