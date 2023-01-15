import { createRouter, createWebHistory } from 'vue-router'
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import NewQA from "@/views/NewQA.vue";
import Score from "@/views/Score.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/about',
      name:'About',
      component:About
    },
    {
      path:'/newQuizzAnswer',
      name:'NewQA',
      component:NewQA
    },
    {
      path:'/scores',
      name:"Score",
      component:Score
    }
  ]
})

export default router
