const goods = require('../data/01-商品页(点菜).json')
const ratings = require('../data/02-商品页(评价).json')
const seller = require('../data/03-商品页(商家).json')

module.exports = app => {
	app.get('/', (req, res, next) => {
		req.url = '/index.html'
		next()
	})

	app.get('/api/goods', (req, res) => {
		res.send(goods)
	})

	app.get('/api/ratings', (req, res) => {
		res.send(ratings)
	})

	app.get('/api/seller', (req, res) => {
		res.send(seller)
	})
}
