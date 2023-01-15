<template>
  <h4>Pytanie: {{question.Question}}</h4>
  <div class="odp" @click='check("a")'>{{question.odpA}}</div>
  <div class="odp" @click='check("b")'>{{question.odpB}}</div>
  <div class="odp" @click='check("c")'>{{question.odpC}}</div>
  <div class="odp" @click='check("d")'>{{question.odpD}}</div>

</template>

<script>
export default {
  name: "Answers",
  props:['id'],
  data(){
    return{
      question:[],
      setAnswer:false
    }
  },
  mounted() {
    fetch('http://localhost:3000/QAEasy/' + this.id)
        .then(res => res.json())
        .then(data => this.question = data)
        .catch(err => console.log(err.message))
  },
  methods:{
    check(answer){
      if(answer===this.question.correct && !this.setAnswer){
        console.log("poprawna odp")
        this.$emit('score',1)
      }
      else if(answer!==this.question.correct && !this.setAnswer){
        console.log("zła odp")
      }
      else{
        console.log("udzielono odpowiedzi")
      }
      this.setAnswer=true
    }
  }
}
</script>

<style scoped>
.odp{
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: aquamarine;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  margin: 5px;
}
.odp:hover{
  background-color: #108ec4;
}
</style>