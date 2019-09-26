<template>
    <div class="home">
        <div align="center">
            <img id="imageBackground" src="../assets/web.png">
        </div>
        <span id="link" v-on:click="toPrivacy">privacy policy</span>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            //HelloWorld
        },
        methods: {
            toPrivacy: function () {
                this.$router.push({path: '/privacy'});
            }
        }
    }
</script>

<style scoped>
    #imageBackground {
        height: 650px;
    }

    #link {
        margin-top: 50px;
        margin-left: 50px;
        color: #557DFF;
        font-size: 14pt;
        font-weight: bold;
    }

</style>
