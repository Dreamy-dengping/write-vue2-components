<template>
  <div class="edit-table">
    <!-- 表格数据 -->
    <table>
      <!-- 表头部分 -->
      <thead>
        <tr>
          <th v-if="showEdit">
          <!-- 表头checkbox组件:选中项的长度和表格数据长度一致的时候,表示全部全部选中 -->
            <check-box
              :text="checkBoxText"
              @change="handleAllChange"
              :checked="checkData.length == originData.length"
            ></check-box>
          </th>
          <th v-for="item in headData" :key="item.id">{{ item.title }}</th>
        </tr>
      </thead>
      <!-- 表格主体部分 -->
      <tbody>
        <tr v-for="item in originData" :key="item.id">
          <!-- 表格主体checkbox组件:当前列在选中项中说明选中了.反之没有 -->
          <td v-show="showEdit">
            <check-box
              :checked="checkData.some((data) => data.id == item.id)"
              @change="(checked) => handleItemChange(checked, item)"
            ></check-box>
          </td>
          <td v-for="subject in fieldList" :key="subject">
            {{ item[subject] }}
          </td>
          <!-- 删除当前列 -->
          <td><button @click="handleDel(item)">删除</button></td>
        </tr>
      </tbody>
    </table>
    <!-- 批量操作 -->
    <div class="operate-group">
      <button @click="handleBatchOperate('all')">全选</button>
      <button @click="handleBatchOperate('cancel')">取消</button>
      <button @click="handleBatchOperate('del')">删除</button>
    </div>
  </div>
</template>

<script>
// checkbox组件
import CheckBox from "./CheckBox";
export default {
  components: {
    CheckBox,
  },
  props: {
    // 表格数据
    tableDta: {
      type: Array,
      default() {
        return [];
      },
    },
    // 表头
    headData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 权限,反选文字
    allSelectTip: {
      type: Object,
      default() {
        return {};
      },
    },
    // 选中项变化需要执行的函数
    selectChange: {
      type: Function,
      default() {
        return () => {};
      },
    },
    // 是否需要显示第一列checkbox
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 保存选中项
      checkData: [],
      // 备份表格数据项
      originData: this.tableDta,
    };
  },
  computed: {
    // 动态计算全选,反选文字
    checkBoxText() {
      return this.checkData.length == this.originData.length
        ? this.allSelectTip.confirm
        : this.allSelectTip.cancel;
    },
    /**
     * @Description 表格需要渲染的字段
     *   {
          id: 1,
          chinase: 123,
          math: 111,
          english: 98,
          chemistry: 56,
        },
        我们需要排除id字段,id字段仅仅做key标识,不需要渲染到列表当中
     * 
     **/
    fieldList() {
      return this.tableDta.length
        ? Object.keys(this.tableDta[0]).filter((item) => item != "id")
        : [];
    },
  },
  methods: {
    //点列checkbox点击
    handleItemChange(checked, data) {
      if (checked) {
        // checkbox为true的时候,表示添加
        this.checkData = [...this.checkData, data];
      } else {
        // checkbox为true的时候,表示删除
        this.checkData = this.checkData.filter((item) => item.id != data.id);
      }
      // 执行用户传进来的监听选中项变化的函数
      this.selectChange(this.checkData);
    },
    // 所有checkbox点击
    handleAllChange(checked) {
      checked ? (this.checkData = [...this.originData]) : (this.checkData = []);
      // 执行用户传进来的监听选中项变化的函数
      this.selectChange(this.checkData);
    },
    // 删除单个
    handleDel(data) {
      // 过滤掉当前项
      this.originData = this.originData.filter((item) => data.id != item.id);
      // 同步选中项
      this.checkData = this.checkData.filter((item) => data.id != item.id);
    },
    // 批量删除
    batchDel() {
      // 循环选中项,执行过滤操作
      this.checkData.forEach((item) => {
        this.handleDel(item);
      });
    },
    // 批量操作
    handleBatchOperate(type) {
      switch (type) {
        case "all":
          this.handleAllChange(true);
          break;
        case "cancel":
          this.handleAllChange(false);
          break;
        case "del":
          this.batchDel();
          break;
      }
    },
  },
};
</script>

<style lang="less">
.edit-table {
  table {
    width: 500px;
    border-collapse: collapse;
    text-align: center;
  }
  table,
  tr,
  td,
  th {
    border: 1px solid #ccc;
  }
  .operate-group {
  }
}
</style>
