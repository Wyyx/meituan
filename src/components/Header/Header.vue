<template>
	<div class="header">
		<div class="top-bar">
			<div class="back-wrapper">
				<i class="icon-arrow_lift"></i>
			</div>
			<div class="search-wrapper">
				<span class="search-icon"></span>
				<form>
					<input type="text" class="search-input" placeholder="搜索店内商品">
				</form>
			</div>
			<div class="right-wrapper">
				<a href="#" class="sharing-bill-btn">拼单</a>
				<a href="#" class="more-btn">
					<i class="circle"></i>
					<i class="circle"></i>
					<i class="circle"></i>
				</a>
			</div>
		</div>
		<div class="content-wrapper">
			<div class="shop-logo" :style="shopLogoBg"></div>
			<div class="shop-name">
				<span>{{ shopInfo.name }}</span>
			</div>
			<div class="favorite-wrapper">
				<img class="favorite-icon" src="./star.png"></img>
				<div class="favorite-text">收藏</div>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<div class="bulletin">
				<img v-if="shopInfo.discounts2" class="bulletin-icon" :src="shopInfo.discounts2[0].icon_url" alt="">
				<span class="bulletin-text" v-if="shopInfo.discounts2">{{ shopInfo.discounts2[0].info }}</span>
			</div>
			<div class="discount" @click="showBulletin">
				<span v-if="shopInfo.discounts2">{{ shopInfo.discounts2.length }}个活动</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<transition name="fade">
			<div class="bulletin-detail-wrapper" v-if="isShowBulletin">
				<div class="bulletin-detail" :style="bulletinBg">
					<div class="bulletin-detail-logo" :style="shopLogoBg"></div>
					<div class="bulletin-detail-name">{{ shopInfo.name }}</div>
					<div class="bulletin-detail-rating">
						<AppStar :score="shopInfo.wm_poi_score" class="stars"></AppStar>
						<span>{{ shopInfo.wm_poi_score | showZero }}</span>
					</div>
					<div class="bulletin-detail-tips">
						{{ shopInfo.min_price_tip}}
						<i>|</i>
						{{ shopInfo.shipping_fee_tip}}
						<i>|</i>
						{{ shopInfo.delivery_time_tip}}
					</div>
					<div class="bulletin-detail-time">
						<span>配送时间：</span>{{ shopInfo.shipping_time }}
					</div>
					<div class="divider"></div>
					<div class="activity-info">
						<img v-if="shopInfo.discounts2" class="bulletin-icon" :src="shopInfo.discounts2[0].icon_url" alt="">
						<span class="bulletin-text" v-if="shopInfo.discounts2">{{ shopInfo.discounts2[0].info }}</span>
					</div>
				</div>
				<div class="bulletin-close">
					<i class="icon-close"></i>
					<div class="circle" @click="closeBulletin"></div>
				</div>
			</div>
		</transition>

		<div class="bg-wrapper" :style="headerBg"></div>

	</div>

</template>

<script>
import AppStar from '@/components/Star/Star'
export default {
	props: {
		shopInfo: {
			type: Object,
			default: {}
		}
	},
	components: {
		AppStar
	},
	data() {
		return {
			isShowBulletin: false
		}
	},
	computed: {
		headerBg() {
			return `background-image: url("${this.shopInfo.head_pic_url}");`
		},
		shopLogoBg() {
			return `background-image: url("${this.shopInfo.pic_url}");`
		},
		bulletinBg() {
			return `background-image: url("${this.shopInfo.poi_back_pic_url}");`
		}
	},
	methods: {
		closeBulletin() {
			this.isShowBulletin = false
		},
		showBulletin() {
			this.isShowBulletin = true
		}
	},
	filters: {
		showZero: function (value) {
			if (value - Math.floor(value) === 0) {
				return value + '.0'
			}
			return value
		}
	}
}
</script>

<style scoped>
@import url('./Header.css');
</style>
