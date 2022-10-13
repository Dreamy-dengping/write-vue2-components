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
      type: [String, Array],
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
      // panel组件实例数组
      childrenVnode: [],
      //选中的value集合
      activeList: [],
    };
  },
  methods: {
    // 每项点击的时候，处理函数
    toggle(panelInstance) {
      // 如果是手风琴开启，那么只展开当前项，其他的关闭
      if (this.accordion) {
        if (this.activeList.indexOf(panelInstance.name) > -1) {
          this.activeList = [];
        } else {
          this.activeList = [panelInstance.name];
        }
      } else {
        // 处理手风琴关闭的时候，点击的时候将状态置反
        if (this.activeList.indexOf(panelInstance.name) == -1) {
          this.activeList.push(panelInstance.name);
        } else {
          for (let i = 0; i < this.activeList.length; i++) {
            if (this.activeList[i] == panelInstance.name) {
              this.activeList.splice(i, 1);
              break;
            }
          }
        }
      }
      // 发布事件处理函数，便于用户检测当前活跃项变更（v-mode和@change）
      this.$emit("input", this.activeList);
      this.$emit("change", this.activeList);
    },
    // 设置子组件的折叠状态
    setPanelInstanceStauts() {
      const panelInstanceComponent = this.childrenVnode;
      for (let i = 0; i < panelInstanceComponent.length; i++) {
        if (this.activeList.indexOf(panelInstanceComponent[i].child.name) > -1) {
          panelInstanceComponent[i].child.status = true;
        } else {
          panelInstanceComponent[i].child.status = false;

        }
      }
    },
    // 设置活跃集合
    setValueActiveList() {
      if (!Array.isArray(this.value)) {
        this.activeList = [this.value];
      }
    },
  },
  mounted() {
    // 保存子组件的实例
    this.childrenVnode = this.$slots.default;
    this.setValueActiveList();
  },
  watch: {
    // value变化的时候，将其转化成数组形式
    value(){
      this.setValueActiveList();
    },
    // 活跃项变化，设置子菜单折叠状态
    activeList() {
      this.setPanelInstanceStauts();
    },
  },
};
</script>

<style lang="less">
.g-collapse {
  border-bottom: 1px solid #dcdee2;
}
</style>
