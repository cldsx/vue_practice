import Vue from "vue";


import test1Comp from "./test1Comp";
import myChildren from "./my-children"
import myGrandson from "./my-grandson"
import myTest from "./my-test";
Vue.component("test1-comp", test1Comp);
Vue.component("my-children", myChildren);
Vue.component("my-grandson", myGrandson);
Vue.component("my-test", myTest);
