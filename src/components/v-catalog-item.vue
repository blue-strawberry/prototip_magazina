<template>
    <div class="v-catalog-item">
        <img :src="require('../assets/' + product_data.image)" alt="img">
        <p style="font-weight: bold">{{product_data.name}}</p>
        <p class="v-catalog-item_price">Price: {{product_data.price | priceFormat}} ₽</p>
        
        <button class="btn"
        v-if="!CART.some(find => find.name === product_data.name)"
        @click="addToCart"
        >Add to cart</button>

        <button class="btn"
        v-if="CART.some(find => find.name === product_data.name)"
        @click="deleteFromCart"
        >Delete from cart</button>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import priceFormat from '../price'


export default {
    name: 'v-catalog-item',
    props: {
        product_data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    filters: {
        priceFormat
    },
    computed: {
        ...mapGetters([
            'CART'
        ])
    },
    methods: {
        addToCart() {
           this.$emit('addToCart', this.product_data);
        },
        deleteFromCart() {
           this.$emit('deleteFromCart', this.product_data);
        }
    },
    mounted() {
        this.$set(this.product_data, 'quantity', 1)
    },
    data() {
        return {}
    }
}
</script>

<style>
    .v-catalog-item {
        box-shadow: 0 0 8px 0 gray;
        flex-basis: 25%;
        margin-bottom: 32px;
        padding: 16px;
    }
</style>