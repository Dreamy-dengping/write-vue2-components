<template>
  <thead class="date-picker-week-bar">
    <tr>
      <th v-for="item in weekList" :key="item">{{ item }}</th>
    </tr>
  </thead>
</template>

<script>
import { weekList } from "./constant.js";
export default {
  data() {
    return {
      weekList,
    };
  },
};
</script>

<style lang="less">
.date-picker-week-bar {
  th {
    width: 42px;
    height: 42px;
    color: #606266;
    font-weight: 400;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
