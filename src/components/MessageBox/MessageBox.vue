<template>
  <transition
    name="fade-in"
    mode="out-in"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <!-- <div
      :class="['message-box', 'message-box-' + type]"
      v-if="show"
      :style="{ transform: 'translate(-50%,' + offset + 'px)' }"
    >
      <p>{{ message }}</p>
    </div> -->
    <div
      :class="['message-box', 'message-box-' + type]"
      v-if="show"
      :style="{ top: offset + 'px' }"
    >
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  name: "MessageBox",
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "default",
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    setShow(status) {
      this.show = status;
    },

    beforeEnter: function (el) {
      el.style.opacity = 0;
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1 }, { duration: 300 }, { complete: done });
    },
    leave: function (el, done) {
      Velocity(
        el,
        {
          top: 0,
          opacity: 0,
        },
        { duration: 300, easing: "ease-in" },
        { complete: done }
      );
    },
  },
};
</script>

<style lang="less">
.message-box {
  width: 380px;
  height: 48px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  top: 20px;
  line-height: 48px;
  padding-left: 20px;
}
.message-box-default {
  background-color: #edf2fc;
  color: #cccc;
}
.message-box-success {
  background-color: #bcdbae;
  color: green;
}
.message-box-warning {
  background-color: #fdf6ec;
  color: orange;
}
.message-box-error {
  background-color: #f3f0f0;
  color: red;
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-in-enter,
.fade-in-leave-to {
  top: 0;
  opacity: 0;
  transform: translate(-50%, 0);
}
</style>
