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
