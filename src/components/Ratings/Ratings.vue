<template>
    <div class="ratings-wrapper">
        <transition name="fade">
            <div class="buyers-show-fullscreen" @click="hideFullscreen" v-if="isShowBuyerShow">
                <img class="pic" :src="buyersShowUrl" alt="">
            </div>
        </transition>
        <div class="ratings">
            <div class="rating-chart">
                <div class="left">
                    <div class="seller-rating">
                        <p class="score">{{ ratings.comment_score }}</p>
                        <p class="text"> 商家评分</p>
                    </div>
                    <div class="other-rating">
                        <p class="flavor">
                            <span>口味</span>
                            <AppStar class="stars" :score="ratings.food_score" :size="11"></AppStar>
                            <span class="score">{{ ratings.food_score }}</span>
                        </p>
                        <p class="pack">
                            <span>包装</span>
                            <AppStar class="stars" :score="ratings.pack_score" :size="11"></AppStar>
                            <span class="score">{{ ratings.pack_score }}</span>
                        </p>
                    </div>
                </div>
                <div class="right">
                    <p class="deliver-score">{{ ratings.delivery_score }}</p>
                    <p class="deliver-text">配送评分</p>
                </div>
            </div>
            <AppDivider></AppDivider>
            <!-- <div class="rating-content-wrapper"> -->
            <div class="rating-content" ref="listRef">
                <ul>
                    <div class="nav">
                        <p v-for="(tab, index) in ratings.tab" class="flex-item" @click="setTab(index)" :class="{ active: selectedTab === index, left: index === 0 ,right:  index === ratings.tab.length - 1  }">
                            <img v-if="index === 2 && selectedTab !== 2" src="./icon_sub_tab_dp_normal@2x.png" alt="" class="icon">
                            <img v-if="index === 2 && selectedTab === 2" src="./icon_sub_tab_dp_highlighted@2x.png" alt="" class="icon"> {{ tab.comment_score_title }}
                        </p>
                    </div>
                    <div class="tags">
                        <p class="flex-item" v-for="item in ratings.labels"> {{ item.content }} {{ item.label_count }} </p>
                    </div>
                    <div class="rating-list">
                        <div class="comment" v-for="comment in filteredComments">
                            <div class="left">
                                <img v-if="comment.user_pic_url" :src="comment.user_pic_url" class="avatar">
                                <img v-if="!comment.user_pic_url" src="./anonymity.png" class="avatar">
                            </div>
                            <div class="right">
                                <div class="header">
                                    <div class="flex-item name-score">
                                        <p class="user-name"> {{ comment.user_name }} </p>
                                        <p class="score">
                                            <span class="title">评分</span>
                                            <AppStar class="stars" :score="comment.order_comment_score"></AppStar>
                                        </p>
                                    </div>
                                    <div class="flex-item date">{{ comment.comment_time | date }}</div>
                                </div>
                                <div class="comment-content" v-html="commentStr(comment.comment)"></div>
                                <div class="buyers-show">
                                    <div class="pic" v-for="pic in comment.comment_pics" :style="buyersShowBg(pic.thumbnail_url)" @click="showFullscreen(pic.url)"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ul>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import AppDivider from '@/components/Divider/Divider'
import AppStar from '@/components/Star/Star'
import BScroll from 'better-scroll'

const ALL = 0
const IMAGE = 1
const DP = 2

export default {
    components: {
        AppDivider,
        AppStar
    },
    data() {
        return {
            ratings: {},
            selectedTab: ALL,
            listScroll: undefined,
            isShowBuyerShow: false,
            buyersShowUrl: '',
        }
    },
    computed: {
        filteredComments() {

            if (this.selectedTab === ALL) {
                return this.ratings.comments
            }

            if (this.selectedTab === IMAGE) {
                return this.ratings.comments.filter(c =>
                    c.comment_pics.length > 0
                )
            }

            if (this.selectedTab === DP) {
                return this.ratings.comments_dp.comments
            }

        }
    },
    created() {
        this.$axios.get('/api/ratings').then(response => {
            let dataSource = response.data
            if (dataSource.code === 0) {
                this.ratings = dataSource.data
            }
        })

        this.$nextTick(() => {
            this.initScroll()
        })
    },
    methods: {
        setTab(tab) {
            this.selectedTab = tab
        },
        initScroll() {
            if (this.listScroll) {
                this.listScroll.refresh()
            } else {
                this.listScroll = new BScroll(this.$refs.listRef, { probeType: 3, click: true })
            }
        },
        commentStr(comment) {
            let pat = /#[^#]+#/
            return comment.replace(pat, '<span class="product-link">$&</span>')
        }
        ,
        buyersShowBg(url) {
            return `background: url("${url}"); background-size: contain; background-repeat: no-repeat; background-position: center;`
        },
        showFullscreen(url) {
            this.isShowBuyerShow = true
            this.buyersShowUrl = url
        },
        hideFullscreen() {
            this.isShowBuyerShow = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import './Ratings.scss';
</style>
