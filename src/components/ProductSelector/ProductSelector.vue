<template>
    <div class="product-selector">
        <transition name="move">
            <i class="icon-remove_circle_outline" v-if="product.count" @click="minus"></i>
        </transition>
        <span class="count" v-if="product.count">{{this.product.count}}</span>
        <i class="icon-add_circle" @click="plus">
            <i class="bg"></i>
        </i>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    props: {
        product: {
            type: Object
        }
    },
    methods: {
        plus() {
            if (!this.product.count) {
                Vue.set(this.product, 'count', 1)
            } else {
                this.product.count++
            }
        },
        minus() {
            this.product.count--
        }
    }

}
</script>

<style scoped>
@import url('./ProductSelector.css');
</style>
