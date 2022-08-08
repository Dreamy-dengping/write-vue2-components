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
        </my-select> -->
      </div>
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
      <div class="item" :style="{height:300+'px'}">
        <my-transfer :data="transferData" @on-change="handleTransferChange" :check-data="valueList"></my-transfer>
      </div>
    </div>
  </div>
</template>

<script>
import MySelect from "./components/MySelect/MySelect.vue";
import MyOption from "./components/MySelect/MyOption.vue";
import {MyTransfer} from "./components/MyTransfer";
export default {
  components: { MySelect, MyOption ,MyTransfer},
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
      transferData:[
        {
          key:0,
          label:"备选项0",
          disabled:false
        },
        {
          key:1,
          label:"备选项1",
          disabled:false
        },
        {
          key:2,
          label:"备选项2",
          disabled:false
        },
        {
          key:3,
          label:"备选项3",
          disabled:true
        },
        {
          key:4,
          label:"备选项4",
          disabled:true
        },
        {
          key:5,
          label:"备选项5",
          disabled:false
        },
        {
          key:6,
          label:"备选项6",
          disabled:true
        },
        {
          key:7,
          label:"备选项7",
          disabled:true
        },
        {
          key:8,
          label:"备选项8",
          disabled:false
        },
        {
          key:9,
          label:"备选项9",
          disabled:false
        },
        {
          key:10,
          label:"备选项10",
          disabled:false
        },
        {
          key:11,
          label:"备选项11",
          disabled:false
        },
        {
          key:12,
          label:"备选项12",
          disabled:false
        },
        {
          key:13,
          label:"备选项13",
          disabled:false
        },
        {
          key:14,
          label:"备选项14",
          disabled:false
        },
        {
          key:15,
          label:"备选项15",
          disabled:false
        },
      ],
      valueList:[1,2,5,6]
    };
  },
  mounted() {
    // 初始化搜索数据
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
    this.$on("onChange", () => {
      console.log("测试出发了");
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
    handleTransferChange(list){
      console.log(list)
    }
  },
};
</script>

<style lang="less">
.app {
  padding: 20px;
  .flex {
    display: flex;
    .item {
      margin: 0 20px;
    }
  }
}
</style>
