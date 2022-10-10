<template>
  <div class="app">
    <div class="row">
      <Row :gutter="100" align="bottom" justify="end">
        <Col span="6" order="4"><div class="content one">1</div></Col>
        <Col span="6" order="3"><div class="content two">2</div></Col>
        <Col span="6" order="6"><div class="content three">3</div></Col>
      </Row>
    </div>
    <div class="row">
      <Row>
        <Col :xs="24" :sm="4" :md="2" :lg="8" :xxl="24"
          ><div class="content one">1</div></Col
        >
        <Col :xs="24" :sm="16" :md="12" :lg="8" :xxl="24"
          ><div class="content two">2</div></Col
        >
        <Col :xs="24" :sm="4" :md="6" :lg="8" :xxl="24"
          ><div class="content three">3</div></Col
        >
      </Row>
    </div>
  </div>
</template>

<script>
import { Row, Col } from "./components/Row/index.js";
export default {
  components: { Row, Col },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
input {
  border: 1px solid #000;
  width: 100%;
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 20px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  user-select: none;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
}
.primary {
  background-color: #008c8c;
  color: #fff;
}
.row {
  width: 70%;
  margin: 20px auto;
  border: 1px solid #000;
  overflow: hidden;
  height: 300px;
  .content {
    height: 30px;
    line-height: 30px;
  }
  .one {
    background-color: pink;
  }
  .two {
    background-color: #008c8c;
  }
  .three {
    background-color: greenyellow;
  }
  .four {
    background-color: rgb(122, 122, 218);
  }
}
</style>
