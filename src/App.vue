<template>
  <div>
    <div class="table" ref="table">
      <ul>
        <li v-for="(item, index) in imgList"><img v-lazy="item" /></li>
        <!-- <li v-for="(item, index) in imgList"><img v-lazy="item" /></li> -->
        <!-- <li v-for="(item, index) in imgList"><img v-lazy="item" /></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { Editor, Viewer } from "bytemd";
import gfm from "@bytemd/plugin-gfm";
const plugins = [
  gfm(),
  // Add more plugins here
];
export default {
  components: {
    Editor,
  },
  data() {
    return {
      plugins,
      imgList: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.imgList = [
        require("@/assets/img/01.webp"),
        require("@/assets/img/02.webp"),
        require("@/assets/img/03.webp"),
        require("@/assets/img/04.webp"),
        require("@/assets/img/banner1.png"),
        require("@/assets/img/banner2.png"),
        require("@/assets/img/flower-banner.png"),
      ];
    }, 3000);
  },
  methods: {
    handleChange(v) {
      this.value = v;
    },
  },
};
</script>

<style lang='less'>
.table {
  width: 1000px;
  margin: 50px auto;
}
</style>
