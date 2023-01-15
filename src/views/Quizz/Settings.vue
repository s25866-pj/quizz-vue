<template>
  <h3>Welcome at quizz settings</h3>
  <div @click="toggleLogin">
     <p v-if="login">Login/create new acc</p>
     <p v-if="!login">Play as a guest</p>
  </div>
  <div v-if="login">
    What is your name?
    <input type="text" name="" id="" v-model="imie">
  </div>
  <div v-else>
<!--    <Login/>-->
  </div>
  <div>
    ilość pytań:
<!--    <input type="number" name="" id="" min="10" max="50" v-model="questions">-->
    <input type="range" name="" id="" min="10" max="50" step="1" v-model="questions">
    {{questions}}
  </div>
  <div>Quizz Level</div>
  <div>
    <label @click="setLevel('easy')" class="container">
      Easy |
    </label>
    <label @click="setLevel('medium')" class="container">
      Medium |
    </label>
    <label @click="setLevel('hard')" class="container">
      Hard
    </label>
  </div>
  <div class="create" :style="{background: lvlColor}"  @click="submit">Create</div>
</template>

<script>
import Login from "@/views/Quizz/Login.vue";
export default {
  name: "Settings",
  components: {Login},
  data(){
    return{
      login:false,
      imie:'',
      level:'easy',
      questions:10,
      lvlColor:  "#009900"
    }
  },
  methods:{
    submit(event){
      this.$emit('settings', { imie:this.imie,level:this.level, questions:this.questions})
    },
    toggleLogin(){
      this.login=!this.login
    },
    setLevel(level){
      if(level=="easy"){
        this.lvlColor=" #009900"
      }
      else if(level=="medium"){
        this.lvlColor="#997300"
      }
      else if(level=="hard"){
        this.lvlColor="#800000"
      }
    }
  }
}
</script>

<style scoped>
.create{
font-size: 40px;
  border-radius: 15px;
  border: 2px solid black;
  padding: 10px;
  margin:15px;
  width:fit-content;
  height: fit-content;
  cursor: cell;
  color: black;
  font-weight: 1800;
}
input[type="radio"]{
cursor:pointer;
}
INPUT[type="number"]{
  background-color: #282828;
  border:none;
  border-bottom: 1px solid black;
  width: 250px;
  height: 50px;
  font-size: 45px;
  font-family: equinoxregular, sans-serif;
}
input:active{
  border:none;
}
.container{
  cursor: pointer;
}
</style>