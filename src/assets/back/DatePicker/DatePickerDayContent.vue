<template>
  <tbody class="date-picker-day-content">
    <tr v-for="(item, index) in list" :key="index">
      <td
        v-for="(subItem, index) in item"
        :key="index"
        :class="[
          subItem.disbled ? 'disble-item' : 'day-item',
          subItem.active ? 'active' : '',
          subItem.index == currentDay ? 'active-click' : '',
        ]"
        @click="handleDayClick(subItem)"
      >
        {{ subItem.value }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentDay: -1,
    };
  },
  methods: {
    // 处理天的表格点击，触发关闭时间控件面板，设置时间input的值
    handleDayClick(item) {
      if (item.currentDay == item.index) return;
      this.currentDay = item.index;
      this.$emit("dateChange", item.date);
    },
  },
};
</script>

<style lang="less">
.date-picker-day-content {
  td {
    width: 40px;
    height: 40px;
    color: #606266;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
  }
  .disble-item {
    cursor: not-allowed;
    color: #c0c4cc;
  }
  .day-item.active {
    color: #008c8c;
    font-weight: bold;
  }
  .day-item.active-click {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #008c8c;
  }
}
</style>
