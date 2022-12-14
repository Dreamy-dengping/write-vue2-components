<template>
  <div class="select">
    <!-- 初始输入框状态 -->
    <div class="select-text-wrap">
      <input
        type="text"
        class="select-input"
        :placeholder="placeholder"
        @click.stop="showOptions = !showOptions"
        :value="value"
        :readonly="!filterable"
        :disabled="disabled"
        @input="handleInputTextChange"
      />
      <div
        class="icon-wrap"
        @mouseenter="value.length > 0 && clearable ? (showCancel = true) : ''"
        @mouseout="showCancel = false"
      >
        <!-- 输入框下拉箭头 -->
        <span
          :class="['iconfont', 'icon-arrow-up', showOptions ? 'icon-down' : '']"
          v-if="!showCancel"
        ></span>
        <!-- 清空输入框 -->
        <span
          :class="['iconfont', 'icon-cancel']"
          v-if="showClearIncon"
          @click.stop="handleClearInputText"
        ></span>
      </div>
    </div>
    <!-- 对应下下拉选项插槽 -->
    <transition name="el-zoom-in-top">
      <div
        class="select-options-slots"
        :style="{
          textAlign: textAlign,
          maxHeight: maxHeight + 'px',
          overflow: 'auto',
        }"
        v-show="showOptions"
      >
        <!-- 本地搜索时展示 -->
        <template
          v-if="
            !remote && filterResultList.length && isSearchIn && value.length > 0
          "
        >
          <my-option
            v-for="item in filterResultList"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          ></my-option>
        </template>
        <!-- 远程搜索时展示 -->
        <template v-if="remote && remoteDataList.length && !loading">
          <my-option
            v-for="item in remoteDataList"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          ></my-option>
        </template>
        <!-- 外部下拉项插槽 -->
        <slot
          v-if="
            !remote &&
            (value.length == 0 || !isSearchIn) &&
            filterDataList.length
          "
        ></slot>
        <!-- 搜索为空 -->
        <div
          class="select-empty"
          v-if="
            (!loading &&
              !remote &&
              ((!filterResultList.length && isSearchIn && value.length > 0) ||
                !filterDataList.length)) ||
            (remote && !remoteDataList.length && !loading)
          "
        >
          暂无数据
        </div>
        <!-- 加载中状态 -->
        <div class="select-loading" v-if="loading">加载中...</div>
      </div>
    </transition>
  </div>
</template>

