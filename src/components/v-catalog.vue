<template>
    <div class="v-catalog">
        <div class="v-catalog__link_to_cart">
            <router-link :to="{name: 'catalog'}">
                <div >Home</div>
            </router-link>
            <router-link :to="{name: 'cart', params: {cart_data: CART}}">
                <div>Cart</div>
            </router-link>
            <router-link :to="{name: 'order'}">
                <div >Order</div>
            </router-link>
        </div>
        <div class="v-cart_count">
            <router-link :to="{name: 'cart', params: {cart_data: CART}}">
                <div>Cart: {{CART.length}}</div>
            </router-link>
        </div>
        <h1>Catalog</h1>
        <v-select
            class="select_box"
            :selected="selected"
            :options="categories"
            @select="sortByCategories"
        />
        <div class="items">
            <v-catalog-item 
                v-for="(product, index) in filteredProducts" 
                :key="product.id"
                :product_data="product"
                @addToCart='addToCart'
                @deleteFromCart='deleteFromCart(index)'
            />
        </div>
            
    </div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
import vSelect from './v-select'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'v-catalog',
    components: {
        vCatalogItem,
        vSelect
    },
    props: {},
    data() {
        return {
            categories: [
                {name: 'All', value: 'all'},
                {name: 'iPhone', value: 'p'},
                {name: 'Huawei', value: 'h'},
                {name: 'Samsung', value: 's'},
                {name: 'Nokia', value: 'n'}
            ],
            selected: 'All',
            sortedProducts: []
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'CART'
        ]),
        filteredProducts() {
            if (this.sortedProducts.length) {
                return this.sortedProducts
            }
            else {
                return this.PRODUCTS
            }
        }
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
        deleteFromCart (index) {
            this.DELETE_FROM_CART(index)
        },
        sortByCategories(category) {
            this.sortedProducts = [];
            let vm = this;
            this.PRODUCTS.map(function(item) {
                if(item.category === category.name) {
                    vm.sortedProducts.push(item);
                }
            })
            this.selected = category.name;
        }
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
    }
}
</script>

<style >
    .v-catalog {
        align-items: center;
    }
    .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .v-catalog__link_to_cart {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 16px;
        border: solid 1px gray;
    }
    .v-cart_count {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 16px;
        border: solid 1px gray;
    }
    .select_box {
        padding-bottom: 10px;
    }
</style>