<template>
	<div id="app">
		<!-- 头部 -->
		<AppHeader :shopInfo="shopInfo"></AppHeader>
		<!-- 导航 -->
		<AppNav :commentsCount="this.ratings.comment_num"></AppNav>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import AppNav from '@/components/Nav/Nav'
import AppHeader from '@/components/Header/Header'

export default {
	name: 'App',
	components: {
		AppHeader,
		AppNav
	},
	data() {
		return {
			shopInfo: {},
			ratings: {}
		}
	},
	created() {
		this.$axios.get('/api/goods').then(response => {
			let dataSource = response.data
			if (dataSource.code === 0) {
				this.shopInfo = dataSource.data.poi_info
			}
		})

		this.$axios.get('/api/ratings').then(response => {
			let dataSource = response.data
			if (dataSource.code === 0) {
				this.ratings = dataSource.data
			}
		})
	}
}
</script>

<style>

</style>
