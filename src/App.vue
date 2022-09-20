<template>
  <div class="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <!-- <transition name="slide-r">
      <router-view></router-view>
    </transition> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["transitionName"]),
  },
};
</script>

<style lang="less">
html,
#app,
body,
.page,
.app {
  // height: 100%;
  // width: 100%;
  color: #fff;
}
.app {
  position: relative;
}
.page {
  text-align: center;
  width: 100vw;
  button {
    color: #fff;
    width: 200px;
    height: 50px;
    margin-top: 300px;
  }
}
.slide-l-enter-active,
.slide-l-leave-active,
.slide-r-enter-active,
.slide-r-leave-active {
  transition: all 5s;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
.slide-l-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-l-enter-to,
.slide-l-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-l-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
//
.slide-r-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-r-enter-to,
.slide-r-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-r-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

//

// .slide-r-enter-active,
// .slide-r-leave-active,
// .slide-l-enter-active,
// .slide-l-leave-active {
//   transition: all .3s;
//   position: absolute;
//   height: 100%;
//   width: 100%;
// }
// .slide-l-enter {
//   opacity: 0;
//   transform: translateX(100%);
// }
// .slide-l-leave-active {
//   opacity: 0;
//   transform: translateX(-100%);
// }
// .slide-r-enter {
//   opacity: 0;
//   transform: translateX(-100%);
// }
// .slide-r-leave-active {
//   opacity: 0;
//   transform: translateX(100%);
// }
</style>
