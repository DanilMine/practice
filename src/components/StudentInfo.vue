<template>
    <div>
       <p>{{ student.name }}</p>
        <p>{{ student.group }}</p>
        <p>{{ "Оценка: " + student.mark }}</p>
        <img v-bind:src="student.photo">
    </div>
</template>
<script>
    import vue from 'vue'
    import axios from 'axios'

    export default {
        props: {
            id: '',
        },
        data: function() {
            return {
                student: {},
            };
        },
    mounted: function(){
    axios.get("http://46.101.212.195:3000/students/"+this.id).then((response) => {
        console.log(response.data)
        this.student = response.data;
        })
    },
}
</script>