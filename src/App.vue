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
        <img v-lazy="curentImage" />
        <button @click="handleImageChange">切换</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
export default {
  components: {},
  data() {
    return {
      current: -1,
      list: [],
      curentImage: "",
    };
  },
  mounted() {
    this.getList();
    this.init();
    this.initToolTip();
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
    init() {},
    initToolTip() {
      const button = document.querySelector(".tool-tip");
      const tooltip = document.querySelector("#tooltip");
      createPopper(button, tooltip, {
        placement: "right",
      });
    },
    handleImageChange() {
      this.curentImage = require("./assets/img/02.webp");
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
</style>
