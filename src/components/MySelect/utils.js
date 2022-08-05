/**
 * @Description 发布订阅的简单封装实现
 * 使用这种方式实现跨组件的通信理由如下：
 * 1.组件是给使用者使用的，不能过多要求使用者传递过多你内部逻辑实现需要的参数
 * 2.跨组件通信我们其实还可以使用vuex，但是组件库中，涉及到的只是单个组件，使用vuex也就没必要了
 **/
class Pubsub {
  constructor() {
    this.queenList = [];
  }
  //   订阅事件
  subscribe(eventName, fn) {
    let cur = this.queenList.find((item) => item.eventName == eventName);
    if (cur) {
      cur.callback.push(fn);
    } else {
      this.queenList.push({
        eventName,
        callback: [fn],
      });
    }
  }
  //   发布事件
  notice(eventName, ...args) {
    let cur = this.queenList.find((item) => item.eventName == eventName);
    if (cur) {
      cur.callback.forEach((fn) => {
        fn(...args);
      });
    }
  }
  // 清空事件队列
  clearEventQueen() {
    this.queenList = [];
  }
}

export default new Pubsub();
export { Pubsub };
