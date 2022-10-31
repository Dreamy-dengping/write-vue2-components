<template>
  <div class="app">
    <div class="aline">
      <!-- <div class="item">
        <div class="img-wrap">
          <h2>全局window滚动</h2>
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <img v-lazy="item.src" />
            </li>
            <li></li>
          </ul>
        </div>
      </div> -->
      <!-- <div class="aline">
        <div class="tool-tip">
          <button id="button" aria-describedby="tooltip">I'm a button</button>
          <div id="tooltip" role="tooltip">I'm a tooltip</div>
        </div>
      </div> -->
      <div class="aline">
        <Tabs v-model="tabName" show-track-bg>
          <TabPane label="首页" name="name1">首页</TabPane>
          <TabPane label="图书详情页" name="name2" disabled>图书详情页</TabPane>
          <TabPane label="个人主页" name="name3">个人主页</TabPane>
          <TabPane :label="labelRender" name="name4">购物车</TabPane>
        </Tabs>
      </div>
      <!-- <button @click="handleBtnClick">操作</button> -->
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import { Tabs, TabPane } from "@/components/Tabs";
export default {
  components: { Tabs, TabPane },
  data() {
    return {
      current: -1,
      list: [],
      curentImage: "",
      tabName: "name1",
      labelRender(h) {
        return h("div", "购物车");
      },
      show: true,
      showModal: false,
      last: "接维度",
    };
  },
  mounted() {
    // this.getList();
    // this.initToolTip();
  },
  methods: {
    handleCLick() {
      console.log(this.current++);
    },
    getList() {
      let res = [
        {
          id: Math.random(),
          src: require("./assets/img/01.webp"),
        },
        {
          id: Math.random(),
          src: require("./assets/img/02.webp"),
        },
        {
          id: Math.random(),
          src: require("./assets/img/03.webp"),
        },
        {
          id: Math.random(),
          src: 11,
        },
        {
          id: Math.random(),
          src: require("./assets/img/04.webp"),
        },
      ];
      this.list = [...res, ...res, ...res, ...res];
    },
    initToolTip() {
      const button = document.querySelector(".tool-tip");
      const tooltip = document.querySelector("#tooltip");
      createPopper(button, tooltip, {
        placement: "right",
      });
    },
    handleBtnClick() {
      this.show = !this.show;
    },
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
.aline {
  display: flex;
  justify-content: center;
}
.item {
  margin: 40px;
  img {
    width: 250px;
    height: 200px;
  }
  ul {
    margin: 0 auto;
    li {
      border: 1px solid red;
      height: 200px;
      width: 250px;
    }
  }
  .scroll-wrap {
    height: 500px;
    overflow: auto;
    position: relative;
  }
}
.tool-tip {
  width: 300px;
  height: 300px;
  border: 1px solid red;
}
#tooltip {
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 13px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
