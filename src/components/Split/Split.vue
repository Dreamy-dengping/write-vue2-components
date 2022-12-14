<template>
  <div class="g-split" ref="gSplit">
    <!-- 水平方向 -->
    <div class="horizontal" v-if="showHorizontal">
      <div class="left-panel position" :style="horizontalLeftPanel">
        <slot name="left"></slot>
      </div>
      <div
        class="horizontal-trigger-panel position"
        :style="horizontaltriggerPanel"
        ref="horizontalTriggerPanel"
      >
        <slot name="trigger" v-if="$slots.trigger"></slot>
        <div class="trigger-content-default-wrap" v-else>
          <div class="trigger-content">
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
          </div>
        </div>
      </div>
      <div class="right-panel position" :style="horizontalRightPanel">
        <slot name="right"></slot>
      </div>
    </div>
    <!-- 垂直方向 -->
    <div class="vertical" v-if="showVertical">
      <div class="top-panel position" :style="verticalTopPanel">
        <slot name="top"></slot>
      </div>
      <div
        class="vertical-trigger-panel position"
        :style="verticaltriggerPanel"
        ref="verticalTriggerPanel"
      >
        <slot name="trigger" v-if="$slots.trigger"></slot>
        <div class="trigger-content-default-wrap" v-else>
          <div class="trigger-content">
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
            <i class="trigger-bar"></i>
          </div>
        </div>
      </div>
      <div class="bottom-panel position" :style="verticalBottomPanel">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 注意：页面偏移量单位统一使用百分比计算
