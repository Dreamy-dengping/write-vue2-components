<template>
  <div class="my-transfer-list">
    <!-- 头部 -->
    <div class="head-bar">
      <div class="left-check-all">
        <check-box
          @change="handleSelectAll"
          :checked="
            checkedData.length == excludeDisbledListDataLength &&
            checkedData.length > 0
          "
          :disabled="listData.every((item) => item.disabled)"
          >列表</check-box
        >
      </div>
      <div class="right-num-count">
        <span class="num-count-span">{{ checkedData.length }}</span>
        <span class="num-count-span">/</span>
        <span class="num-count-span">{{ excludeDisbledListDataLength }}</span>
      </div>
    </div>
    <!-- 可搜索 -->
    <div class="search-input" v-if="filterable">
      <input type="text" placeholder="请输入搜索内容" @input="handleSearch" />
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
    // 列表数据
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 选中数据
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
      // 告知外部选中项变化
      this.$emit("select-change", {
        status: this.checkedData.length > 0,
        checkedData: this.checkedData,
      });
    },
    // 执行搜索
    handleSearch(e) {
      this.$emit("search", e.target.value);
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
  .search-input {
    padding: 0 15px;
    margin: 15px 0;
    input {
      height: 32px;
      width: 100%;
      font-size: 12px;
      display: inline-block;
      box-sizing: border-box;
      border-radius: 16px;
      padding-right: 10px;
      padding-left: 30px;
      border: 1px solid #dcdfe6;
      &:focus {
        outline: none;
        border-color: #409eff;
      }
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
