<template>
  <div class="app">
    <div class="table">
      <Table :data="data" :column="column">
        <template v-slot:operate="{ row, index }">
          <button>操作{{ index }}</button>
        </template>
      </Table>
    </div>
    <!-- <div class="table" :style="{width:800+'px'}">
      <Table  :columns="column" :data="data" border>
         <template v-slot:operate="{ row, index }">
           <button>操作{{index}}</button>
        </template>
      </my-table>
      </Table>
    </div> -->
  </div>
</template>

<script>
import { Table } from "@/components/Table";
export default {
  components: { Table },
  data() {
    return {
      data: [
        {
          id: 1,
          title:
            "小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰小杰",
          age: 12,
          sex: "男",
          address: "重庆",
          job: "教师",
        },
        {
          id: 2,
          title: "小明",
          age: 12,
          sex: "男",
          address: "四川",
          job: "教师",
        },
        {
          id: 3,
          title: "小雅",
          age: 12,
          sex: "女",
          address: "南宁",
          job: "程序员",
        },
        {
          id: 4,
          title: "小丽",
          age: 12,
          sex: "女",
          address: "北京",
          job: "学生",
        },
      ],
      column: [
        {
          title: "姓名",
          key: "title",
          width: "200",
          fixed: "left",
          resizable: true,
        },
        {
          title: "年龄",
          key: "age",
          resizable: true,
          width: "300",
        },
        {
          title: "性别",
          key: "sex",
          resizable: true,
          width: "200",
        },
        {
          title: "id",
          key: "id",

          resizable: true,
        },
        {
          title: "地址",
          key: "address",
          resizable: true,
        },
        {
          title: "职业",
          key: "job",
          resizable: true,
        },
        {
          title: "操作",
          slot: "operate",
          resizable: true,
        },
      ],
    };
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.app {
  padding: 20px;
  button {
    padding: 10px;
    background-color: #008c8c;
    color: #fff;
    margin: 20px 0;
  }
  .container {
    .operate {
      text-align: center;
    }
    .aline {
      width: 50%;
    }
    h2 {
      font-weight: bold;
      font-size: 20px;
    }
    .aline {
      &:nth-child(1) {
        margin-right: 20px;
      }
    }
    display: flex;
    justify-content: space-between;
  }
}
.table {
  width: 1000px;
  margin: 20px auto;
}
</style>
