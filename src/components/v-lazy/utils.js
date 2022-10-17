import loadingSrc from "../../assets/img/loading.jpg";
// 判断dom元素是否到达可视区
export const checkEnterView = (el) => {
  const { top, left } = el.getClientRects()[0];
  const htmlClientHeight = document.documentElement.clientHeight;
  const htmlClientWidth = document.documentElement.clientWidth;
  if (top < htmlClientHeight && left < htmlClientWidth) {
    return true;
  }
  return false;
};

// 初始状态将图片的路径设置成加载中的图片
export const initLoadImg = (el) => {
  el.src = loadingSrc;
};

/**
 * @Description 防抖函数
 * @Author Galaxy
 * @param { Function } fn 需要防抖的函数
 * @param { Number } time 时间间隔
 * @return { Fuction } 返回防抖后的新函数
 **/
export const debounce = (fn, time) => {
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
export const throttle = (fn, time, immediate = true) => {
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
