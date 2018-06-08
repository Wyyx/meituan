<template>
    <div class="cart-wrapper">
        <div v-show="showList" @click="toggleShowList" class="mask"></div>
        <div class="shopping-cart">
            <div class="content-left">
                <div class="logo-wrapper" :class="{ highlight: totalCount > 0 }" @click="toggleShowList">
                    <i class="logo icon-shopping_cart" :class="{ highlight: totalCount > 0 }"></i>
                    <i v-show="totalCount > 0" class="count">{{ totalCount }}</i>
                </div>
                <div class="price-wrapper">
                    <p v-show="totalCount > 0" class="total-price">￥{{ totalPrice }}</p>
                    <p class="shipping-price" :class="{ highlight: totalCount > 0 }">另需配送费{{ shopInfo.shipping_fee_tip }}</p>
                </div>
            </div>
            <div class="content-right">
                <p v-show="totalCount == 0" class="limit-price">{{shopInfo.min_price_tip}}</p>
                <p v-show="totalCount > 0" class="checkout"> 去结算</p>
            </div>
            <div class="list" v-show="showList">
                <div v-if="shopInfo.discounts2" class="top-info">{{ shopInfo.discounts2[0].info }}</div>
                <div class="header">
                    <div class="left">1号口袋</div>
                    <div class="right" @click="emptyCart"><img src="./ash_bin.png">清空购物车</div>
                </div>
                <div class="product-list" ref="listContent">
                    <ul>
                        <li class="food" v-for="food in selectedFoods">
                            <div class="left">
                                <p class="title">{{food.name | abbr(10) }}</p>
                                <p class="unit" v-show="!food.description">{{ food.unit }}</p>
                                <p class="description">{{food.description | abbr(10) }}</p>
                            </div>
                            <div class="right">
                                <p class="price"> {{ food.min_price | currency }}</p>
                                <p class="selector-wrapper">
                                    <ProductSelector :product="food" class="selector"></ProductSelector>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bottom"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import ProductSelector from '@/components/ProductSelector/ProductSelector'
export default {
    data() {
        return {
            showList: false,
            listScroll: undefined
        }
    },
    props: {
        shopInfo: {
            type: Object,
            default: {}
        },
        selectedFoods: {
            type: Array,
            default() {
                return [
                    // { min_price: 35, count: 2 }
                ]
            }
        }
    },
    components: {
        ProductSelector
    },
    computed: {
        totalPrice() {
            let num = 0
            this.selectedFoods.forEach(e => {
                num += e.min_price * e.count
            });
            return num;
        },
        totalCount() {
            let num = 0
            this.selectedFoods.forEach(e => {
                num += e.count
            });

            if (num === 0) {
                this.showList = false
            }

            return num;
        },
    },
    methods: {
        toggleShowList() {
            if (this.totalCount === 0) {
                this.showList = false
            } else {
                this.showList = !this.showList
            }
        },
        emptyCart() {
            this.selectedFoods.forEach(f =>
                f.count = 0
            )
        },
        initScroll() {
            if (this.listScroll) {
                this.listScroll.refresh()
            } else {
                this.listScroll = new BScroll(this.$refs.listContent, { probeType: 3, click: true })
            }
        }
    },
    created() {
        this.$nextTick(() => {
            this.initScroll()
        })
    }
}
</script>

<style scoped>
@import url('./ShoppingCart.css');
</style>
