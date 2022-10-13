<template>
  <div class="g-collapse-panel-item" @click.stop="handlePanelItemClick">
    <div class="title">
      <i :class="['arrow', status ? 'arrow-open' : '']"></i>
      <slot></slot>
    </div>
    <transition-collapse>
      <div class="content" v-show="status">
        <div class="inner-content">
          <slot name="content"></slot>
        </div>
      </div>
    </transition-collapse>
  </div>
</template>

<script>
import { TransitionCollapse } from "../TransitionCollapse";
export default {
  // 父组件实例
  inject: ["collapseInstace"],
  props: {
    // 当前面板标识
    name: {
      type: [String, Number],
    },
  },
  data() {
    return {
      status: false,
    };
  },
  components: { TransitionCollapse },
  methods: {
    // 点击折叠状态交给父组件处理
    handlePanelItemClick() {
      this.$parent.toggle(this);
    },
    // 根据初始状态的value，设置展开项
    init() {
      if (this.name == this.collapseInstace.value) {
        this.status = true;
      }
    },
  },
  mounted() {
    // 初始化
    this.init();
  },
};
</script>

<style lang="less">
.g-collapse-panel-item {
  margin-bottom: -1px;
  .title {
    height: 38px;
    line-height: 38px;
    padding-left: 36px;
    color: #666;
    cursor: pointer;
    position: relative;
    border: 1px solid #dcdee2;
    background-color: #f7f7f7;
  }
  .content {
    padding: 16px 36px;
    border-left: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
  }
  .arrow {
    width: 10px;
    height: 10px;
    border: 1px solid #666;
    border-left: none;
    border-bottom: none;
    left: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    transform-origin: center center;
    transition: transform 0.3s;
    position: absolute;
  }
  .arrow-open {
    transform: translateY(-50%) rotate(135deg);
  }
}
</style>
