<template>
  <!-- 顶部的时间切换组件 -->
  <div class="date-picker-head">
    <div class="arrow-left">
      <!-- 上一年点击 -->
      <span class="last-year arrow" @click.stop="toogleDate('lastYear')"><<</span>
      <!-- 上一月点击 -->
      <span class="last-month arrow" @click.stop="toogleDate('lastMonth')"><</span>
    </div>
    <!-- 显示当前的年和月 -->
    <div class="date-content">{{ date[0] + "年" + date[1] + "月" }}</div>
    <div class="arrow-right">
      <!-- 下一月点击 -->
      <span class="next-month arrow" @click.stop="toogleDate('nextMonth')">></span>
      <!-- 下一年点击 -->
      <span class="next-year arrow" @click.stop="toogleDate('nextYear')">>></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 时间
    date: {
      type: Array,
      default() {
        return [new Date().getFullYear(), new Date().getMonth() + 1];
      },
    },
  },
  methods: {
    // 派发table事件处理逻辑，参数为当前td的时间，格式为2022-7-22
    toogleDate(type) {
      this.$emit("dateRangeChange", type);
    },
  },
};
</script>

<style lang="less">
.date-picker-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  .last-year,
  .next-month {
    margin-right: 15px;
  }
  .arrow {
    cursor: pointer;
  }
}
</style>
