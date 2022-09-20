<template>
  <div class="page home">
    <p>首页</p>
    <button @click="$router.push('/detail')">到detial页面</button>
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
.home {
  background-color: pink;
  button {
    background-color: green;
  }
}
</style>
