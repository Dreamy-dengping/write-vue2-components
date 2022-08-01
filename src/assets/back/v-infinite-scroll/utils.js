/**
 * @Description 用于判断滚动条是否到达底部
 * @param { Element }
 * @return { Boolean }
 **/
export function checkArriveBottom(el) {
  const clientHeight = el.clientHeight;
  const scrollTop = el.scrollTop;
  const scrollHeight = el.scrollHeight;
  return clientHeight + scrollTop >= scrollHeight;
}
