<template>
<h1>Gra trudna</h1>
  <div>{{score}}</div>
  <div v-for="quest in QAHard" :key="quest.id">
    <Answer :id="quest.id" :input='input' @score="goodAns"/>
  </div>
</template>

<script>
import Answer from "@/views/Quizz/Answers/Answer.vue";
export default {
  name: "GameHard",
  components: {Answer},
  data(){
    return{
      input:"http://localhost:3000/QAHard",
      QAHard:[],
      score:0
    }
  },
  mounted() {
    fetch(this.input)
        .then(res => res.json())
        .then(data => this.QAHard= data)
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