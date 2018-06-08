// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'Axios'
import App from './App'
import Goods from './components/Goods/Goods.vue'
import Ratings from './components/Ratings/Ratings.vue'
import Seller from './components/Seller/Seller.vue'
import '@/common/styles/font.css'
import '@/common/styles/style.css'
import './common/js/filters'

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.prototype.$axios = axios

const routes = [
	{
		path: '/',
		redirect: '/Goods'
	},
	{
		path: '/goods',
		component: Goods
	},
	{
		path: '/ratings',
		component: Ratings
	},
	{
		path: '/seller',
		component: Seller
	}
]

const router = new VueRouter({
	routes,
	linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	template: '<App/>',
	router
})
