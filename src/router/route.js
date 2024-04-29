
import Home from '../views/Home.vue'
import module1 from "./modules/module1.js"


const frameIn = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/ebank',
        name: 'ebank',
        component: () => import('../views/ebank.vue')
    },
    {
        path: '/companyBank',
        name: 'companyBank',
        component: () => import('../views/companyBank.vue')
    },
    {
        path: '/pdfPreview',
        name: 'pdfPreview',
        component: () => import('../views/pdfPreview.vue')
    },
    {
        path: '/snip',
        name: 'snip',
        component: () => import('../views/snip/index.vue')
    },

];

const webHotUpdateModule = [
    module1,
]



export default [...frameIn, ...webHotUpdateModule]
