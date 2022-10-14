<template>
  <div class="app">
    <div class="aline">
      <div class="item">
        <h2>水平拖拽</h2>
        <div class="demo-split">
          <Split v-model="split1">
            <div slot="left" class="demo-split-pane">Left Pane</div>
            <div slot="right" class="demo-split-pane">Right Pane</div>
          </Split>
        </div>
      </div>
      <div class="item">
        <h2>垂直拖拽</h2>
        <div class="demo-split">
          <Split v-model="split2" mode="vertical">
            <div slot="top" class="demo-split-pane">Top Pane</div>
            <div slot="bottom" class="demo-split-pane">
              Bottom Pane
            </div>
          </Split>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Split } from "./components/Split/index";
export default {
  components: {
    Split,
  },
  data() {
    return {
      split1: 0.1,
      split2: 0.21,
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
.aline {
  display: flex;
}
.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
  margin: 20px;
}
.item {
  width: 50%;
  h2 {
    font-weight: bold;
    text-align: center;
  }
}
.demo-split-pane {
  padding: 10px;
}
</style>
