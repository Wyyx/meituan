<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuScroll">
			<ul>
				<!-- 专场菜单 -->
				<div class="menu-scroll-area">
					<li class="menu-item" @click="selectMenu(0)" :class="{ active: currentAreaIndex === 0 }">
						<img v-if="special.tag_icon" :src="special.tag_icon" class="icon">
						<span class="name">{{ special.tag_name | abbr(7) }} </span>
					</li>
				</div>

				<!-- 分类菜单 -->
				<li class="menu-item menu-scroll-area" v-for="(category, index) in categories" @click="selectMenu(index + 1)" :class="{ active: currentAreaIndex === index + 1 }">
					<img v-if="category.icon" :src="category.icon" class="icon">
					<span class="name">{{ category.name | abbr(7) }} </span>
					<span v-if="count(category)" class="count">{{ count(category) }}</span>
				</li>
			</ul>
		</div>
		<!-- 产品列表 -->
		<div class="goods-wrapper" ref="goodsScroll">
			<ul>
				<!-- 专场banner -->
				<div class="special-goods-wrapper scroll-area">
					<div class="banner" v-for="item in special.operation_source_list" :style="generateBannerBg(item.pic_url)"></div>
				</div>
				<!-- 产品 -->
				<div class="category-goods-wrapper scroll-area" v-for="category in categories">
					<h4 class="title">
						<i class="icon"></i>
						<span>{{ category.name }}</span>
					</h4>
					<div class="good" v-for="good in category.spus">
						<div class="index-image" @click="getSelectedProduct(good)" :style="generateIndexImageBg(good.picture)"></div>
						<div class="good-info">
							<p class="good-title" @click="getSelectedProduct(good)">{{ good.name }}</p>
							<p v-if="good.description" class="description"> {{ good.description }}</p>
							<p class="stat">
								<span class="month-saled">月售{{ good.month_saled }}</span>
								<span class="praise-number"> 赞{{good.praise_num }} </span>
							</p>
							<p v-if="good.product_label_picture" class="tag"><img :src="good.product_label_picture" alt=""></p>
							<p class="price-unit">
								<span class="price">{{ good.min_price | currency }}</span>
								<span class="unit">/{{ good.unit }}</span>
								<AppProductSelector :product="good" class="selector"></AppProductSelector>
							</p>
						</div>
					</div>
				</div>
			</ul>
		</div>
		<!-- 购物车 -->
		<AppShoppingCart :shopInfo="shopInfo" :selectedFoods="selectedFoods"></AppShoppingCart>
		<!-- 产品详情 -->
		<AppProduct :product="selectedProduct" ref="productComponent"></AppProduct>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import AppShoppingCart from '@/components/ShoppingCart/ShoppingCart'
import AppProductSelector from '@/components/ProductSelector/ProductSelector'
import AppProduct from '@/components/Product/Product'

export default {
	components: {
		AppShoppingCart,
		AppProductSelector,
		AppProduct
	}
	,
	data() {
		return {
			shopInfo: {},
			categories: [],
			special: {},
			menuScroll: {},
			goodsScroll: {},
			scrollAreas: [],
			currentAreaIndex: 0,
			selectedProduct: {}
		}
	},
	computed: {
		selectedFoods() {
			let foods = []
			this.categories.forEach(c => {
				c.spus.forEach(f => {
					if (f.count > 0) {
						foods.push(f)
					}
				})
			})
			return foods
		}

	},
	created() {
		this.$axios.get('/api/goods').then(response => {
			let dataSource = response.data
			if (dataSource.code === 0) {
				this.categories = dataSource.data.food_spu_tags
				this.special = dataSource.data.container_operation_source
				this.shopInfo = dataSource.data.poi_info
			}

			this.$nextTick(() => {
				this.initScroll()
			})
		})
	},
	methods: {
		selectMenu(index) {
			let areaRefs = this.$refs.goodsScroll.getElementsByClassName('scroll-area')
			let el = areaRefs[index]
			this.goodsScroll.scrollToElement(el, 200)
		},
		generateBannerBg(url) {
			return `background-image: url("${url}");`
		},
		generateIndexImageBg(url) {
			return `background-image: url("${url}");`
		},
		initScroll() {
			this.menuScroll = new BScroll(this.$refs.menuScroll, { probeType: 3, click: true })
			this.goodsScroll = new BScroll(this.$refs.goodsScroll, { probeType: 3, click: true })
			this.generateScrollAreas()

			this.goodsScroll.on('scroll', pos => {
				// get current area index
				for (let i = 0; i < this.scrollAreas.length; i++) {
					let y = Math.abs(Math.round(pos.y))
					let area = this.scrollAreas[i]
					if (y >= area.start && y <= area.end) {
						this.currentAreaIndex = i
						// console.log(this.currentAreaIndex)

						// scroll to current menu
						let areaRefs = this.$refs.menuScroll.getElementsByClassName(
							'menu-scroll-area'
						)
						let el = areaRefs[i]

						if (!this.elementInViewport(el)) {
							this.menuScroll.scrollToElement(el, 200)
						}
					}
				}
			})
		},
		elementInViewport(element) {
			var rect = element.getBoundingClientRect()
			var html = document.documentElement
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || html.clientHeight) &&
				rect.right <= (window.innerWidth || html.clientWidth)
			)
		},
		generateScrollAreas() {
			let scrollRefs = this.$refs.goodsScroll.getElementsByClassName('scroll-area')

			let height = 0

			for (let area of scrollRefs) {
				this.scrollAreas.push({
					start: height,
					end: height + area.clientHeight
				})
				height = height + area.clientHeight + 1
			}
		},
		count(category) {
			let sum = 0
			category.spus.forEach(c => {
				if (c.count) {
					sum += c.count
				}
			})
			return sum
		},
		getSelectedProduct(product) {
			this.selectedProduct = product
			this.$refs.productComponent.showView()
		}
	}
}
</script>

<style scoped>
@import url('./Goods.css');
</style>
