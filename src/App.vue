<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
<script>
  export default {
    data(){
      return{
        visibleMenu: false
      }
    },
    methods:{
      HideMenu(){
        this.visibleMenu=!this.visibleMenu
      },
      ShowMenu(){
        this.visibleMenu=!this.visibleMenu
      }
    }
  }
</script>
<template>

  <header>
    <div v-if="visibleMenu">
      <div class="menu" @click="HideMenu"><div class="rotate">-</div></div>
      <nav>
        <RouterLink :to="{name: 'Home'}">Home</RouterLink> |
        <RouterLink :to="{name: 'NewQA'}">Nowy quizz?</RouterLink> |
<!--        <RouterLink :to="{name: 'About'}">About</RouterLink> |-->
        <RouterLink :to="{name:'Score'}">Tablica wyników</RouterLink>
      </nav>
    </div>
    <div class="menu" v-else @click="ShowMenu"><div class="rotate">+</div></div>
  </header>

<body>
<div>
  <RouterView />
</div>

</body>

</template>

<style>
.menu{
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: #282828;
  border: 2px solid greenyellow ;
  color:white;
  text-align: center;
  font-weight: bolder;
  font-size: 30px;
}
.rotate{
  transform: rotate(0deg);
  transition: transform 0.5s;
}
.rotate:hover{
  transform:rotate(180deg);
}
a{
  color:azure;
  text-decoration: none;
}
a.router-link-active{
  color:cyan;
}
a.router-link-exact-active{
  color:violet;
}
</style>
