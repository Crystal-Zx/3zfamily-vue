import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '../components/tabbar/HomeContainer.vue'
import FoundContainer from '../components/tabbar/FoundContainer.vue'
import OrderContainer from '../components/tabbar/OrderContainer.vue'
import PersonalContainer from '../components/tabbar/PersonalContainer.vue'
import ComDetailContainer from '../components/com/ComDetailContainer.vue';
import CaseDetailContainer from '../components/com/CaseDetailContainer.vue';
import SearchContainer from '../components/search/SearchContainer.vue';
import LoginContainer from '../components/user/LoginContainer.vue';
import SettingContainer from '../components/user/SettingContainer.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/home',component: HomeContainer},
    {path: '/found',component: FoundContainer},
    {path: '/order',component: OrderContainer},
    {path: '/personal',component: PersonalContainer,meta: { requireAuth: true},
      beforeEnter(to,from,next){
        if(from.path == '/setting'){
          location.reload();
        }
        next();
    }},  // requireAuth:true 表示进入该路由需要登陆
    {path: '/com/:cid',component: ComDetailContainer,props: true,meta: { navShow: false}},
    {path: '/case/:case_id',component: CaseDetailContainer,props: true,meta: { navShow: false}},
    {path: '/search/:kw',component: SearchContainer,props: true,meta: {navShow: false}},
    {path: '/login',component: LoginContainer,meta: {navShow: false,headerShow: false}},
    {path: '/setting',component: SettingContainer,meta: {navShow: false,requireAuth: true}},
    {path:'/',redirect:"/home"},
  ]
})
