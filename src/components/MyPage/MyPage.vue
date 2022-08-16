<template>
  <div class="my-page">
    <ul class="page-list">
      <!-- 上一页 -->
      <li
        :class="['page-list-item', currentPage <= 1 ? 'disbled' : '']"
        @click="handleBeforOrAfterClick('before')"
      >
        &lt;
      </li>
      <!-- 中间页码数据 -->
      <template v-for="(pageItem, index) in pageList">
        <!-- 向前5页 -->
        <li
          :class="['page-list-item', 'page-list-item-prev']"
          @click="handlePageItemClick(pageItem, 'prev')"
          :key="index"
          title="向前5页"
          v-if="pageItem == 'prev'"
          @mouseover="prevStatus = false"
          @mouseleave="prevStatus = true"
        >
          <i v-if="prevStatus"> ...</i>
          <i v-else><<<</i>
        </li>
        <!-- 正常页码 -->
        <li
          :class="['page-list-item', 'page-list-item-next']"
          @click="handlePageItemClick(pageItem, 'next')"
          :key="index"
          title="向后5页"
          v-else-if="pageItem == 'next'"
          @mouseenter="nextStatus = false"
          @mouseleave="nextStatus = true"
        >
          <i v-if="nextStatus"> ...</i>
          <i v-else>>>></i>
        </li>
        <!-- 向后五页 -->
        <li
          :class="['page-list-item', currentPage == pageItem ? 'active' : '']"
          @click="handlePageItemClick(pageItem)"
          :key="index"
          :title="pageItem"
          v-else
        >
          {{ pageItem }}
        </li>
      </template>
      <!-- 下一页 -->
      <li
        :class="[
          'page-list-item',
          currentPage >= totalPage && totalPage > 0 ? 'disbled' : '',
        ]"
        @click="handleBeforOrAfterClick('after')"
      >
        &gt;
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    showTotal: {
      type: Boolean,
      default: false,
    },
    showSizer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: this.current || 1,
      prevStatus: true,
      nextStatus: true,
    };
  },
  computed: {
    // 根据总条数和每页条数计算得出总页数,记得向上取整
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 动态根据当前页,重新组装分页列表数据
    pageList() {
      if (this.totalPage - this.currentPage > 3) {
        if (this.currentPage > 3) {
          return [
            1,
            "prev",
            this.currentPage - 2,
            this.currentPage - 1,
            this.currentPage,
            this.currentPage + 1,
            this.currentPage + 2,
            "next",
            this.totalPage,
          ];
        } else {
          if (this.totalPage > 8) {
            return [1, 2, 3, "next", this.totalPage];
          } else {
            return this.totalPage;
          }
        }
      } else {
        if (this.currentPage < 3) {
          return new Array(totalPage).fill(0).map((item, index) => index);
        } else {
          return [
            1,
            "prev",
            this.totalPage - 2,
            this.totalPage - 1,
            this.totalPage,
          ];
        }
      }
    },
  },
  methods: {
    handlePageItemClick(item, type) {
      switch (type) {
        case "prev":
          this.currentPage -= 5;
          if (this.currentPage < 1) {
            this.currentPage = 1;
          }
          break;
        case "next":
          this.currentPage += 5;
          if (this.currentPage > this.totalPage) {
            this.currentPage = this.totalPage;
          }
          break;
        default:
          if (this.currentPage == item) {
            return;
          }
          this.currentPage = item;
      }
      this.$emit("on-change", this.currentPage);
    },
    handleBeforOrAfterClick(type) {
      switch (type) {
        case "before":
          this.currentPage--;
          if (this.currentPage < 1) {
            this.currentPage = 1;
            return;
          }
          break;
        case "after":
          this.currentPage++;
          if (this.currentPage > this.totalPage) {
            this.currentPage = this.totalPage;
            return;
          }
          break;
      }
      this.$emit("on-change", this.currentPage);
    },
  },
};
</script>

<style lang="less">
.my-page {
  .page-list {
    .page-list-item {
      display: inline-block;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      transition: all 0.2s ease-in-out;
      margin-right: 6px;
      &:hover {
        border-color: #2d8cf0;
        color: #2d8cf0;
      }
    }
    .active.page-list-item {
      border-color: #2d8cf0;
      color: #2d8cf0;
    }
    .disbled.page-list-item {
      cursor: not-allowed;
      background-color: #fff;
      color: #dcdee2;
    }
    .disbled:hover {
      border-color: #dcdee2;
    }
  }
}
</style>
