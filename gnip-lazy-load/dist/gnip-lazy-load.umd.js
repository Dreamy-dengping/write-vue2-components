(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gnip-lazy-load"] = factory();
	else
		root["gnip-lazy-load"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1391":
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE1MUNGMjIyNjE3NDExRUM5QjI3RjhFQkE2NDRFQ0QyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE1MUNGMjIzNjE3NDExRUM5QjI3RjhFQkE2NDRFQ0QyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTUxQ0YyMjA2MTc0MTFFQzlCMjdGOEVCQTY0NEVDRDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTUxQ0YyMjE2MTc0MTFFQzlCMjdGOEVCQTY0NEVDRDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEB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"

/***/ }),

/***/ "3097":
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE1MUNGMjI2NjE3NDExRUM5QjI3RjhFQkE2NDRFQ0QyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE1MUNGMjI3NjE3NDExRUM5QjI3RjhFQkE2NDRFQ0QyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTUxQ0YyMjQ2MTc0MTFFQzlCMjdGOEVCQTY0NEVDRDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTUxQ0YyMjU2MTc0MTFFQzlCMjdGOEVCQTY0NEVDRDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEB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"

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/components/v-lazy/img/loading.jpg
var loading = __webpack_require__("1391");
var loading_default = /*#__PURE__*/__webpack_require__.n(loading);

// CONCATENATED MODULE: ./src/components/v-lazy/utils.js

/**
 * @Description 判断dom元素是否到达可视区
 * @Author Galaxy
 * @Date 2022/10/18 18:47:46
 * @param { Boolean }
 * @return { Boolean }
 **/

const checkEnterView = (imgInstance, scrollParent) => {
  let parentHeight, parentWidth, x, y;

  if (imgInstance.scroll) {
    // 存在滚动父级，需要元素到滚动父级可视区顶部的估计：计算公式为offsetTop-scrollParent.scrollTop
    parentHeight = scrollParent.clientHeight;
    parentWidth = scrollParent.clientWidth;
    y = imgInstance.el.offsetTop - scrollParent.scrollTop;
    x = imgInstance.el.offsetLeft - scrollParent.scrollLeft;
  } else {
    // 不存在滚动父级的情况
    const {
      top,
      left
    } = imgInstance.el.getBoundingClientRect();
    y = top;
    x = left;
    parentHeight = document.documentElement.clientHeight;
    parentWidth = document.documentElement.clientWidth;
  }

  if (y < parentHeight && x < parentWidth) {
    return true;
  } // // 只考虑y轴
  // if (y < parentHeight) {
  //   return true;
  // }


  return false;
}; // 初始状态将图片的路径设置成加载中的图片

const initLoadImg = el => {
  el.src = loading_default.a;
};
/**
 * @Description 防抖函数
 * @Author Galaxy
 * @param { Function } fn 需要防抖的函数
 * @param { Number } time 时间间隔
 * @return { Fuction } 返回防抖后的新函数
 **/

const debounce = (fn, time) => {
  let timer = null;
  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, ...arg);
    }, time);
  };
};
/**
 * @Description 节流函数
 * @Author Galaxy
 * @param { Function } fn 需要节流的函数
 * @param { Number } time 时间间隔
 * @param { Number } immediate 是否初始的时候立即执行一次
 * @return { Fuction } 返回节流后的新函数
 **/

const throttle = (fn, time, immediate = true) => {
  let oldTime = new Date();
  return function (...arg) {
    if (immediate) {
      fn.apply(this, ...arg);
      immediate = false;
      return;
    }

    let currentTime = new Date();

    if (currentTime - oldTime >= time) {
      fn.apply(this, ...arg);
      oldTime = currentTime;
    }
  };
};
// CONCATENATED MODULE: ./src/components/v-lazy/ImageItemClass.js
// v-lazy绑定的元素加载图片项构造函数
class ImageItemClass {
  constructor({
    errorImg,
    src,
    el,
    transitionTime
  }) {
    // img标签
    this.el = el; // 加载出错显示的默认图

    this.errorImg = errorImg; //绑定的图片路径

    this.src = src; // 是否加载过了当前图片

    this.loaded = false; // 动画过渡时长

    this.transitionTime = transitionTime; // 是否存在加载出错

    this.loadingError = false;
  } //   每个图片项的加载函数


  loadImg() {
    // 返回promise，外部调用可以做其他扩展处理
    return new Promise((resolve, reject) => {
      this.el.src = this.src; //src为有效图片路径能够加载出来

      this.el.onload = () => {
        resolve(); // 为了更好的用户体验，这里将图片的透明度进行过渡

        this.el.style.opacity = '0'; // this.el.style.transition = `opacity ${this.transitionTime}s`;

        this.addTransition();
      }; //src为无效图片路径不能够加载出来


      this.el.onerror = () => {
        // 设置成默认加载错误时候的图片，避免破碎图片的显示
        this.el.src = this.errorImg;
        this.loadingError = true;
        reject();
        this.addTransition();
      }; // 标识当前图片已经被加载了，避免滚动重复处理造成的卡顿


      this.loaded = true;
    });
  } // 添加过渡


  addTransition() {
    requestAnimationFrame(() => {
      !this.loadingError ? this.el.style.transition = `opacity ${1.2}s ease-in-out` : null;
      this.el.style.opacity = '1';
    });
  }

}
// CONCATENATED MODULE: ./src/components/v-lazy/Lazy.js

 // 懒加载类

