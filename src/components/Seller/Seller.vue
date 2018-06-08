<template>
    <div class="seller-wrapper">
        <transition name="fade">
            <div class="fullscreen" @click="hideFullscreen" v-if="isShowFullscreen">
                <img class="pic" :src="fullscreenImageUrl" alt="">
            </div>
        </transition>
        <div class="seller">

            <AppDivider></AppDivider>
            <div class="wrapper-1">
                <div class="address">
                    <div class="flex-item icon-wrapper-1">
                        <img class="icon-1" src="./address.png">
                    </div>
                    <div class="flex-item title">{{ seller.address }}</div>
                    <div class="flex-item icon-wrapper-2">
                        <img src="./phone.png" alt="" class="icon-2">
                    </div>
                </div>
                <div class="pics-wrapper" ref="listRef">
                    <ul ref="ulRef" class="pictures" v-if="seller.poi_env">
                        <li ref="picRef" class="flex-item pic" @click="showFullscreen(picUrl)" v-for="picUrl in seller.poi_env.thumbnails_url_list" :style="storeBg(picUrl)"></li>
                    </ul>
                </div>
                <div class="safety-archive">
                    <div class="flex-item icon-wrapper-1">
                        <img class="icon-1" src="./safety.png">
                    </div>
                    <div class="flex-item title">查看食品安全档案</div>
                </div>
            </div>

            <AppDivider></AppDivider>
            <div class="wrapper-2">
                <div class="delivery-service">
                    <div class="flex-item icon-wrapper-1">
                        <img class="icon-1" src="./delivery.png">
                    </div>
                    <div class="flex-item title">配送服务：由商家提供配送服务</div>
                </div>
                <div class="delivery-time">
                    <div class="flex-item icon-wrapper-1">
                        <img class="icon-1" src="./time.png">
                    </div>
                    <div class="flex-item title">配送服务：{{seller.shipping_time}}</div>
                </div>
            </div>

            <AppDivider></AppDivider>
            <div class="wrapper-3">
                <div class="tags">
                    <div class="flex-item icon-wrapper-1">
                        <img class="icon-1" src="./address.png">
                    </div>
                    <div class="flex-item title">商务服务</div>
                    <div class="flex-item icon-wrapper-2" v-if="seller.poi_service">
                        <img :src="seller.poi_service[0].icon" alt="" class="icon-2">
                    </div>
                    <div class="flex-item title">可开发票</div>
                </div>
                <div class="promotion-info">
                    <div class="flex-item icon-wrapper-1" v-if="seller.discounts2">
                        <img class="icon-1" :src="seller.discounts2[0].icon_url">
                    </div>
                    <div class="flex-item title">{{ seller.address }}</div>
                </div>
            </div>
            <AppDivider></AppDivider>
        </div>
    </div>
</template>

<script>
import AppDivider from '@/components/Divider/Divider'
import BScroll from 'better-scroll'

export default {
    components: {
        AppDivider
    },
    data() {
        return {
            seller: {},
            listScroll: undefined,
            isShowFullscreen: false,
            fullscreenImageUrl: ''
        }
    },
    created() {
        this.$axios.get('/api/seller').then(response => {
            let dataSource = response.data
            if (dataSource.code === 0) {
                this.seller = dataSource.data

                this.$nextTick(() => {
                    this.initScroll()
                })
            }
        })



    },
    methods: {
        storeBg(url) {
            return `background: url("${url}"); background-size: cover; background-repeat: no-repeat; background-position: center;`
        },
        initScroll() {
            if (this.listScroll) {
                this.listScroll.refresh()
            } else {
                let picWidth = this.$refs.picRef[0].clientWidth
                let margin = 11
                let width = (picWidth + 11) * this.$refs.picRef.length
                this.$refs.ulRef.style.width = width + 'px'

                this.listScroll = new BScroll(this.$refs.listRef, { probeType: 3, click: true, scrollX: true })
            }
        },
        showFullscreen(url) {
            this.isShowFullscreen = true
            this.fullscreenImageUrl = url
        },
        hideFullscreen() {
            this.isShowFullscreen = false
        }
    }

}
</script>

<style lang="scss" scoped>
@import './Seller.scss';
</style>
