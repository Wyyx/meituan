<template>
    <transition name="slide">

        <div class="product" v-show="show" ref="listRef">
            <ul>
                <div class="top">
                    <div class="index-wrapper">
                        <div class="index-image" :style="indexImageBg(product.picture)"></div>
                        <div class="icon-close-wrapper" @click="hideView">
                            <i class="icon-close"></i>
                        </div>
                        <img class="share" src="./share.png" alt="">
                        <img class="more" src="./more.png" alt="">
                    </div>
                    <div class="info-wrapper">
                        <h3 class="name">{{ product.name }}</h3>
                        <p class="month-saled">{{ product.month_saled_content }}</p>
                        <img class="tag" v-if="product.product_label_picture" :src="product.product_label_picture" alt="">
                        <p class="price-wrapper">
                            <span class="price">{{ product.min_price | currency }}</span>
                            <span class="unit">/{{ product.unit }}</span>
                        </p>
                        <button v-show="!product.count" @click="plus()" class="select-btn">选规格</button>
                        <AppProductSelector v-show="product.count" :product="product" class="selector"></AppProductSelector>
                    </div>
                </div>
                <AppDivider></AppDivider>
                <div class="bottom">
                    <div class="header">
                        <span class="title">外卖评价</span>
                        <span v-if="product.rating" class="praise-degree">({{ product.rating.like_ratio }})</span>
                        <p v-if="product.rating" class="comment-count">{{ product.rating.comment_count }}条评论
                            <i class="icon-keyboard_arrow_right"></i>
                        </p>
                    </div>
                    <div class="comment-list" v-if="product.rating">
                        <div class="comment" v-for="comment in product.rating.comment_list">
                            <div class="left">
                                <img v-if="comment.user_icon" :src="comment.user_icon" class="avatar">
                                <img v-if="!comment.user_icon" src="./anonymity.png" class="avatar">
                            </div>
                            <div class="right">
                                <div class="header">
                                    <span class="user-name">{{ comment.user_name }}</span>
                                    <span class="date">{{ comment.comment_unix_time | date }}</span>
                                </div>
                                <div class="comment-content">
                                    {{ comment.comment_content }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import AppDivider from '@/components/Divider/Divider'
import AppProductSelector from '@/components/ProductSelector/ProductSelector'
import BScroll from 'better-scroll'


export default {
    components: {
        AppProductSelector,
        AppDivider
    },
    props: {
        product: {}
    },
    data() {
        return {
            show: false,
            listScroll: undefined
        }
    },
    created() {
        this.$nextTick(() => {
            this.initScroll()
        })
    },
    methods: {
        showView() {
            this.show = true
        },
        hideView() {
            this.show = false
        },
        indexImageBg(url) {
            return `background-image: url("${url}");`
        },
        plus() {
            if (!this.product.count) {
                Vue.set(this.product, 'count', 1)
            } else {
                this.product.count++
            }
        },
        initScroll() {
            if (this.listScroll) {
                this.listScroll.refresh()
            } else {
                this.listScroll = new BScroll(this.$refs.listRef, { probeType: 3, click: true })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './Product.scss';
</style>
