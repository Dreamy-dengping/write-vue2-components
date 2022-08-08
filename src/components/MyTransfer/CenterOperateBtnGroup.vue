<template>
  <div class="operate-group">
    <button
      class="btn btn-left"
      :disabled="leftDisabled"
      @click="handBtnClick('left')"
    >
      &lt; 到左边
    </button>
    <button
      class="btn btn-right"
      :disabled="rightDisabled"
      @click="handBtnClick('right')"
    >
      到右边 &gt;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    leftDisabled: {
      type: Boolean,
      default: false,
    },
    rightDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handBtnClick(type) {
     
      this.$emit("btn-click", type);
    },
  },
};
</script>

<style lang="less">
.operate-group {
  padding: 0 30px;
  .btn {
    display: inline-block;
    line-height: 1;
    cursor: pointer;
    border: 1px solid #409eff;
    color: #fff;
    background-color: #409eff;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .btn[disabled] {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
    cursor: not-allowed;
  }
  .btn-right {
    margin-left: 20px;
  }
}
</style>
