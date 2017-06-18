import Vue from 'vue'
import VueRouter from 'vue-router'
import Rank from 'components/Rank/Rank'
import Recommend from 'components/Recommend/Recommend'
import Search from 'components/Search/search'
import Singer from 'components/Singer/singer'

Vue.use(VueRouter)

export default new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
   {
   	path: '/', redirect: '/recommend'
   },
   {
   	path: '/rank',component: Rank
   },
   {
   	path: '/recommend',component: Recommend
   },
   {
   	path: '/search',component: Search
   },
   {
   	path: '/singer',component: Singer
   }
  ]
})