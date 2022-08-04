/**
 * @Description 节流函数
 * @param { Function } fn 需要做节流的函数
 * @param { Function } intervalTime 间隔实践
 * @param { Function } immediate 是否立即执行
 * @return { Number } intervalTime
 **/
export function throttle(fn, intervalTime = 200, immediate = true) {
  let oldTime = Date.now();
  return function (...arg) {
    if (immediate) {
      fn.bind(this)(...arg);
      immediate = false;
    }
    let nowTime = Date.now();
    if (nowTime - oldTime >= intervalTime) {
      fn.bind(this)(...arg);
      oldTime = nowTime;
    }
  };
}
