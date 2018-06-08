import Vue from 'vue'
import moment from 'moment'

Vue.filter('abbr', (value, max_length) => {
	if (value) {
		if (value.length > max_length) {
			return value.substr(0, max_length) + '...'
		} else {
			return value
		}
	}
})

Vue.filter('currency', value => {
	return '￥' + value
})

Vue.filter('date', value => {
	if (value) {
		return moment(value * 1000).format('YYYY/MM/DD hh:mm')
	}
})
