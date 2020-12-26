<template>
  <div class="order">
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
    <h1>Order</h1>
    <div style="display: inline-block; text-align: left;">
      <div>

        <p class="titles">Name</p>
        <input type="text" v-model="login" v-bind:title="loginconditions" 
        :class="{ 'makered' : (!loginIsCorrect || loginIsEmpty) && buttonClicked }">
        <p v-if="loginIsEmpty && buttonClicked" class="comments"> Required field</p>
        <p v-if="!loginIsCorrect && !loginIsEmpty && buttonClicked" class="comments"> More than five symbols; 
          <br> Only latin alphabet, digits and underscore
        </p>
        
        <p class="titles">Phone</p>
        <input type="text" v-model="phone" v-bind:title="phoneconditions" 
        :class="{ 'makered' : (!phoneIsCorrect || phoneIsEmpty) && buttonClicked }">
        <p v-if="phoneIsEmpty && buttonClicked" class="comments"> Required field</p>
        <p v-if="!phoneIsCorrect && !phoneIsEmpty && buttonClicked" class="comments"> Only 11 digits</p>
        
        <p class="titles">Email</p>
        <input type="text" v-model="email"
        :class="{ 'makered' : (!emailIsCorrect || emailIsEmpty) && buttonClicked }">
        <p v-if="emailIsEmpty && buttonClicked" class="comments"> Required field</p>
        <p v-if="!emailIsCorrect && !emailIsEmpty && buttonClicked" class="comments"> Неверный ввод</p>
        
        <div>
          <router-link :to="{name: 'cart', params: {cart_data: CART}}">
                <div>Back to cart</div>
            </router-link> 
        </div>

        <button v-on:click="checkEmptiness" @click="showModal=true">Apply order</button>
      </div>
      
      

        <div>
          <button 
          
          @click="showPopupInfo"
          >
            Show Info
          </button>

          <v-popup 
          v-if="isInfoPopVisible"
          @closePopup="closePopupInfo"
          >
          <p>
            Dear {{this.login}}, I hope you had fun on this imaginary store, 
            now you have to imaginary pay {{cartTotalCost | priceFormat}} ₽ :p
            </p>
          </v-popup>
        </div>

    </div>
  </div>
  
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import vPopup from './popup/v-popup'
import priceFormat from '../price'
import { bus } from '../main'


export default {
  name: "App",
  components: {
    vPopup
  },
  data() {
    return {
      login: "",
      phone: "",
      email: "",
      buttonClicked: false,
      loginconditions: "Only latin alphabet, digits, underscore and more than five symbols",
      phoneconditions: "Only 11 digits",
      isInfoPopVisible: false
    };
  },
  props: {
    TotalSum: {
      type: Number
    }
  },
  filters: {
        priceFormat
    },
  computed: {
    loginIsEmpty() {
      return this.isEmpty(this.login);
    },
    phoneIsEmpty() {
      return this.isEmpty(this.phone);
    },
    emailIsEmpty() {
      return this.isEmpty(this.email);
    },
    loginIsCorrect() {
      if (this.login.match(/^[A-Za-z0-9_]*$/) && this.login.length > 5) {
        return true;
      }
      else return false;
    },
    phoneIsCorrect() {
      if (this.phone.match(/^[0-9]*$/) && this.phone.length == 11) {
        return true;
      }
      else return false;
    },
    emailIsCorrect() {
      if (this.email.length > 6) {
        return true;
      }
      else return false;
    },
    ...mapGetters([
      'PRODUCTS',
      'CART'
    ]),
    cartTotalCost() {
            let result = []

            if (this.CART.length) {
                for (let item of this.CART) {
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
    isEmpty(a) {
      if (!a) {
        return true;
      }
      else return false;
    },
    checkEmptiness: function() {
      this.buttonClicked = true;
      if (this.loginIsCorrect && this.phoneIsCorrect && this.emailIsCorrect) {
        alert("Молодец! You did it! Here, have a cookie :D");
      }
    },
    showPopupInfo() {
        this.isInfoPopVisible = true;
    },
    closePopupInfo() {
        this.isInfoPopVisible = false;
    },
    getTotal() {
    this.SET_CART_TOTAL();
  },
  }, 
  created() {
    bus.$on('passTotalSum', (data) => {
      this.TotalSum = data;
    })
  },
  ...mapMutations([
       'SET_CART_TOTAL'
    ]),
  
  
};

</script>

<style>

</style>
