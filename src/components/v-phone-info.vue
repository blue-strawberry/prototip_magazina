<template>
    <div>
        <v-cart-item
            v-for="(item, index) in cart_data"
            :key="item.id"
            :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)"
        />
        <h1>{{ $route.params.name }}</h1>
        <p>Price: {{$route.params.price | priceFormat}} ₽</p>
          <router-link :to="{name: 'cart', params: {cart_data: CART}}">
                <div>Back to cart</div>
            </router-link> 

        <div style="padding: 20px; color: black">
            Bro, this phone is cool. TRUST MEEEE!
        </div>

        <button class="btn"
        v-if="!CART.some(find => find.name === $route.params.name)"
        @click="addToCart"
        >Add to cart</button>

        <button class="btn"
        v-if="CART.some(find => find.name === $route.params.name)"
        @click="deleteFromCart"
        >Delete from cart</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import vCartItem from './v-cart-item'
import priceFormat from '../price'


export default {
    name: 'v-product',
    components: {
        vCartItem
    },
    data() {
        return {
        }
    },
    
    filters: {
        priceFormat
    },
    props: {
        cart_data: {
           type: Array,
           default() {
               return[]
           } 
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'CART',
            'PHONE_INFO'
        ]),
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART',
            'DELETE_FROM_CART'
        ]),
        addToCart (data) {
            this.ADD_TO_CART(data)
        },
        deleteFromCart (data) {
            this.DELETE_FROM_CART(data)
        }
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
    }
}
</script>

<style>

</style>