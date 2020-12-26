import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/v-catalog'
import vCart from '../components/v-cart'
import vOrder from '../components/v-order'
import vPhoneInfo from '../components/v-phone-info'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: vCatalog
        },
        {
            path: '/product/:id',
            name: 'phoneInfo',
            component: vPhoneInfo,
            props: true
        },
        {
            path: '/cart',
            name: 'cart',
            component: vCart,
            props: true
        },
        {
            path: '/order',
            name: 'order',
            component: vOrder
        }
    ]
})

export default router;