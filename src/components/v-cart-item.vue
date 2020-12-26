<template>
    <div class="v-cart-item">
        <div>
            <img :src="require('../assets/' + cart_item_data.image)" alt="img">
        </div>
        <div>
            <p>Title:</p>
            <!-- AQUIIIIIIIIIIIIII -->
            <router-link :to="{ name: 'phoneInfo', params: {id: cart_item_data.id, name: cart_item_data.name, price: cart_item_data.price }}">
                <div class="v-catalog-item_name" style="font-weight: bold">{{cart_item_data.name}}</div>
            </router-link>
        </div>
        <div>
            <p>Price:</p>
            <p>{{cart_item_data.price | priceFormat}} ₽</p>
        </div>
        <div class="v-cart-item_quantity">
            <p>Quantity:</p>
            <span>
                <span class="quant_btn" @click="decrementItem">-</span>
                {{cart_item_data.quantity}}
                <span class="quant_btn" @click="incrementItem">+</span>
            </span>
            
        </div>
        <div>
            <p>Total:</p>
            <p>{{itemTotalCost | priceFormat}} ₽</p>
        </div>
        <button @click="deleteFromCart">Delete</button>
    </div>
</template>

<script>
import priceFormat from '../price'

export default {
    name: "v-cart-item",
    props: {
        cart_item_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    filters: {
        priceFormat
    },
    computed: {
        itemTotalCost() {
            return this.cart_item_data.quantity * this.cart_item_data.price
        }
    },
    methods: {
        deleteFromCart() {
            this.$emit('deleteFromCart')
        },
        decrementItem() {
            this.$emit('decrement')
        },
        incrementItem() {
            this.$emit('increment')
        },
    },
    mounted () {
        this.$set(this.cart_item_data, 'quantity', 1)
    }
}
</script>

<style>
    .v-cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        box-shadow: 0 0 8px 0 gray;
        flex-basis: 25%;
        margin-bottom: 32px;
        padding: 16px;
    }
    .quant_btn {
        cursor: pointer;
    }
</style>