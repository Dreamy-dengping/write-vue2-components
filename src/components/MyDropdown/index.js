import Vue from "vue";
import MyDropdown from "./MyDropdown.vue";
import MyDropdownItem from "./MyDropdownItem.vue";
import MyDropdownMenu from "./MyDropdownMenu.vue";
// menu组件直接注册，其他的组件按需抛出到外部供用户使用
Vue.component(MyDropdownMenu.name, MyDropdownMenu);
export { MyDropdown, MyDropdownItem };
