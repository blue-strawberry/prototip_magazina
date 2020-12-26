<template>
    <div class="v-cart">
        <h1>Cart</h1>
        <div class="v-catalog__link_to_cart">
            <router-link :to="{name: 'catalog'}">
                <div >Home</div>
            </router-link>
            <router-link :to="{name: 'cart'}">
                <div>Cart</div>
            </router-link>
            <router-link :to="{name: 'order'}">
                <div >Order</div>
            </router-link>
        </div>
        <p v-if="!cart_data.length">There are no products in cart...</p>
        <v-cart-item
            v-for="(item, index) in cart_data"
            :key="item.id"
            :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)"
            @increment="increment(index)"
            @decrement="decrement(index)"
        />
        <div class='v-cart__total'>
            <p>Total:</p>
            <p> {{cartTotalCost | priceFormat}} ₽</p>
        </div>
        <router-link :to="{name: 'order'}">
                <div>Next step</div>
            </router-link>
    </div>
</template>

<script>
import vCartItem from './v-cart-item'
import priceFormat from '../price'
import {mapActions} from 'vuex'
import { bus } from '../main'


export default {
    name: 'v-cart',
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
        },
        TotalSum: {
            type: Number
        }
    },
    computed: {
        cartTotalCost() {
            let result = []

            if (this.cart_data.length) {
                for (let item of this.cart_data) {
                result.push(item.price * item.quantity)
                }

                result = result.reduce(function (sum, el) {
                    return sum + el;
                })

            return result;
            } else {
                return 0
            }
            
        }
    },
    methods: {
        ...mapActions([
            'DELETE_FROM_CART',
            'INCREMENT_CART_ITEM',
            'DECREMENT_CART_ITEM'
        ]),
        increment(index) {
            this.INCREMENT_CART_ITEM(index)
        },
        decrement(index) {
            this.DECREMENT_CART_ITEM(index)
        },
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index)
        },
        passTotal(){
            this.TotalSum = this.cartTotalCost;
            bus.$emit('passTotalSum', this.TotalSum)
        }, 
    },
}
</script>

<style >
    .v-cart__total {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        background-color: greenyellow;
    }
</style>