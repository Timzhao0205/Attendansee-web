<template>
    <div id="signin">
        <div id="left" align="center">
            <div id="title">Sign in to your account</div>
            <form id="inputs">
                <br>
                <input id="username" type="text" name="username" placeholder="Username or Email" value="">
                <br><br>
                <input id="password" type="password" name="password" placeholder="Password" value="">
                <br><br>
                <input id="signInButton" type="button" value="Sign in" v-on:click="signIn">
            </form>
        </div>
        <div id="right">

        </div>
    </div>
</template>

<script>
    import {fsdb} from '../firebaseConfig';

    export default {
        name: "Signin",
        data: function () {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            signIn: function () {
                const inputUsername = document.getElementById("username").value.toLowerCase();
                const inputPassword = document.getElementById("password").value;
                let type = "username";
                if (inputUsername !== "" && inputPassword !== "") {
                    if (inputUsername.includes(".com")) {
                        type = "email";
                    }
                    fsdb.collection("users").where(type, '==', inputUsername).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            const {
                                username,
                                firstname,
                                lastname,
                                password
                            } = doc.data();
                            var md5 = require('md5');
                            if (md5(inputPassword) === password) {
                                localStorage.setItem('username', username);
                                this.$router.push({path: 'dashboard'});
                            }else {
                                alert("incorrect password.");
                            }
                        })
                    });
                } else {
                    alert("cannot be blank")
                }
            },
        }
    }
</script>

<style scoped>
    #signin {
        width: 100%;
        padding-top: 25px;
        display: flex;
    }

    #left {
        width: 40%;
        height: 630px;
        align-items: center;
        background-color: #f7f7f7;
    }

    #inputs {
        padding-top: 0px;
    }

    #title {
        padding-top: 100px;
        font-size: 20pt;
    }

    #username {
        width: 60%;
        height: 45px;
        border-radius: 100px;
        border: none;
        background-color: white;
        padding-left: 12.5px;
        font-size: 12pt;
        font-weight: bold;
        font-family: Roboto;
    }

    #password {
        width: 60%;
        height: 45px;
        border-radius: 100px;
        border: none;
        background-color: white;
        padding-left: 12.5px;
        font-size: 12pt;
        font-weight: bold;
        font-family: Roboto;
    }

    #signInButton {
        width: 60%;
        height: 45px;
        border-radius: 100px;
        border: none;
        font-weight: bold;
        color: white;
        font-size: 18pt;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #557DFF;
    }

    #right {
        width: 60%;
        height: 630px;
    }

    #imageBackground {
        height: 630px;
    }

</style>
