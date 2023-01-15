<template>
<h1>Średnia gra</h1>
<div>{{score}}</div>
  <div v-for="quest in QAMedium" :key="quest.id">
    <Answer :id="quest.id" :input='input' @score="goodAns"/>
  </div>
</template>

<script>
import Answer from "@/views/Quizz/Answers/Answer.vue";

export default {
  name: "GameMedium",
  components: {Answer},
  data(){
    return{
      input:"http://localhost:3000/QAMedium",
      QAMedium:[],
      score:0
    }
  },
  mounted() {
    fetch(this.input)
        .then(res => res.json())
        .then(data => this.QAMedium= data)
        .catch(err => console.log(err.message))
  },
  methods:{
    goodAns(){
      this.score++
    }
  }
}
</script>

<style scoped>

</style>