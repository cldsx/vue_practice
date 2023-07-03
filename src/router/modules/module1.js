const _import = require("../routerUtil")

export default {
    path: "/moduleOne/",
    name: "moduleOne",
    component: _import("moduleOne/index.vue"),
    meta: {
       title:"大模块1"
    },
    children: ((pre) => [
        {
            path: "module1/module1",
            name: `${pre}-module1-module1`,
            component: _import("moduleOne/module1/module1.vue"),
            meta:{
                title:"小模块1"
            }
        },
        {
            path: "module1/module2",
            name: `${pre}-module1-module2`,
            component: _import("moduleOne/module1/module2.vue")
        },


    ])("moduleOne")
}