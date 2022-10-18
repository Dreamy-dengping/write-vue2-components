<template>
  <div class="app">
    <div class="aline">
      <div class="item">
        <div class="img-wrap">
          <h2>全局window滚动</h2>
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <img v-lazy="item.src" />
            </li>
          </ul>
        </div>
      </div>
      <div class="item">
        <h2>带overflow父级内部滚动</h2>
        <div class="img-wrap scroll-wrap">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <img v-lazy.scroll="item.src" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <button @click="$router.push('/detail')">home</button> -->

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      current: -1,
      list: [],
      img: "",
    };
  },
  mounted() {
    this.getList();
    this.init();
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
}
.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
  margin: 20px;
}
.item {
  margin: 20px auto;
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
</style>
