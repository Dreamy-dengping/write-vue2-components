<template>
  <div class="edit-table">
    <table>
      <thead>
        <tr>
          <th v-if="showEdit">
            <check-box
              v-model="allSelect"
              :text="checkBoxText"
              @change="handleAllChange"
            ></check-box>
          </th>
          <th v-for="item in headData" :key="item.id">{{ item.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in originData" :key="item.id">
          <td v-show="showEdit">
            <check-box
              v-model="item.checked"
              @change="(checked) => handleItemChange(checked, item)"
            ></check-box>
          </td>
          <td v-for="subject in fieldList" :key="subject">
            {{ item[subject] }}
          </td>
          <td><button @click="handleDel(item)">删除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CheckBox from "./CheckBox";
export default {
  components: {
    CheckBox,
  },
  props: {
    tableDta: {
      type: Array,
      default() {
        return [];
      },
    },
    headData: {
      type: Array,
      default() {
        return [];
      },
    },
    allSelectTip: {
      type: Object,
      default() {
        return {};
      },
    },
    selectChange: {
      type: Function,
      default() {
        return () => {};
      },
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkData: [],
      allSelect: false,
      originData: this.tableDta.map((item) => {
        return {
          ...item,
          checked: false,
        };
      }),
    };
  },
  computed: {
    checkBoxText() {
      return this.allSelect
        ? this.allSelectTip.confirm
        : this.allSelectTip.cancel;
    },
    fieldList() {
      return this.tableDta.length
        ? Object.keys(this.tableDta[0]).filter((item) => item != "id")
        : [];
    },
  },
  methods: {
    handleItemChange() {
      this.checkData = this.originData.filter((item) => item.checked);
      this.selectChange(this.checkData);
      this.allSelect = this.checkData.length == this.originData.length;
    },
    setOriginList(checked) {
      this.originData = this.originData.map((item) => {
        return {
          ...item,
          checked,
        };
      });
    },
    handleAllChange(checked) {
      checked ? (this.checkData = [...this.originData]) : (this.checkData = []);
      this.selectChange(this.checkData);
      this.setOriginList(checked);
    },
    handleDel(data) {
      this.originData = this.originData.filter((item) => data.id != item.id);
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
}
</style>
