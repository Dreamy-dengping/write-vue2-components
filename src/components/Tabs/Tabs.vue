<template>
  <div class="gnip-tab">
    <div class="gnip-tab-nav">
      <div
        v-for="(item, index) in tabNavList"
        @click.stop="handleTabNavClick(item, index)"
        :class="['tab-nav-item', item.name == activeName ? 'active' : '']"
        ref="tabNavItemRefs"
      >
        <span v-if="item.text">{{ item.text }}</span>
        <render v-if="item.renderFun" :renderFn="item.renderFun"></render>
      </div>
    </div>
    <!-- 滚动滑块 -->
    <div class="tab-nav-track">
      <span
        class="track-line"
        :style="{ width: trackLineWidht + 'px', left: left + 'px' }"
      ></span>
    </div>
    <div class="tab-content-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Render from "./render";
export default {
  props: {
    value: {
      type: String,
    },
  },
  components: {
    Render,
  },
  data() {
    return {
      tabNavList: [],
      activeName: "",
      trackLineWidht: 0,
      currentIndex: 0,
      left: 0,
    };
  },
  mounted() {
    this.init();
  },
  computed: {},

  methods: {
    init() {
      this.activeName = this.value;
      this.$nextTick(() => {
        this.currentIndex = this.$children.findIndex(
          (component) => component.name == this.value
        );
        this.computedTrackWidth();
      });
    },
    setTabBar(tabsPaneInstance) {
      const label = tabsPaneInstance.label,
        type = typeof label;
      this.tabNavList.push({
        text: type == "function" ? "" : label,
        renderFun: type == "function" ? label : "",
        name: tabsPaneInstance.name,
      });
    },
    handleTabNavClick(item, index) {
      if (item.name == this.activeName) return;
      this.activeName = item.name;
      this.currentIndex = index;
      // 计算滚动滑块的宽度
      this.computedTrackWidth();
    },
    computedTrackWidth() {
      const tabNavItemRefsList = this.$refs.tabNavItemRefs;
      const scrollWidth = tabNavItemRefsList[this.currentIndex].scrollWidth;
      this.trackLineWidht = scrollWidth;
      this.left = tabNavItemRefsList[this.currentIndex].offsetLeft;
    },
  },
};
</script>

<style lang="less">
.gnip-tab {
  .gnip-tab-nav {
    display: flex;
    position: relative;
    .tab-nav-item {
      padding: 0 20px;
      cursor: pointer;
      line-height: 2;
    }
  }
  .tab-nav-item.active {
    // border-bottom: 1px solid red;
  }
  .tab-nav-track {
    width: 100%;
    position: relative;
    .track-line {
      height: 2px;
      background-color: green;
      position: absolute;
      transition: left 0.35s;
    }
  }
}
</style>
