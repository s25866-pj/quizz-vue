<template>
Puntacja:
<!--{{score}}-->

  <div @click="toggleSortType">sortowanie: {{sortType}}</div>
  <div v-if="sortType==='default'" v-for="n in score" :key="n.id">
    {{n.userName}}
    {{n.score}}
  </div>

  <div v-if="sortType==='highestScore'" v-for="n in score.slice().reverse()" :key="n.score">
    {{ n.score }} - {{n.userName}}
  </div>
  <div v-if="sortType==='withName'">
    <input type="text" v-model="userNameLocal">
    {{userNameLocal}}
    <div v-for="n in score" :key="n.userName">
      <div v-if="n.userName==userNameLocal">
        {{n.userName}} - {{n.score}}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Score",
  data(){
    return{
      score:[],
      sortType:"default",
      sortTypeName:"domyślne",
      userNameLocal:''
    }
  },
  mounted(){
    fetch('http://localhost:3000/Score')
        .then(res => res.json())
        .then(data => this.score = data)
        .catch(err => console.log(err.message))
  },
  methods:{
    toggleSortType(){
      switch (this.sortType) {
        case "default":
          this.sortType="highestScore"
          this.sortTypeName="najwyższe wyniki"
          break
        case "highestScore":
          this.sortType="withName"
          this.sortTypeName="z nazwą użytkownika"
          break
        case "withName":
          this.sortType="default"
          this.sortTypeName="domyślne"
              break
      }
    }
  }
}
</script>

<style scoped>

</style>