<template>
  <div class="app">
    <div class="aline"></div>
  </div>
</template>

<script>
import { Anchor, AnchorLink } from "@/components/Tabs";
export default {
  components: { Anchor, AnchorLink },
  data() {
    return {};
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
</style>
