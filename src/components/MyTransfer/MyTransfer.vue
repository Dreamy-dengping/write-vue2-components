<template>
  <div class="my-transform">
    <!-- 左侧 -->
    <div class="left-origin-list">
      <my-transfer-list
        :listData="leftListData"
        @select-change="(payload) => handleSelectChange(payload, 'right')"
        ref="leftList"
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
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    checkData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      originList: this.data,
      rightListDta: [],
      // 向右禁用
      leftDisabled: true,
      // 向左禁用
      rightDisabled: true,
      // 左边选中数据
      leftCheckData: [],
      // 右边选中数据
      rightCheckData: [],
    };
  },

  mounted() {
    this.filterRightListData();
  },
  computed: {
    leftListData() {
      return this.originList.filter((orginItem) => {
        return !this.rightListDta.find(
          (rightListItem) => rightListItem.key == orginItem.key
        );
      });
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
      console.log(checkedData);
      if (pos == "left") {
        this.leftDisabled = !status;
        this.leftCheckData = checkedData;
      } else {
        this.rightDisabled = !status;
        this.rightCheckData = checkedData;
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
          this.$refs.leftList.clearCheckData();
          break;
      }
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