<script>
import MyOption from "./MyOption.vue";
import emitter from "./emitter";
export default {
  name: "MySelect",
  componentName: "MySelect",
  mixins: [emitter],
  components: {
    MyOption,
  },
  provide() {
    return {
      // 将父组件实例注入到子组件，还是响应式的
      select: this,
    };
  },
  props: {
    // 输入框文字是否居中显示
    textAlign: {
      type: String,
      default: "left",
    },
    // 绑定value值
    value: {
      type: String,
      default: "",
    },
    // 输入框提示
    placeholder: {
      type: String,
      default: "请选择",
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false,
    },
    // 可搜索
    filterable: {
      type: Boolean,
      default: false,
    },
    // 下来最大高度，下拉数据太长之后，超出显示滚动条
    maxHeight: {
      type: [String, Number],
      default: "auto",
    },
    // 可远程搜索
    remote: {
      type: Boolean,
      default: false,
    },
    // 远程搜索函数
    remoteMethod: {
      type: Function,
      default: () => {},
    },
    // 搜索loading
    loading: {
      type: Boolean,
      default: false,
    },
    // 远程搜索时候的需要执行的搜索函数
    remoteDataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      // 是否显示下来
      showOptions: false,
      // 点击活跃项
      activeValue: this.value,
      // 输入框只读状态
      readonly: "",
      // 显示取消
      showCancel: false,
      // 是否处于搜索
      isSearchIn: false,
      // 需要搜索是的数据
      filterDataList: [],
      // 搜索结果
      filterResultList: [],
    };
  },
  computed: {
    // 是否显示清空图标
    showClearIncon() {
      return this.clearable && this.value.length && this.showCancel;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      this.$on("onChange", (value) => {
        this.handleOptionsHandler(value);
      });
      // window点击关闭下拉
      document.addEventListener(
        "click",
        this.handleCloseOptions.bind(this),
        false
      );
      // 初始下拉数据
      this.getSearchData();
      // 当前value和下拉数据对比
      this.setActiveOption();
    },
    // item项点击
    handleOptionsHandler(value) {
      // 设置当前点击活跃项
      this.activeValue = value;
      // 关闭弹窗
      this.showOptions = false;
      // 发布change事件，将value抛出给外部使用
      this.$emit("on-change", value);
      // 发布input事件，更改input框的值
      this.$emit("input", value);
      // 点击后设置成未搜索状态(避免点击后下拉显示的不是全部)
      this.isSearchIn = false;
    },
    // 清空图标点击
    handleClearInputText() {
      // 发布清空输入框的事件（原理请参考vue文档在组件上使用v-model）
      this.$emit("input", "");
      // 当前活跃项清空
      this.activeValue = "";
      // 清空图标隐藏
      this.showCancel = false;
      // 关闭下拉选项
      this.showOptions = false;
      // 发布change事件，将value抛出给外部使用
      this.$emit("on-change", "");
    },
    // 组件之外点击关闭下来
    handleCloseOptions() {
      this.showOptions = false;
    },
    // 搜索输入框变化
    handleInputTextChange(e) {
      this.$emit("input", e.target.value);
      // 执行搜索
      this.setSearchData(e.target.value);
    },
    // 初始化搜索数据
    getSearchData() {
      // 判空处理，可能没下来数据
      if (this.$slots.default) {
        // 组装数据，供搜索使用
        this.filterDataList = this.$slots.default.map((vnode) => {
          // 从插槽中的componentOptions.proprsData中可以拿到组件对应的props
          const value = vnode.componentOptions?.propsData?.value,
            label = vnode.componentOptions?.propsData?.label;
          return {
            value,
            label,
          };
        });
      }
    },
    // 搜索数据
    setSearchData(value) {
      this.isSearchIn = true;
      this.filterResultList = this.filterDataList.filter((item) =>
        item.value.includes(value)
      );
    },
    // 初始化设置高亮item
    setActiveOption() {
      const activeOption = this.filterDataList.find((item) => {
        return item.value == this.value;
      });
      !activeOption && this.$emit("input", "");
    },
  },
  watch: {
    value(val) {
      // 执行远程搜索逻辑
      this.remoteMethod(val);
    },
  },
};
</script>

<style lang="less">
.select {
  width: 240px;
  position: relative;
  .select-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &:focus {
      border-color: #409eff;
    }
  }
  .select-input[disabled] {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .select-options-slots {
    position: absolute;
    left: 0;
    top: 40px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    margin: 5px 0;
    width: 100%;
  }
  .select-empty,
  .select-loading {
    text-align: center;
    padding: 10px 0;
    margin: 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
  //S iconfont字体
  @font-face {
    font-family: "iconfont"; /* Project id 2863961 */
    src: url("//at.alicdn.com/t/c/font_2863961_qgnvuxx0y7.woff2?t=1659601861494")
        format("woff2"),
      url("//at.alicdn.com/t/c/font_2863961_qgnvuxx0y7.woff?t=1659601861494")
        format("woff"),
      url("//at.alicdn.com/t/c/font_2863961_qgnvuxx0y7.ttf?t=1659601861494")
        format("truetype");
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-cancel:before {
    content: "\e6db";
  }

  .icon-arrow-up:before {
    content: "\e743";
  }
  //E iconfont字体
  .select-text-wrap {
    position: relative;
    .icon-arrow-up,
    .icon-cancel {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%) rotate(180deg);
      transition: transform 0.3s;
      font-size: 20px;
      cursor: pointer;
    }
    .icon-down {
      transform-origin: center;
      transform: translateY(-50%) rotate(0deg);
    }
  }

  // 过度（咱的）
  .select-fade-enter-active,
  .select-fade-leave-active {
    opacity: 1;
    transition: all 0.25s ease;
    transform-origin: center top;
  }
  .select-fade-enter {
    opacity: 0;
    transform: scaleY(0);
  }
  .select-fade-leave-to {
    opacity: 0;
    transform: scaleY(0);
  }

  // element加的过渡效果
  .el-zoom-in-top-enter-active,
  .el-zoom-in-top-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center top;
  }

  .el-zoom-in-top-enter,
  .el-zoom-in-top-leave-active {
    opacity: 0;
    transform: scaleY(0);
  }
}
</style>
