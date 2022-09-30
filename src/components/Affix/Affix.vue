<template>
  <div :style="FfixStyle" ref="ffix">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 距离顶部的距离
    offsetTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 标识dom元素是否距离可视区顶部给定距离
      tag: false,
      // 当到达需要固定的位置，需要设置的样式
      FfixStyle: {},
      // 绑定滚动处理函数this的函数
      bindThisHandleScroll: null,
      // 当固定的那一刻，文档卷走的距离（用于dom元素距离可视区不满足固定的距离触发
      scrollTop: 0,
      // 标识dom元素固定的那一刻，文档卷走的距离标识
      isAdd: false,
    };
  },

  mounted() {
    // 初始化
    this.init();
  },
  beforeDestroy() {
    // 销毁函数
    this.destory();
  },
  methods: {
    destory() {
      // 移除window上面的事件
      window.removeEventListener("scroll", this.bindThisHandleScroll);
    },
    init() {
      // 绑定this执行，用户组件销毁移除监听函数
      this.bindThisHandleScroll = this.handleScroll.bind(this);
      window.addEventListener("scroll", this.bindThisHandleScroll);
    },
    handleScroll() {
      let element = this.$slots.default[0].elm;
      // 获取元素距离可视区顶部和左边的距离
      let { top } = element.getClientRects()[0];
      // 说明到达需要固定的位置
      if (top <= this.offsetTop && !this.tag) {
        // 只需要记录一次dom元素固定的时候，文档卷走的高度
        !this.isAdd
          ? (this.scrollTop = document.documentElement.scrollTop)
          : null;
        // 设置当前已经满足固定条件
        this.tag = true;
        // 记录已经记录过文档卷走的高度
        this.isAdd = true;
        // 固定之后，将dom元素设置为绝对定位
        this.FfixStyle = {
          position: "fixed",
          top: this.offsetTop + "px",
          zIndex: 999,
        };
        // 发布固定的时候的事件
        this.$emit("on-change", true);
        // 克隆节点，顶替原位置占位
        this.handleCloneNode(true);
      }
      // 当dom元素不满足固定位置的距离时候，取消固定定位，回调初始位置
      if (
        this.tag &&
        document.documentElement.scrollTop - this.scrollTop <= 0
      ) {
        this.tag = false;
        this.FfixStyle = {};
        // 移除克隆几点
        this.handleCloneNode(false);
      }
    },
    handleCloneNode(type) {
      if (type) {
        let element = this.$slots.default[0].elm;
        let parent = element.parentNode.parentNode;
        // 克隆我们对应包裹的需要定位的元素取代绝对定位后的元素进行原位置的占位，设置透明不可见（复制节点的原因在于，我们占位元素需要原来元素的样式位置等信息）
        this.cloneNodde = this.cloneNodde
          ? this.cloneNodde
          : element.cloneNode(false);
        this.cloneNodde.style.opacity = "0";
        this.cloneNodde.style.display = "block";
        parent.insertBefore(this.cloneNodde, this.$refs.ffix);
      } else {
        // 隐藏克隆元素
        this.cloneNodde && (this.cloneNodde.style.display = "none");
      }
    },
  },
};
</script>
