import { checkEnterView, initLoadImg, debounce ,throttle} from "./utils";
import ImageItemClass from "./ImageItemClass";
// 懒加载类
export default class Lazy {
  constructor(options) {
    // 所有v-lazy绑定的图片的集合
    this.imgPoolList = [];
    // 是否绑定了滚动处理函数
    this.isScroll = false;
    // 图片加载失败的默认图
    this.errorImg = options.errorImg || require("./img/error.jpg");
    // 图片加载中显示的默认图
    this.loadingImg =
      options.loadingImg || require("./img/loading.jpg");
    // 是否指定特定的带over-flow的父级作为滚动处理函数绑定的对象，默认绑定滚动处理函数在window上面
    this.scrollParent = false;
    // 动画过渡时长
    this.transitionTime = options.transitionTime || 0.9;
    // 防抖的阈值
    this.debounceTime = options.debounceTime || 200;
    // 绑定防抖函数，避免滚动过程频繁触发，提高流畅度
    this.debounceHandleScroll = debounce(this.handleScroll, this.debounceTime).bind(this);
    // 绑定节流函数，避免滚动过程频繁触发，提高流畅度
    this.throttleHandleScroll = throttle(this.handleScroll, this.debounceTime, true).bind(this);
  }
  // 指令绑定的dom元素插入到页面中触发（类似mounted)
  inserted(el, binding, vnode) {
    // 将当前dom元素加入到set集合中，便于统一处理
    this.imgPoolList.push(
      new ImageItemClass({
        src: binding.value,
        errorImg: this.errorImg,
        el,
        transitionTime: this.transitionTime,
      })
    );
    // 初始化渲染图片状态
    initLoadImg(el);
    // 初始的时候，执行一次函数
    this.handleScroll();
    // 记住绑定过了就不需要绑定了，不然会出现给dom元素重复多次绑定滚动处理函数
    !this.isScroll &&
      window.addEventListener("scroll", this.debounceHandleScroll);
    // 标记当前滚动处理函数已经绑定好了
    this.isScroll = true;
  }
  // 滚动的时候，根据dom元素是否进入到可视区动态，再决定是否加载图片
  handleScroll() {
    for (let imgInstance of this.imgPoolList) {
      // 当img出现在可视区并且没有被加载的时候，进行加载处理
      if (checkEnterView(imgInstance.el) && !imgInstance.loaded) {
        imgInstance
          .loadImg()
          .then(() => {
            // 图片加载成功的回调
          })
          .catch(() => {
            // 图片加载失败的回调
          });
      }
    }
  }
}
