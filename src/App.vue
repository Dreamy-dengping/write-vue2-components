<template>
  <div class="app">
    <div class="flex">
      <!-- 常规用法：带本地搜索 -->
      <!-- <div class="item">
        <h2>常规用法：带本地搜索</h2>
        <my-select
          @on-change="handleChange"
          v-model="currentFood"
          placeholder="请选择食品"
          filterable
          clearable
        >
          <my-option
            v-for="item in options"
            :key="item.value"
            :value="item.label"
            :label="item.label"
            :disabled="item.disabled"
          ></my-option>
        </my-select>
      </div> -->
      <!-- 下拉组件 -->
      <div class="item">
        <!-- 高级用法：带远程搜索 -->
        <!-- 高级用法：带远程搜索
        <my-select
          v-model="currentSearchValue"
          :loading="loading"
          filterable
          remote
          :remote-method="remoteMethod"
          :remote-data-list="options2"
          :maxHeight="200"
          @on-change="handleChange"
        >
          <my-option
            v-for="item in options2"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></my-option>
        </my-select> -->
      </div>
      <!-- 穿梭框组件 -->
      <!-- <div class="item" :style="{ height: 300 + 'px' }">
        <my-transfer
          :data="transferData"
          @on-change="handleTransferChange"
          :check-data="valueList"
          @left-check-change="leftCheckChange"
          @right-check-change="rightCheckChange"
          filterable
        ></my-transfer>
      </div> -->
      <!-- 分页组件 -->
      <div class="item">
        <!-- <my-page
          :total="1332"
          :current="1"
          :page-size="10"
          :show-total="true"
          :show-sizer="true"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
          :page-size-opts="[10, 20, 30, 40]"
        ></my-page> -->
      </div>
      <!-- <div class="item">
        iview 组件库的
        <Page :total="1332" />
      </div>
      <div class="item">
        iview 组件库的
        <el-pagination background layout="prev, pager, next" :total="1200">
        </el-pagination>
      </div> -->
      <!-- Icon组件 -->
      <div class="item">
        <!-- <my-icon type="icon-cb-putongyonghu" color="red" :size="30"></my-icon>
        <my-icon type="icon-fenlei" color="blue" :size="40"></my-icon>
        <my-icon type="icon-zaixian" color="green" :size="50"></my-icon>
        <my-icon type="icon-guanliyuan" :size="60"></my-icon> -->
      </div>
      <!-- Dropdown组件 -->
      <div class="item">
        <my-dropdown
          @on-click="handleItemClick"
          trigger="click"
          placement="bottom"
        >
          <a href="javascript:void(0)"> 下拉菜单 </a>
          <my-dropdown-menu slot="list">
            <my-dropdown-item
              v-for="item in drowdownList"
              :divided="item.isDivided"
              :disabled="item.isDisabled"
              :name="item.label"
              >{{ item.label }}</my-dropdown-item
            >
          </my-dropdown-menu>
        </my-dropdown>
      </div>
      <!-- <div class="item">
        <Dropdown
          trigger="click"
          placement="top-start"
          style="margin-left: 20px"
        >
          <a href="javascript:void(0)">
            click 触发
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div> -->
    </div>
  </div>
</template>

<script>
import MySelect from "./components/MySelect/MySelect.vue";
import MyOption from "./components/MySelect/MyOption.vue";
import MyPage from "./components/MyPage/MyPage.vue";
import { MyTransfer } from "./components/MyTransfer";
import { MyIcon } from "@/components/MyIcon";
import { MyDropdown, MyDropdownItem } from "@/components/MyDropdown";
export default {
  components: {
    MySelect,
    MyOption,
    MyTransfer,
    MyPage,
    MyIcon,
    MyDropdownItem,
    MyDropdown,
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },

        {
          value: "选项3",
          label: "蚵仔煎",
          disabled: true,
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
          disabled: true,
        },
        {
          value: "选项6",
          label: "杂酱面",
        },
      ],
      currentFood: "黄金糕",
      // 加载中
      loading: false,
      // 搜索关键词
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      // 处理关键词后的数据
      list: [],
      options2: [],
      currentSearchValue: "",
      transferData: [
        {
          key: 0,
          label: "备选项0",
          disabled: false,
        },
        {
          key: 1,
          label: "备选项1",
          disabled: false,
        },
        {
          key: 2,
          label: "备选项2",
          disabled: false,
        },
        {
          key: 3,
          label: "备选项3",
          disabled: true,
        },
        {
          key: 4,
          label: "备选项4",
          disabled: true,
        },
        {
          key: 5,
          label: "备选项5",
          disabled: false,
        },
        {
          key: 6,
          label: "备选项6",
          disabled: true,
        },
        {
          key: 7,
          label: "备选项7",
          disabled: true,
        },
        {
          key: 8,
          label: "备选项8",
          disabled: false,
        },
        {
          key: 9,
          label: "备选项9",
          disabled: false,
        },
        {
          key: 10,
          label: "备选项10",
          disabled: false,
        },
        {
          key: 11,
          label: "备选项11",
          disabled: false,
        },
        {
          key: 12,
          label: "备选项12",
          disabled: false,
        },
        {
          key: 13,
          label: "备选项13",
          disabled: false,
        },
        {
          key: 14,
          label: "备选项14",
          disabled: false,
        },
        {
          key: 15,
          label: "备选项15",
          disabled: false,
        },
      ],
      valueList: [1, 2, 5, 6],
      drowdownList: [
        {
          label: "驴打滚",
          id: 1,
        },
        {
          label: "炸酱面",
          id: 2,
        },
        {
          label: "豆汁儿",
          id: 3,
          isDivided: true,
        },
        {
          label: "北京烤鸭",
          id: 4,
        },
        {
          label: "冰糖葫芦",
          id: 5,
          isDisabled: true,
        },
      ],
    };
  },
  mounted() {
    // 初始化搜索数据
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    // 下拉变化
    handleChange(value) {
      console.log(value);
    },
    // 远程搜索
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options2 = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    //
    handleTestClick() {
      this.$emit("onChange");
    },
    // 穿梭框变化
    handleTransferChange(list) {
      console.log("change", list);
    },
    // 左边选中变化
    leftCheckChange(checkData) {
      console.log("left", checkData);
    },
    // 右边选中变化
    rightCheckChange(checkData) {
      console.log("right", checkData);
    },
    // 页码变更
    handlePageChange(page) {
      console.log("当前页码：" + page);
    },
    // 每页条数变化
    handlePageSizeChange(pageSize) {
      console.log("每页条数：" + pageSize);
    },
    // item项点击
    handleItemClick(name) {
      console.log("item点击name值为:" + name);
    },
  },
};
</script>

<style lang="less">
.app {
  padding: 20px;
  .flex {
    display: flex;
    margin-top: 500px;
    .item {
      margin: 0 20px;
    }
  }
}
</style>
