<template>
  <div class="my-transfer-list">
    <!-- 头部 -->
    <div class="head-bar">
      <div class="left-check-all">
        <check-box
          @change="handleSelectAll"
          :checked="checkedData.length == excludeDisbledListDataLength"
          >列表</check-box
        >
      </div>
      <div class="right-num-count">
        <span class="num-count-span">{{ checkedData.length }}</span>
        <span class="num-count-span">/</span>
        <span class="num-count-span">{{ excludeDisbledListDataLength }}</span>
      </div>
    </div>
    <!-- 主体列表 -->
    <ul class="transfer-list-body" v-if="listData.length">
      <li
        :class="['transfer-list-item', item.disabled ? 'disabled-item' : '']"
        v-for="item in listData"
        :key="item.key"
      >
        <check-box
          :disabled="item.disabled"
          @change="(checked) => handlleListImteChange(checked, item)"
          :checked="
            checkedData.find((data) => data == item) && !item.disabled
              ? true
              : false
          "
          >{{ item.label }}</check-box
        >
      </li>
    </ul>

    <!-- 空状态 -->
    <div class="transfer-empty" v-else>暂无数据</div>
  </div>
</template>

<script>
import CheckBox from "./CheckBox.vue";
export default {
  components: { CheckBox },
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      checkedData: [],
    };
  },
  computed: {
    // 排除禁用项后的长度
    excludeDisbledListDataLength() {
      return this.listData.filter((item) => !item.disabled).length;
    },
  },
  methods: {
    // 单个itemcheckbox状态变更
    handlleListImteChange(checked, data) {
      checked
        ? this.checkedData.push(data)
        : (this.checkedData = this.checkedData.filter(
            (item) => item.key != data.key
          ));
      // 发布选中项变化事件
      this.$emit("select-change", {
        status: this.checkedData.length > 0,
        checkedData: this.checkedData,
      });
    },
    // 全选或者不全选
    handleSelectAll(checked) {
      checked
        ? (this.checkedData = this.listData.filter((item) => !item.disabled))
        : (this.checkedData = []);
      // 发布选中项变化事件
      this.$emit("select-change", {
        status: this.checkedData.length > 0,
        checkedData: this.checkedData,
      });
    },
    // 清空checkdata当点击移走按钮时
    clearCheckData() {
      this.checkedData = [];
    },
  },
};
</script>

<style lang="less">
.my-transfer-list {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  vertical-align: middle;
  width: 200px;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
  color: #afb0b4;

  .head-bar {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    color: #000;
    padding: 0 15px;
    .num-count-span {
      font-size: 12px;
      color: #909399;
    }
  }
  .transfer-list-body,
  .transfer-empty {
    height: 246px;
    overflow: auto;
  }
  .transfer-empty {
    text-align: center;
    line-height: 35px;
  }
  .transfer-list-item {
    padding: 0 15px;
    color: #606266;
    line-height: 30px;
  }
  .transfer-list-item.disabled-item {
    cursor: not-allowed;
  }
}
</style>
