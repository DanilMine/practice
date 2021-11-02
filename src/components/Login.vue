<template>
    <div>
        <input v-model="input" type="text" placeholder="Enter login" required>
        <button @click="login">LOGIN</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            input: '',
        }
    },
    methods: {
        login() {
            axios.get(`http://46.101.212.195:3000/students/name/${this.input}`).then((response) => {
                if(response.data) {
                    this.$store.commit('setUser', response.data)
                    this.$router.push('/');
                }
            })
        }
    }
}
</script>

<style module>

</style>