<template>
    <div class="attendancetable" id="attendancetable">
        <b-table id="table" :data="data" :columns="columns" :mobile-cards=false :bordered=true :striped=true></b-table>
    </div>
</template>

<script>
    import {fsdb, rtdb} from '../firebaseConfig';

    let _this = {}
    export default {
        name: "AttendanceTable",
        props: {
            id: String
        },
        data: function () {
            return {
                serviceId: '0001',
                test: 'hello',
                data: [],
                columns: []
            }
        },
        methods: {
            createColumns: function () {
                var array = [];
                rtdb.ref('services/' + _this.id).once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        array.push(parseInt(childSnapshot.key));
                    });
                }).then(function () {
                    array.sort(function (a, b) {
                        return a - b
                    });
                    for (var i = 0; i < array.length; i++) {
                        var date = array[i].toString();
                        var labelDate = date.substring(6, 8) + '/' + date.substring(4, 6) + '/' + date.substring(0, 4)
                        _this.columns.push({field: array[i].toString(), label: labelDate, centered: true, width: 100});
                    }
                });
            },
            insertData: function () {
                fsdb.collection("services").where('id', '==', _this.id).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const {
                            leaders,
                            students
                        } = doc.data();
                        for (var i = 0; i < leaders.length; i++) {
                            fsdb.collection("users").where('username', '==', leaders[i]).get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                    const {
                                        firstname,
                                        lastname
                                    } = doc.data();
                                    var name = firstname + " " + lastname;
                                    _this.data.push({'name': name, 'absenceNumber': 0});
                                });
                            });
                        }
                        for (var j = 0; j < students.length; j++) {
                            fsdb.collection("users").where('username', '==', students[j]).get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                    const {
                                        firstname,
                                        lastname
                                    } = doc.data();
                                    var name = firstname + " " + lastname;
                                    _this.data.push({'name': name, 'absenceNumber': 0});
                                });
                            })
                        }
                    });
                }).then(function () {
                    rtdb.ref('services/' + _this.id).once('value').then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            for (var k = 0; k < _this.data.length; k++) {
                                var name = _this.data[k].name;
                                if (childSnapshot.hasChild(name) && childSnapshot.child(name).val() === 'present') {
                                    _this.data[k][childSnapshot.key] = "present";
                                } else {
                                    _this.data[k][childSnapshot.key] = "absent";
                                    _this.data[k]['absenceNumber'] = _this.data[k]['absenceNumber'] + 1;
                                }
                            }
                        });
                    });
                }).then(function () {
                    _this.reload();
                });
            },
            reload: function () {
                if (localStorage.getItem('reloaded')) {
                    localStorage.removeItem('reloaded');
                } else {
                    localStorage.setItem('reloaded', '1');
                    window.location.reload();
                }
            }
        },
        beforeCreate() {
            _this = this;
        },
        created() {
            //alert(this.id);
            //this.columns = [];
            this.columns.push({field: 'name', label: "Name", width: 200},
                {
                    field: 'absenceNumber',
                    label: "Absences",
                    width: 100,
                    centered: true
                });
            this.createColumns();
            this.insertData();
        }
    }
</script>

<style scoped>
    #attendancetable {
        height: 630px;
        overflow: auto;
    }

    #table {
        padding-top: 20px;
        width: 1800px
    }

</style>
