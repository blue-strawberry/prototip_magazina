<template>
<div class="popup_wrapper">
    <div class="v-popup">
        <div class="header">
            <h1>Attention!</h1>
            <span>
                <h1
                style="cursor: pointer"
                @click="closePopup"
                >
                ×</h1>
            </span>
        </div>

        <div class="content">
            <slot></slot>
        </div>
    </div>
</div>
    
</template>

<script>
export default {
    name: "v-popup",
    props: {},
    data() {
        return {}
    },
    methods: {
        closePopup() {
            this.$emit('closePopup')
        }
    },
    mounted() {
      let vm = this;
      document.addEventListener('click', function (item) {
        if (item.target === vm.$refs['popup_wrapper']) {
          vm.closePopup()
        }
      })
    },
}
</script>

<style>
.popup_wrapper {
    background: rgba(64,64,64, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
.v-popup {
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10px;
}
.header , .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.content {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>