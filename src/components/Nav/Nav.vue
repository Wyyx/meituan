<template>
	<div class="nav">
		<router-link to="/goods" class="nav-item">商品
			<i class="line"></i>
		</router-link>
		<router-link to="/ratings" class="nav-item">评价({{ commentsCount }})
			<i class="line"></i>
		</router-link>
		<router-link to="/seller" class="nav-item">商家
			<i class="line"></i>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'Nav',
	props: {
		commentsCount: 0
	}
}
</script>

<style scoped>
.nav {
	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #e5e5e5;
	border-top: 1px solid #e5e5e5;
	box-sizing: border-box;
}

.nav .nav-item {
	flex: 1 0 auto;
	text-align: center;
	text-decoration: none;
	color: #666666;
	position: relative;
}

.nav .nav-item.active {
	flex: 1 0 auto;
	text-align: center;
	text-decoration: none;
	color: #ffbb22;
}

.nav-item.active .line {
	width: 20px;
	height: 2px;
	background-color: #ffbb22;
	display: inline-block;
	position: absolute;
	left: 50%;
	bottom: 0px;
	margin-left: -10px;
}
</style>
