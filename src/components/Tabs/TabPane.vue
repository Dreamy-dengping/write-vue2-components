<template>
  <div class="gnip-tabs-pane">
    <transition :name="paneTransitionName">
      <div class="tab-pane-content" v-show="$parent.activeName == name">
        <slot name="default"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Function],
    },
    name: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paneTransitionName: "enter-right",
    };
  },
  components: {
    TabPane: {
      render() {
        return this.$slots.default;
      },
    },
  },
  created() {
    this.$parent.setTabBar(this);
  },
  methods: {},
};
</script>

<style lang="less">
.gnip-tabs-pane {
  overflow-x: hidden;
  .enter-right-enter-active {
    transition: transform 0.35s;
  }
  .enter-right-enter {
    transform: translateX(100%);
  }
  .enter-right-to {
    transform: translateX(0);
  }
}
</style>
