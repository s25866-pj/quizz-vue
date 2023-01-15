<template>
<h1>Witaj {{imie}}</h1>
  <h2 v-if="level" class="levelIndicator" :style="{borderColor: levelColor}">twój poziom trudności to: {{level}}</h2>
  <Settings v-if="showSettings" @settings="getSettings"/>
  <GameEasy v-if='level==="easy"' />
  <GameMedium v-if='level==="medium"' />
  <GameHard v-if='level==="hard"'/>
</template>

<script>
import Settings from "@/views/Quizz/Settings.vue";
import GameEasy from "@/views/Quizz/GameEasy.vue";
import GameMedium from "@/views/Quizz/GameMedium.vue";
import GameHard from "@/views/Quizz/GameHard.vue";
export default {
  name: "Home",
  components: {Settings,
    GameEasy,
    GameMedium,
    GameHard
  },
  data(){
    return{
      imie:'',
      level:'',
      showSettings:true,
      game:false,

 
    }
  },
  methods:{
    getSettings({imie,level}){
      this.imie=imie
      this.level=level
      this.showSettings=false
      this.game=true
      
      if(this.level=="easy"){
        this.levelColor = 'green'
      }
      if(this.level=="medium"){
        this.levelColor = "orange"
      }
      if(this.level=="hard"){
        this.levelColor="red"
      }
    },
  }

}
</script>

<style scoped>

</style>