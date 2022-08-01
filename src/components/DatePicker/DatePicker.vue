<template>
  <div class="date-picker-wrap">
    <div class="date-eidtor">
      <!-- 显示时间的input -->
      <input
        type="text"
        :placeholder="placeholder"
        class="date-edit-input"
        v-model="currentDate"
        @click.stop="showDatePannel = !showDatePannel"
      />
    </div>
    <!-- 面包通过过渡组件包裹，实现显示隐藏友好过渡 -->
    <transition name="date-picker">
      <div class="date-pocker-panel" v-show="showDatePannel">
        <!-- 时间控件的头部，用户切换年月 -->
        <date-picker-head
          @dateRangeChange="dateRangeChange"
          :date="curDate"
        ></date-picker-head>
        <!-- 主要的时间显示列表组件，用于显示对应月份的时间 -->
        <date-table :list="list" @dateChange="dateChange"></date-table>
      </div>
    </transition>
  </div>
</template>

<script>
import { genarateDayData } from "./utils";
import DatePickerHead from "./DatePickerHead.vue";
import DateTable from "./DateTable.vue";

export default {
  components: {
    DatePickerHead,
    DateTable,
  },
  props: {
    // 输入框提示
    placeholder: {
      type: String,
      default: "选择时间",
    },
    // 时间，为Date类型，默认为当前时间
    date: {
      type: Date,
      default() {
        return new Date();
      },
    },
  },
  data() {
    return {
      // 用于控制面包显示与隐藏
      showDatePannel: false,
      // 表格数据
      list: [],
      // 处理props时间为数组格式[年，月]
      curDate: [this.date.getFullYear(), this.date.getMonth() + 1],
      // 用户input显示时间
      currentDate: "",
    };
  },
  mounted() {
    // 获取当前月份的时间数据
    this.getDateList();
    // 除开时间组件的其他地方点击，关闭时间面板
    window.addEventListener("click", () => {
      this.showDatePannel = false;
    });
  },
  methods: {
    // 监听每个td时间项点击
    dateChange(date) {
      this.$emit("dateChange", date);
      this.showDatePannel = false;
      this.currentDate = date;
    },
    // 头部年月切换
    dateRangeChange(type) {
      switch (type) {
        // 上一年点击
        case "lastYear":
          this.curDate = [this.curDate[0] - 1, this.curDate[1]];
          break;
        // 上一月点击（月份<1,就要返回到上一年的12月份）
        case "lastMonth":
          this.curDate = [
            this.curDate[1] - 1 <= 0 ? this.curDate[0] - 1 : this.curDate[0],
            this.curDate[1] - 1 <= 0 ? 12 : this.curDate[1] - 1,
          ];
          break;
        // 下一年点击
        case "nextYear":
          this.curDate = [this.curDate[0] + 1, this.curDate[1]];
          break;
        case "nextMonth":
          // 下一月点击（月份>12,就要到下一年的一月份）
          this.curDate = [
            this.curDate[1] + 1 > 12 ? this.curDate[0] + 1 : this.curDate[0],
            this.curDate[1] + 1 > 12 ? 1 : this.curDate[1] + 1,
          ];
          break;
      }
      this.getDateList();
    },
    // 通过props传递的时间，组装成长度为42的数组,具体看utils文件下下面的这个方法
    getDateList() {
      this.list = genarateDayData(this.curDate);
    },
  },
};
</script>

<style lang="less">
.date-picker-wrap {
  position: relative;
  .date-pocker-panel {
    position: absolute;
    left: 0;
    top: 50px;
    width: 324px;
    height: 343px;
    color: #606266;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    padding: 12px;
    text-align: center;
  }
  .date-eidtor {
    width: 220px;
    .date-edit-input {
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
    }
  }

  .date-picker-enter-active,
  .date-picker-leave-active {
    transition: all 0.25s ease;
  }
  .date-picker-enter,
  .date-picker-leave-to {
    opacity: 0;
    height: 0;
  }
}
</style>