class Lazy_Lazy {
  constructor(options) {
    // 所有v-lazy绑定的图片的集合
    this.imgPoolList = new Map();
    this.noScrollParentimgPoolList = []; //不带滚动父级

    this.scrollParentimgPoolList = []; //带滚动父级
    // 图片集合字段名

    this.pooListField = 'noScrollParentimgPoolList'; // 是否绑定了滚动处理函数到window

    this.isBindScrollWindow = false; //  是否绑定了滚动处理函数到带overflow属性的父级元素

    this.isBindScrollScrollParent = false; // 图片加载失败的默认图

    this.errorImg = options.errorImg || __webpack_require__("3097"); // 图片加载中显示的默认图

    this.loadingImg = options.loadingImg || __webpack_require__("1391"); // 是否指定特定的带over-flow的父级作为滚动处理函数绑定的对象，默认绑定滚动处理函数在window上面

    this.scrollParent = null; // 根据用户指令配置项，确定是否根据父级来绑定滚动函数

    this.isScrollParent = false; // 动画过渡时长

    this.transitionTime = options.transitionTime || 0.9; // 防抖的阈值

    this.debounceTime = options.debounceTime || 200; // 绑定防抖函数，避免滚动过程频繁触发，提高流畅度

    this.debounceHandleScroll = debounce(this.handleScroll, this.debounceTime).bind(this); // 绑定节流函数，避免滚动过程频繁触发，提高流畅度

    this.throttleHandleScroll = throttle(this.handleScroll, this.debounceTime, true).bind(this);
  } // 指令绑定的dom元素插入到页面中触发（类似mounted)


  inserted(el, binding, vnode) {
    // 是否需要滚动父级
    this.isScrollParent = binding.modifiers.scroll;
    this.pooListField = this.isScrollParent ? 'scrollParentimgPoolList' : 'noScrollParentimgPoolList'; // 将当前dom元素加入到set集合中，便于统一处理

    this.imgPoolList.set(el, new ImageItemClass({
      src: binding.value,
      //图片路径
      errorImg: this.errorImg,
      //加载出错默认图
      el,
      //当前dom节点
      transitionTime: this.transitionTime,
      //动画过渡时长
      scroll: this.isScrollParent //是否标记滚动父级

    })); // 初始化渲染图片状态

    initLoadImg(el); // 初始的时候，执行一次函数

    this.handleScroll(); // 记住绑定过了就不需要绑定了，不然会出现给dom元素重复多次绑定滚动处理函数
    // 如果存在滚动滚动父级，那么给滚动父级也绑定滚动处理函数

    if (this.findScrollParent(el)) {
      !this.isBindScrollScrollParent && this.scrollParent.addEventListener('scroll', this.debounceHandleScroll);
      this.isBindScrollScrollParent = true;
    } else {
      !this.isBindScrollWindow && window.addEventListener('scroll', this.debounceHandleScroll);
      this.isBindScrollWindow = true;
    }
  } // 元素卸载，初始化


  unbind() {
    this.scrollParentimgPoolList = [];
    this.noScrollParentimgPoolList = [];
  } // 指令绑定的值变化


  update(el, binding) {
    this.updateImageInstance(el, binding);
  } // 更新保存的图片实例对象


  updateImageInstance(el, binding) {
    // 将更新的图片的路径进行更换，重新加载
    for (let [elment, imgInstance] of this.imgPoolList) {
      if (el == elment && !imgInstance.loaded) {
        imgInstance.src = binding.value;
      }
    }

    this.handleScroll();
  } // 滚动的时候，根据dom元素是否进入到可视区动态，再决定是否加载图片


  handleScroll() {
    for (let [el, imgInstance] of this.imgPoolList) {
      if (this.scrollParent) {
        // 当img出现在可视区并且没有被加载的时候，进行加载处理
        if (checkEnterView(imgInstance, this.scrollParent) && !imgInstance.loaded) {
          this.resolveImgInstance(imgInstance);
        }
      } else {
        // 当img出现在可视区并且没有被加载的时候，进行加载处理
        if (checkEnterView(imgInstance) && !imgInstance.loaded) {
          this.resolveImgInstance(imgInstance);
        }
      }
    }
  } // 加载图片


  resolveImgInstance(imgInstance) {
    imgInstance.loadImg().then(() => {// 图片加载成功的回调
    }).catch(() => {
      // 图片加载失败的回调,将loaded变为false，便于图片更新后重新加载
      imgInstance.loaded = false;
    });
  } // 寻找滚动父级元素，带overflow的


  findScrollParent(el) {
    if (!this.isScrollParent) return false;
    let parent = el.parentNode;

    while (parent) {
      if (getComputedStyle(parent).getPropertyValue('overflow') == 'scroll' || getComputedStyle(parent).getPropertyValue('overflow') == 'auto' || getComputedStyle(parent).getPropertyValue('overflow-x') == 'scroll' || getComputedStyle(parent).getPropertyValue('overflow-x') == 'auto' || getComputedStyle(parent).getPropertyValue('overflow-y') == 'scroll' || getComputedStyle(parent).getPropertyValue('overflow-y') == 'auto') {
        // 找到了带overflow样式的父级元素
        this.scrollParent = parent;
        return true;
      }

      parent = parent.parentNode;
    }

    return false;
  }

}
// CONCATENATED MODULE: ./src/components/v-lazy/index.js

/* harmony default export */ var v_lazy = ({
  // 插件都要具有install方法，这样外部就可以通过vue.use注册插件了
  install(Vue, options = {}) {
    // 注册v-lazy指令
    const lazyInstance = new Lazy_Lazy(options);
    Vue.directive("lazy", {
      inserted: lazyInstance.inserted.bind(lazyInstance)
    });
  }

});
// CONCATENATED MODULE: ./index.js

/* harmony default export */ var index = (v_lazy);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (index);



/***/ })

/******/ });
});
//# sourceMappingURL=gnip-lazy-load.umd.js.map