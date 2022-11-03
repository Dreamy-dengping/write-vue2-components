<template>
  <div class="gnip-table" ref="gnipTable">
    <div class="table-wrap">
      <table>
        <!--  标签用于对表格中的列进行组合，以便对其进行格式化。 -->
        <colgroup>
          <col
            :width="item.width || columnDefault"
            v-for="(item, index) in column"
            :key="index"
            ref="colgroupItems"
          />
        </colgroup>
        <!-- 表头 -->
        <thead>
          <tr>
            <th v-for="(item, index) in column" :key="index" class="gnip-th">
              <span class="cell-title">{{ item.title }}</span>
              <span
                class="drag-line"
                draggable="true"
                @dragstart="handleDragStart(index, $event)"
                @drag="handleDrag($event)"
                @drog="handleDrog($event)"
                @dragover="handleDragOver($event)"
                @dragend="handleDragend"
              ></span>
            </th>
          </tr>
        </thead>
        <!-- 表体 -->
        <tbody v-if="data.length">
          <tr v-for="(dataColumn, dataIndex) in data" :key="data.Id">
            <td v-for="(item, index) in column" :key="index">
              <div class="content-cel" v-if="item.slot">
                <slot
                  :name="item.slot"
                  v-bind:row="dataColumn"
                  v-bind:index="dataIndex"
                ></slot>
              </div>
              <div class="content-cel" v-else>
                {{ dataColumn[item.key] }}
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="!data.length">
          <tr>
            <td :colspan="column.length">
              <div class="data-empty">暂无数据</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- 拖拽线 -->
    <div
      class="drag-resize-line"
      :style="computedResizeLineStyle"
      v-if="showDragResizeLine"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    column: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      // 拖拽线左侧偏移量
      dragLineLeft: 0,
      // 当前拖拽的td索引项
      activeDragIndex: -1,
      // 开始拖拽那一刻，距离表格左侧的距离
      activeDragStartIndexOffsetLeft: 0,
      // 表格的宽度
      gnipTableScrollWidth: "",
      // 是否显示拖拽线
      showDragResizeLine: false,
      // 默认列宽为自动平分计算
      columnDefault: 0,
    };
  },
  computed: {
    computedResizeLineStyle() {
      return {
        left: this.dragLineLeft + "px",
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.initTableScrollWidth();
    },
    // 初始化表格宽度
    initTableScrollWidth() {
      this.gnipTableScrollWidth = this.$refs.gnipTable.offsetWidth;
      // 自定义宽度的列数
      const autoWidthColumnCount = this.column.filter(
        (item) => !item.width
      ).length;
      // 剩余可自定义宽度
      const resetAutoWidth = this.column
        .filter((item) => item.width)
        .reduce((prev, now) => prev + now.width * 1, 0);
      this.columnDefault =
        (this.gnipTableScrollWidth - resetAutoWidth) / autoWidthColumnCount;
    },
    // 拖拽开始
    handleDragStart(index, event) {
      // 计算拖拽线的距离
      this.computedDragLineOffsetStart(event.target);
      //记录当前拖拽的表头索引
      this.activeDragIndex = index;
      // 显示拖拽线
      this.showDragResizeLine = true;
    },
    // 拖拽中
    handleDrag(event) {
      this.computedDragLineOffsetDraging(event);
    },
    // 拖拽中
    handleDrog(event) {
      event.preventDefault();
    },
    // 拖拽滑过
    handleDragOver(event) {},
    // 拖拽结束
    handleDragend(event) {
      this.computedDragLineOffsetDraging(event);
      // // 设置宽度
      this.setColGroupItemWidth();
      this.activeDragStartIndexOffsetLeft = 0;
      // 隐藏拖拽线
      this.showDragResizeLine = false;
    },
    // 计算拖拽线的偏移量
    computedDragLineOffsetStart(targetEle) {
      let parent = targetEle.offsetParent;
      let left = targetEle.offsetLeft;
      while (parent) {
        if (parent == this.$refs.gnipTable) {
          // 说明找到了外层相对定位的父级
          break;
        }
        left += parent.offsetLeft;
        parent = parent.offsetParent;
      }
      this.dragLineLeft = left;
      // 记录按下刚开始拖拽的时候的位置
      !this.activeDragStartIndexOffsetLeft &&
        (this.activeDragStartIndexOffsetLeft = left);
      return left;
    },
    // 拖拽中计算偏移量
    computedDragLineOffsetDraging(event) {
      let clientX = event.clientX;
      let targetEle = this.$refs.gnipTable;
      let x = targetEle.offsetLeft;
      let parent = targetEle.offsetParent;
      while (parent) {
        x += parent.offsetLeft;
        parent = parent.offsetParent;
      }
      let left = clientX - x < 0 ? 0 : clientX - x;
      this.dragLineLeft = left;
    },
    // 计算表头列的宽度
    setColGroupItemWidth() {
      // 需要增加的宽度
      let addWidth = this.dragLineLeft - this.activeDragStartIndexOffsetLeft;
      console.log(this.dragLineLeft, this.activeDragStartIndexOffsetLeft);
      // return;

      this.$nextTick(() => {
        //  原来的宽度
        let { width } =
          this.$refs.colgroupItems[
            this.activeDragIndex
          ].getBoundingClientRect();
        // 设置一个最小的宽度取值为30px，避免出现负值
        const computedWidth = addWidth + width < 30 ? 30 : addWidth + width;
        // 自定义宽度的列数
        const autoWidthColumnCount = this.column.filter(
          (item) => !item.width
        ).length;
        for (let i = 0; i < this.$refs.colgroupItems.length; i++) {
          if (i == this.activeDragIndex) {
            this.$refs.colgroupItems[this.activeDragIndex].setAttribute(
              "width",
              computedWidth
            );
          } else {
            this.$refs.colgroupItems[i].setAttribute(
              "width",
              (this.gnipTableScrollWidth - computedWidth) / autoWidthColumnCount
            );
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.gnip-table {
  position: relative;
  overflow: auto;

  table {
    border-collapse: collapse;
    .data-empty {
      text-align: center;
    }
    .gnip-th {
      position: relative;
      background-color: #f8f8f9;
      padding: 8px 0;
      .drag-line {
        position: absolute;
        width: 5px;
        height: 100%;
        right: 0;
        top: 0;
        cursor: col-resize;
        // background-color: red;
        user-select: none;
        z-index: 1;
      }
    }
  }
  table,
  th,
  td {
    border: 1px solid #e8eaec;
    text-align: center;
    word-break: break-all;
  }
  thead {
    .th {
      background-color: #f8f8f9;
    }
  }
  .drag-resize-line {
    height: 100%;
    width: 1px;
    border-right: 1px dashed green;
    position: absolute;
    left: 0;
    top: 0;
  }
  tbody {
    tr {
      &:hover {
        background: #ebf7ff;
      }
    }
    td {
      height: 48px;
      box-sizing: border-box;
    }
  }
}
</style>
