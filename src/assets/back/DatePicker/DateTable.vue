<template>
  <div class="date-table">
    <!-- 时间表格 -->
    <table>
      <!-- 顶部的星期组件 -->
      <date-picker-week-bar></date-picker-week-bar>
      <!-- 下方的6*7的月份天数组件 -->
      <date-picker-day-content
        :list="list"
        @dateChange="dateChange"
      ></date-picker-day-content>
    </table>
  </div>
</template>

<script>
import DatePickerWeekBar from "./DatePickerWeekBar.vue";
import DatePickerDayContent from "./DatePickerDayContent.vue";
export default {
  props: {
    // 表格数据
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    DatePickerWeekBar,
    DatePickerDayContent,
  },
  methods: {
    // 派发td天数点击事件，参数为当前天数的时间格式为 2022-07-22
    dateChange(date) {
      this.$emit("dateChange", date);
    },
  },
};
</script>

<style lang="less">
.date-table {
  font-size: 12px;
}
</style>
