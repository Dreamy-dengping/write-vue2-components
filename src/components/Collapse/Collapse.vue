<template>
  <div class="g-collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 是否手风琴效果
    accordion: {
      type: Boolean,
      default: false,
    },
    // v-model绑定的值，具体展开哪一个面板
    value: {
      type: String,
      default: "",
    },
  },
  // 将当前实例注入到子组件
  provide() {
    return {
      collapseInstace: this,
    };
  },
  data() {
    return {
      childrenVnode: [],
    };
  },
  methods: {
    setChildPanelStatus(panelInstance) {
      // 组建市使用v-model组件上的原理
      this.$emit("input", panelInstance.name);
      this.$emit("change", panelInstance.name);
    },
  },
  mounted() {
    this.childrenVnode = this.$slots.default;
  },
  watch: {
    value() {
      console.log(this.value);
      for (let i = 0; i < this.childrenVnode.length; i++) {
        this.childrenVnode[i].child.handleCllapseStatus(this.value);
      }
    },
  },
};
</script>

<style lang="less">
.g-collapse {
  border-bottom: 1px solid #dcdee2;
}
</style>
