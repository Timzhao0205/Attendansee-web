<template>
    <div id="app">
        <header id="header">
            <div id="left">
                <a id="container">
                    <img alt="logo" src="./assets/logo.png" id="logo" v-on:click="toHome">
                    <img alt="logo text" src="./assets/text.png" id="logoText" v-on:click="toHome">
                </a>
            </div>
            <div id="right" align="right">
                <a id="nav">
                    <img id="block">
                    <span id="mobileapp">App</span>
                    <span id="signin" v-on:click="toSignin">Sign in</span>
                    <button id="dashboardbutton" v-on:click="toDashboard">Dashboard</button>
                </a>
            </div>
        </header>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "App",
        methods: {
            toHome: function () {
                this.$router.push({path: '/'});
            },
            toDashboard: function () {
                this.$router.push({path: '/dashboard'});
            },
            toSignin: function () {
                this.$router.push({path: '/signin'});
            }
        }
    }
</script>

<style>
    #app {
        font-family: "Open Sans";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
    }

    #header {
        width: 100%;
        display: flex;
    }

    #left {
        padding: 0;
        width: 50%;
    }

    #container {
        display: inline-block;
        padding-top: 25px;
        padding-left: 75px;
        vertical-align: middle;
        min-width: 50px;
        color: inherit;
        text-decoration: none;
    }

    #logo {
        width: 55px;
        vertical-align: middle;
    }

    #logoText {
        width: 200px;
        margin-left: 15px;
        vertical-align: middle;
    }

    #right {
        padding: 0;
        width: 50%;
    }

    #nav {
        display: inline-block;
        padding-top: 27px;
        padding-left: 0px;
        vertical-align: middle;
        min-width: 50px;
        color: inherit;
        text-decoration: none;
        align-content: end;
    }

    #block {
        visibility: hidden;
        height: 37.24px;
        width: 0px;
        vertical-align: middle;
    }

    #mobileapp {
        height: 37.24px;
        vertical-align: middle;
        margin-right: 60px;
        font-weight: 600;
        font-size: 16pt;
        color: #557DFF;
    }

    #signin {
        height: 37.24px;
        vertical-align: middle;
        margin-right: 60px;
        font-weight: 600;
        font-size: 16pt;
        color: #557DFF;
    }

    #dashboardbutton {
        background-color: #557DFF;
        border: none;
        color: white;
        height: 37.24px;
        width: 175px;
        border-radius: 100px;
        outline:none;
        margin-right: 75px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16pt;
        font-weight: 600;
        cursor: pointer;
        padding-bottom: 0.7%;
        vertical-align: middle;
    }

</style>
