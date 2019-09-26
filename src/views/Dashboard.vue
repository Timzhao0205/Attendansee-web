<template>
    <div class="dashboard">

    </div>
</template>

<script>
    import {fsdb} from '../firebaseConfig';

    let _this = {}
    export default {
        name: "Dashboard",
        data: function () {
            return {
                serviceName: '',
                id: '',
                largestId: 0
            }
        },
        methods: {
            routeTo: function (id) {
                this.$router.push({path: 'dashboard/table/' + id});
            },
            myFunction: function () {
                var btn = document.createElement("BUTTON");
                btn.innerHTML = "CLICK ME";
                document.body.appendChild(btn);
            }
        },
        created() {
            const username = localStorage.getItem("username");
            fsdb.collection("services").where('leaders', 'array-contains', username).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const {
                        id,
                        name,
                        intId
                    } = doc.data();
                    const btn = document.createElement("BUTTON");
                    btn.innerHTML = id + " - " + name;
                    btn.setAttribute('id', id);
                    btn.style.cssText = 'width: 300px; height: 75px; font-size: 10pt; text-align: left; padding-bottom: 15px; padding-left: 25px; font-weight: bold; border-radius: 15px; border: none; margin-left: 75px; margin-top: 25px';
                    btn.onclick = function () {
                        //this.parentElement.removeChild(btn);
                        _this.routeTo(id);
                    };
                    document.body.appendChild(btn);
                    if (intId > this.largestId) {
                        this.largestId = intId;
                    }
                });
            }).then(function () {
            });
        },
        beforeCreate() {
            _this = this;
        },
        destroyed() {
            for (let i = 1; i <= _this.largestId; i++) {
                let id;
                if (i >= 1000) {
                    id = i.toString()
                } else if (i >= 100 && i < 1000) {
                    id = "0" + i.toString();
                } else if (i >= 10 && i < 100) {
                    id = "00" + i.toString()
                } else {
                    id = "000" + i.toString();
                }
                document.getElementById(id).remove();
            }

        }
    }
</script>

<style scoped>
</style>