export default {
  props: {
    // v-model绑定的值，初始的偏移量
    value: {
      type: [String, Number],
      default: 0.5,
    },
    // 上下面板还是左右面板，默认为上下格式
    mode: {
      type: String,
      validator(value) {
        return ["horizontal", "vertical"].includes(value);
      },
      default: "horizontal",
    },
    // 拖拽占盒子最小比例
    min: {
      type: [String, Number],
      default: 0.1,
    },
    // 拖拽占盒子最大比例
    max: {
      type: [String, Number],
      default: 0.9,
    },
  },
  data() {
    return {
      // 左侧偏移量，默认为初始最小值
      left: this.value * 1,
      // 上面偏移量，默认为初始最小值
      top: this.value * 1,
      // split面板的宽度
      gSplitWidth: 0,
      // solt面板的高度
      gSplitHeight: 0,
      // 水平拖拽部分的长条的宽度
      horizontalTriggerPanelWidht: 0,
      // 垂直拖拽部分的长条的高度
      verticalTriggerPanelHeight: 0,
    };
  },
  computed: {
    // 是否显示左右拖动面板
    showHorizontal() {
      return this.mode == "horizontal";
    },
    // 是否显示上下拖动面板
    showVertical() {
      return this.mode == "vertical";
    },
    // 左侧面板偏移量
    horizontalLeftPanel() {
      return {
        left: 0,
        right: (1 - this.left) * 100 + "%",
      };
    },
    // 右侧面板偏移量
    horizontalRightPanel() {
      // 主意：要加上中间的trigger内容区的宽度
      return {
        left:
          (this.left + this.horizontalTriggerPanelWidht / this.gSplitWidth) *
            100 +
          "%",
      };
    },
    // 左右面板中间trigger拖拽部分的偏移量
    horizontaltriggerPanel() {
      return {
        left: this.left * 100 + "%",
      };
    },

    // 上面面板偏移量
    verticalTopPanel() {
      return {
        top: 0,
        bottom: (1 - this.top) * 100 + "%",
      };
    },
    // 下面面板偏移量
    verticalBottomPanel() {
      return {
        top:
          (this.top + this.verticalTriggerPanelHeight / this.gSplitHeight) *
            100 +
          "%",
      };
    },
    // 上下面板中间trgger拖拽部分偏移量
    verticaltriggerPanel() {
      return {
        top: this.top * 100 + "%",
      };
    },
  },
  mounted() {
    this.bindEvent();
    this.initDom();
  },
  methods: {
    // 初始化部分dom元素的尺寸
    initDom() {
      this.gSplitWidth = this.$refs.gSplit.clientWidth;
      this.gSplitHeight = this.$refs.gSplit.clientHeight;
      this.mode == "horizontal"
        ? (this.horizontalTriggerPanelWidht =
            this.$refs.horizontalTriggerPanel.clientWidth)
        : "";
      this.mode == "vertical"
        ? (this.verticalTriggerPanelHeight =
            this.$refs.verticalTriggerPanel.clientHeight)
        : "";
    },
    bindEvent() {
      // 根据mode来决定绑定那种类型的事件
      this.mode == "horizontal" ? this.bindHorizontalTriggerPanelEvent() : null;
      this.mode == "vertical" ? this.bindVerticalTriggerPanelEvent() : null;
    },
    // 禁用页面文字选中函数
    preventSelectedOnMouseMove(e) {
      e.preventDefault();
    },
    // 水平拖拽处理函数
    bindHorizontalTriggerPanelEvent() {
      this.resolveMouseFn("horizontal", this.$refs.horizontalTriggerPanel);
    },
    // 处置垂直面板拖拽函数
    bindVerticalTriggerPanelEvent() {
      this.resolveMouseFn("vertical", this.$refs.verticalTriggerPanel);
    },
    // 处理拖拽逻辑，水平和垂直的逻辑合在一起
    resolveMouseFn(type = "horizontal", element) {
      const mousedown = (e) => {
        // 禁止页面文字的选中，避免在拖拽过成功出现文字被选中的行为
        document.addEventListener(
          "selectstart",
          this.preventSelectedOnMouseMove
        );
        // 发布开始拖拽事件
        this.$emit("on-move-start", e);
        // 获取鼠标点击的位置距离元素边缘的距离
        const pos = type == "horizontal" ? "left" : "top";
        const distance =
          type == "horizontal"
            ? e.clientX - element.offsetLeft
            : e.clientY - element.offsetTop;
        const mousemove = (e) => {
          // 发布开始拖拽中事件
          this.$emit("on-moving", e);
          const gSplitSize =
            type == "horizontal"
              ? this.$refs.gSplit.clientWidth
              : this.$refs.gSplit.clientHeight;
          this[pos] =
            (type == "horizontal"
              ? e.clientX - distance
              : e.clientY - distance) / gSplitSize;
          // 控制范围
          if (this[pos] < this.min) {
            this[pos] = this.min;
          }
          if (this[pos] > 1 - this.min) {
            this[pos] = 1 - this.min;
          }
          return false;
        };
        const mouseup = () => {
          // 发布开始拖拽结束事件
          this.$emit("on-move-end", e);
          // 释放按下和滑动处理函数以及禁用选中的处理函数
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
          document.removeEventListener(
            "selectstart",
            this.preventSelectedOnMouseMove
          );
          return false;
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        return false;
      };
      element.addEventListener("mousedown", mousedown);
    },
  },
};
</script>

<style lang="less">
.g-split {
  height: 100%;
  overflow: hidden;
  .position {
    position: absolute;
  }
  .horizontal {
    position: relative;
    height: 100%;
    .left-panel {
      height: 100%;
    }
    .right-panel {
      height: 100%;
    }
    .horizontal-trigger-panel {
      cursor: col-resize;
      height: 100%;
      .trigger-content-default-wrap {
        background-color: #f8f8f9;
        height: 100%;
        position: relative;
        width: 7px;
        .trigger-content {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          .trigger-bar {
            width: 7px;
            height: 1px;
            display: block;
            background: rgba(23, 35, 61, 0.25);
            margin-top: 3px;
          }
        }
      }
    }
  }
  .vertical {
    position: relative;
    height: 100%;
    .top-panel {
      width: 100%;
    }
    .bottom-panel {
      width: 100%;
    }
    .vertical-trigger-panel {
      width: 100%;
      .trigger-content-default-wrap {
        width: 100%;
        position: relative;
        height: 7px;
        cursor: row-resize;
        background-color: #f8f8f9;
        .trigger-content {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          height: 100%;
          .trigger-bar {
            width: 1px;
            height: 100%;
            display: inline-block;
            background: rgba(23, 35, 61, 0.25);
            margin-left: 3px;
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>
