<template>
    <div style="height: 100%;" :class="theme === 0 ? 'coral' : 'burlywood'">
        <button @click="toggleTheme">Toggle theme</button>
        <button @click="logout()">Logout</button>
        <table class="table table-dark">
			<tr v-for="item in students" v-bind:key="item._id">
                <template v-if="item._id !== editStudentId">
                    <td><img :src="item.photo" alt="" width="50" height="50"></td>
                    <td>
                        <router-link :to="'/student-info/' + item._id">
                            {{item.name}}
                        </router-link>
                    </td>
                    <td><input type="checkbox" v-model="item.isDonePr"></td>
                    <td>{{item.group}}</td>
                    <td v-show="item.group === getCurrentUser.group"><a href = "#" @click="deleteStudent(item._id)">Видалити</a></td>
                    <td><a href = "#" @click="setEditStudent(item)"><img width="30" height="30" v-bind:src="loadPen"></a></td>
                </template>
                <template v-else>
                    <td><input type="text" v-model="editState.name"></td>
                    <td><input type="checkbox" v-model="editState.isDonePr"></td>
                    <td>
                        <select v-model="editState.group">
                            <option value="RPZ 17 1/9">RPZ 17 1/9</option>
                            <option value="RPZ 17 2/9">RPZ 17 2/9</option>
                        </select>
                    </td>
                    <td><button @click="editStudent(item)">EDIT</button></td>
                </template>
			</tr>
		</table>
        <div>
            <button @click="() => { setCount(count - 1) }">-</button>
            <p>{{ count }}</p>
            <button @click="() => { setCount(count + 1) }">+</button>
        </div>
		<input v-model="addForm.name">
		<input type="checkbox" v-model="addForm.isDonePr">
		<select v-model="addForm.group">
			<option value="RPZ 17 1/9">RPZ 17 1/9</option>
			<option value="RPZ 17 2/9">RPZ 17 2/9</option>
		</select>
		<button @click="addStudent()">Add student</button>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import pen from '../img/pen.png'

export default {
    data() {
        return {
            // theme: JSON.parse(localStorage.getItem('theme')),
            students: [],
            search: '',
            piece: '',
            editStudentId: '',
            addForm: {
                group: '',
                isDonePr: false,
                name: '',
            },
            editState: {
                group: '',
                isDonePr: false,
                name: '',
            },
        }
    },
    mounted: function () {
        axios.get('http://46.101.212.195:3000/students').then((response) => {
            this.setCount(response.data.length)
            this.students = response.data
        })
    },
    computed: {
        loadPen() {
            return pen
        },
        count() {
            return this.$store.getters.getCount
        },
        theme() {
            return this.$store.getters.getTheme
        },
        getCurrentUser() {
            return this.$store.getters.getUser
        },
    },
    methods: {
        logout() {
            this.$store.commit('setUser', null)
            this.$router.push('/login')
        },
        setCount(value) {
            this.$store.commit('setCount', value);
        },
        deleteStudent(studId) {
            axios.delete("http://46.101.212.195:3000/students/" + studId).then(()=>{
                this.students = this.students.filter((element) => {
                    return element._id !== studId;
                });
            })
        },
        addStudent() {
            axios.post('http://46.101.212.195:3000/students', {
                name: this.addForm.name,
                group: this.addForm.group,
                isDonePr: this.addForm.isDonePr,
            }).then((response) => this.students.push(response.data))
        },
        setEditStudent(student) {
            this.editStudentId = student._id
            this.editState = { ...student }
        },
        editStudent(student) {
            axios.put('http://46.101.212.195:3000/students/' + student._id, {
                name: this.editState.name,
                group: this.editState.group,
                isDonePr: this.editState.isDonePr,
            }).then((response) => {
                const { name, group, isDonePr } = response.data

                student.name = name
                student.group = group;
                student.isDonePr = isDonePr
                
                this.editStudentId = ''
            })
        },
        toggleTheme() {
            this.$store.commit('toggleTheme');
        },
    },
}
</script>
<style>
    .coral {
        background-color: coral;
    }
    .burlywood {
        background-color: burlywood;
    }
</style>