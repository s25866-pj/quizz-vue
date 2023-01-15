<template>
<h1>Gra Łatwa</h1>
  <h2>{{score}}</h2>
  <div v-for="quest in QAEasy " :key="quest.id">
    <Answer :id="quest.id" :input="input" @score="goodAns"/>
  </div>
</template>

<script>
  import Answer from "@/views/Quizz/Answers/Answer.vue";

  export default {
    name: "Game",
    components: {Answer},
    data(){
        return{
          input:"http://localhost:3000/QAEasy",
          QAEasy:[],
          score:0
        }
    },
    mounted() {
      fetch(this.input)
          .then(res => res.json())
          .then(data => this.QAEasy = data)
          .catch(err => console.log(err.message))
      },
    methods:{
      // check(answer){
      //   // console.log(answer)
      //   console.log(this.QAEasy)
      // },
      goodAns(){
        this.score++
      }
    },

  }
</script>

<style scoped>
.answer{
 width: 40px;
  height: 40px;
  background-color: chartreuse;
  font-weight: bolder;
  font-size: 22px;
  padding: 6px;
  margin: 5px;
  text-align: center;
  border-radius: 10px;
}
.answer:hover{
  background-color: darkorchid;
  color:white;
}
</style>