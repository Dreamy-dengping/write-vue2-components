<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  methods: {
    beforeEnter(el) {
      el.classList.add("collapse-transition");
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.overflow = "hidden";
      el.style.height = "0";
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },
    enter(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    },

    afterEnter(el) {
      el.classList.remove("collapse-transition");
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
    },

    beforeLeave(el) {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    },

    leave(el) {
      el.classList.add("collapse-transition");
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },

    afterLeave(el) {
      el.classList.remove("collapse-transition");
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    },
  },
};
</script>

<style lang="less">
.collapse-transition {
  transition: all 0.3s ease-in-out;
}
</style>
