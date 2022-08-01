<template>
  <div id="app">
    <!-- S messagebox提示组件 -->
    <!-- <button @click="handleSuccess">成功</button>
    <button @click="handleWarning">警告</button>
    <button @click="handleDefault">消息</button>
    <button @click="handleError">错误</button> -->
    <!-- <button @click="handelVelocity">动画测试</button> -->
    <!-- E messagebox提示组件 -->

    <div class="test-date-picker">
      <!-- S 时间组件 -->
      <!-- <date-picker :date="date" @dateChange="dateChange"></date-picker> -->
      <!-- E 时间组件 -->

      <!--S 无限滚动 -->
      <!-- <div
        class="infinite-list"
        v-infinite-scroll.loading.complated.immediate="load"
        style="overflow: auto"
        ref="infiniteList"
      >
        <ul>
          <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
        </ul>
        <p v-if="loading && !complated" class="text">加载中...</p>
        <p v-if="complated" class="text">没有更多了</p>
      </div> -->
      <!--E 无限滚动 -->

      <!--S 编辑表格 -->
      <!-- <edit-table
        :tableDta="tableDta"
        :headData="headData"
        :allSelectTip="allSelectTip"
        :selectChange="handleSelectChange"
        :showEdit="showEdit"
      ></edit-table> -->
      <!--E 编辑表格 -->

      <!-- S 走马灯 -->
      <carousel
        :height="300"
        :initialIndex="2"
        trigger="click"
        :autoplay="true"
        :interval="2000"
        :showArrow="true"
        :showIndicator="true"
        @change="handleCarouselChange"
      >
        <carousel-item v-for="(item, index) in list" :key="index">
          <div class="img-item">
            <img :src="item.src" />
          </div>
        </carousel-item>
      </carousel>
      <!-- E 走马灯 -->
    </div>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import { DatePicker } from "./components/DatePicker/index";
import EditTable from "./components/EditTable/EditTable.vue";
import { Carousel, CarouselItem } from "./components/Carousel/index";
export default {
  name: "App",
  components: {
    DatePicker,
    EditTable,
    Carousel,
    CarouselItem,
  },
  data() {
    return {
      list: [
        {
          title: "第一项",
          complated: false,
          id: 1,
        },
        {
          title: "第二项",
          complated: false,
          id: 2,
        },
        {
          title: "第三项",
          complated: true,
          id: 3,
        },
      ],
      date: new Date(),
      show: false,
      count: 1,
      loading: false,
      complated: false,
      tableDta: [
        {
          id: 1,
          chinase: 123,
          math: 111,
          english: 98,
          chemistry: 56,
        },
        {
          id: 2,
          chinase: 100,
          math: 99,
          english: 123,
          chemistry: 88,
        },
        {
          id: 3,
          chinase: 134,
          math: 34,
          english: 98,
          chemistry: 76,
        },
        {
          id: 4,
          chinase: 56,
          math: 22,
          english: 123,
          chemistry: 111,
        },
      ],
      allSelectTip: {
        confirm: "全部选中",
        cancel: "取消全选",
      },
      headData: [
        {
          id: 1,
          title: "语文",
        },
        {
          id: 2,
          title: "数学",
        },
        {
          id: 3,
          title: "英语",
        },
        {
          id: 4,
          title: "化学",
        },
        {
          id: 5,
          title: "操作",
        },
      ],
      showEdit: true,
      list: [
        {
          id: 1,
          src: require("@/assets/img/01.webp"),
        },
        {
          id: 2,
          src: require("@/assets/img/02.webp"),
        },
        {
          id: 3,
          src: require("@/assets/img/03.webp"),
        },
        {
          id: 4,
          src: require("@/assets/img/04.webp"),
        },
      ],
    };
  },
  methods: {
    handleSuccess() {
      this.$message.success("这是一条成功消息");
    },
    handleWarning() {
      this.$message.warning("这是一条警告消息");
    },
    handleDefault() {
      this.$message.default("这是一条消息提示");
    },
    handleError() {
      this.$message.error("这是一条失败消息");
    },
    handelVelocity() {
      Velocity(document.body, { opacity: 0.5 });
    },
    handelDel(item) {
      dispatch(this)({
        type: ACTION_TYPES.del,
        payLoad: item,
      });
    },
    addTood(value) {
      dispatch(this)({
        type: ACTION_TYPES.add,
        payLoad: value,
      });
    },
    dateChange(date) {
      console.log(date);
    },
    handleAnimateTest() {
      // Velocity(
      //   this.$refs.pContent,
      //   {
      //     opacity: 0.5,
      //     height: 500,
      //     paddingLeft: 50,
      //     translateX: 200,
      //     translateY: 200,
      //   },
      //   { durantion: 500, loop: true }
      // );
      // Velocity(this.$refs.pContents, "slideUp", { durantion: 500 });
      this.show = !this.show;
    },
    handeEnter(el, done) {
      Velocity(el, "fadeIn", { durantion: 500, complete: done });
    },
    handeLeave(el, done) {
      Velocity(el, "fadeOut", { durantion: 500, complete: done });
    },
    load() {
      // 以下是定时器模拟异步数据请求，可根据自己的需求进行变更
      this.loading = true;
      setTimeout(() => {
        if (this.count >= 15) {
          this.complated = true;
          return;
        }
        this.count += 3;
        this.loading = false;
      }, 1000);
    },
    handleSelectChange(list) {
      console.log(list);
    },
    handleCarouselChange(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="less">
button {
  width: 40px;
  height: 25px;
  border: 1px solid #000;
  margin: 5px !important;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
}
#app {
  .test-date-picker {
    width: 500px;
    margin: 20px auto;
  }
  .velocity {
    width: 300px;
    height: 300px;
    background-color: aquamarine;
    color: #000;
    font-size: 24px;
    text-align: center;
    line-height: 300px;
  }
  .infinite-list {
    height: 300px;
    width: 500px;
    border: 1px solid red;
    li {
      height: 50px;
      background: #e8f3fe;
      margin: 10px;
      color: #7dbcfc;
      text-align: center;
      line-height: 50px;
    }
    .text {
      color: green;
      text-align: center;
      line-height: 50px;
    }
  }
  .img-item {
    img {
      width: 500px;
      height: 300px;
    }
  }
}
</style>
