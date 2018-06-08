<template>
	<div class="star">
		<span v-for="starClass in startClasses" :class="starClass" class="star-item" :style="sizeStyle"></span>
	</div>
</template>

<script>
const STARS_LENGTH = 5
const STAR_OFF = 'off'
const STAR_ON = 'on'
const STAR_HALF = 'half'

export default {
	props: {
		score: {
			type: Number,
			default: 0
		},
		size: {
			type: Number,
			default: 10
		}
	},
	computed: {
		startClasses() {
			let startClasses = []
			let roundedScore = Math.floor(this.score * 2) / 2
			// console.log(roundedScore)

			let integerPart = Math.floor(roundedScore)
			let decimalPart = roundedScore - integerPart

			for (let i = 0; i < integerPart; i++) {
				startClasses.push(STAR_ON)
			}

			if (decimalPart > 0) {
				startClasses.push(STAR_HALF)
			}

			for (let i = 0; i < Math.floor(STARS_LENGTH - roundedScore); i++) {
				startClasses.push(STAR_OFF)
			}
			// console.log(startClasses)

			// 小于1分，半星显示
			if (integerPart === 0) {
				startClasses[0] = STAR_HALF
			}

			return startClasses
		},
		sizeStyle() {
			return `width: ${this.size}px; height:${this.size}px;`
		}
	}
}
</script>

<style scoped>
.star-item {
	width: 10px;
	height: 10px;
	display: inline-block;
}

.star-item.on {
	background: url('./star24_on@2x.png');
	background-size: cover;
}

.star-item.off {
	background: url('./star24_off@2x.png');
	background-size: cover;
}

.star-item.half {
	background: url('./star24_half@2x.png');
	background-size: cover;
}
</style>
