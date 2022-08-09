<template>
  <div class="my-transform">
    <!-- 左侧 -->
    <div class="left-origin-list">
      <!-- 存在搜索 -->
      <my-transfer-list
        :listData="searchData"
        @select-change="(payload) => handleSelectChange(payload, 'right')"
        ref="leftSearchList"
        @search="handleSearch"
        :filterable="filterable"
        v-if="isSearch"
      ></my-transfer-list>
      <!-- 常规 -->
      <my-transfer-list
        v-else
        :listData="leftListData"
        @select-change="(payload) => handleSelectChange(payload, 'right')"
        ref="leftList"
        @search="handleSearch"
        :filterable="filterable"
      ></my-transfer-list>
    </div>
    <!-- 中间 -->
    <div class="center-operate-btn">
      <center-operate-btn-group
        :left-disabled="leftDisabled"
        :right-disabled="rightDisabled"
        @btn-click="handleBtnClick"
      ></center-operate-btn-group>
    </div>
    <!-- 右侧 -->
    <div class="right-filter-list">
      <my-transfer-list
        :listData="rightListDta"
        @select-change="(payload) => handleSelectChange(payload, 'left')"
        ref="rightList"
      ></my-transfer-list>
    </div>
  </div>
</template>

<script>
import MyTransferList from "./MyTransferList.vue";
import CenterOperateBtnGroup from "./CenterOperateBtnGroup.vue";
export default {
  components: {
    MyTransferList,
    CenterOperateBtnGroup,
  },
  props: {
    // 穿梭框数据
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    // 选中数据
    checkData: {
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
      // 原始数据
      originList: this.data,
      // 右侧数据
      rightListDta: [],
      // 向右禁用
      leftDisabled: true,
      // 向左禁用
      rightDisabled: true,
      // 左边选中数据
      leftCheckData: [],
      // 右边选中数据
      rightCheckData: [],
      // 搜索关键词
      searchValue: "",
      // 搜索数据
      searchData: [],
    };
  },

  mounted() {
    // 初始化右侧选中数据
    this.filterRightListData();
  },
  computed: {
    // 左侧列表数据
    leftListData: {
      get() {
        return this.originList.filter((orginItem) => {
          return !this.rightListDta.find(
            (rightListItem) => rightListItem.key == orginItem.key
          );
        });
      },
    },
    // 是否搜索
    isSearch() {
      return this.searchValue.trim().length > 0;
    },
  },
  methods: {
    // 初始化右侧数据
    filterRightListData() {
      this.rightListDta = this.originList.filter((orginItem) => {
        return this.checkData.find(
          (checkDataItemKey) =>
            checkDataItemKey == orginItem.key && !orginItem.disabled
        );
      });
    },
    // 选中项变化(根据选中项长度决定是否禁用按钮)
    handleSelectChange({ status, checkedData }, pos) {
      if (pos == "left") {
        this.leftDisabled = !status;
        this.leftCheckData = checkedData;
        this.$emit("right-check-change", checkedData);
      } else {
        this.rightDisabled = !status;
        this.rightCheckData = checkedData;
        this.$emit("left-check-change", checkedData);
      }
    },
    // 中间两个按钮点击
    handleBtnClick(type) {
      switch (type) {
        case "left":
          this.rightListDta = this.rightListDta.filter((rightListItem) => {
            return !this.leftCheckData.find(
              (leftCheckDataItem) => rightListItem.key == leftCheckDataItem.key
            );
          });

          this.$refs.rightList.clearCheckData();
          break;
        case "right":
          this.rightListDta = [...this.rightListDta, ...this.rightCheckData];
          this.$refs.leftList?.clearCheckData();
          this.$emit("on-change", this.rightListDta);
          // 存在搜索关键词的时候，重新计算左侧筛选数据
          if (this.searchValue) {
            this.searchData = this.searchData.filter((searchDataItem) => {
              return !this.rightCheckData.find(
                (checkDtaItem) => searchDataItem.key == checkDtaItem.key
              );
            });
            this.$refs.leftSearchList?.clearCheckData();
          }
          break;
      }
    },
    // 搜索
    handleSearch(value) {
      this.searchValue = value;
      this.searchData = this.leftListData.filter(
        (item) => item.label.indexOf(value) != -1
      );
    },
  },
};
</script>

<style lang="less">
.my-transform {
  display: flex;
  align-items: center;
}
</style>
