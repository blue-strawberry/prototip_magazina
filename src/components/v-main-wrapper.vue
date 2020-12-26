<template>
    <div class="v-main-wrapper">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>


export default {
    name: 'v-main-wrapper',
    data() {
        return {
        }
    },
    computed: {},
    mounted() {
        console.log('Hello, where is barbie?')
    }
}
</script>

<style >
    .v-main-wrapper {
        margin: 0 auto;
        max-width: 900px;
    }
</style>