<template>
    <div class="info" style="display: flex;">
        <p>{{ count }}</p>
        <img :src="student.photo" @click="activeModal = true">
        <div>
            <p>{{ student.name }}</p>
            <p>{{ student.group }}</p>
            <p>{{ "Оценка: " + student.mark }}</p>
            <modal v-if="activeModal" @close="activeModal = false">
                <img slot="body" :src="student.photo" alt="">
            </modal>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Modal from './Modal'

    export default {
        components: { Modal },
        props: {
            id: '',
        },
        data() {
            return {
                student: {},
                activeModal: false,
            }
        },
        computed: {
            count() {
                return this.$store.getters.getCount
            },
        },
        methods: {
            setCount(value) {
                this.$store.commit('setCount', value);
            },
        },
        mounted() {
            axios.get("http://46.101.212.195:3000/students/" + this.id).then((response) => this.student = response.data)
        }
    }
</script>
