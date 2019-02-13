// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入vuex文件
import store from './store/index.js'

// 1 mint-ui引入与配置
// 1.1 引入Mint-UI样式表
import 'mint-ui/lib/style.css'
// 1.2 完整引入mint-ui
import MintUI from "mint-ui";
Vue.use(MintUI);
// 1.3 引入MintUI的toast方法作为全局的方法
Vue.prototype.$toast = MintUI.Toast;
Vue.prototype.$confirm = MintUI.MessageBox.confirm;

// 2 MUI样式表的引入
import './lib/mui/css/iconfont.css'
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';
// // 2.2 引入MUI的JS文件
// import mui from './lib/mui/js/mui.js';
// Vue.prototype.mui = mui;

// 3 ElementUI组件按需引入
// 头像上传
import {Upload,MessageBox,Message} from 'element-ui';
Vue.component(Upload.name,Upload);

Vue.config.productionTip = false    // ?

// 4 请求配置
// 4.1 ES6引入模块
import axios from 'axios'
import qs from 'qs'
// 相当于const axios = require("axios");
// 4.2 配置axios
axios.defaults.baseURL = "http://127.0.0.1:3000/";
Vue.prototype.axios=axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios请求默认不带cookie，需手动配置允许其携带cookie，使服务器端的session可用
axios.default.withCredentials = true;
// 4.3 配置qs
// qs是axios自带的，用于解析
Vue.prototype.qs=qs;

// // 5. 配置vuex
// // 5.1下载安装Vuex：npm i vuex -D
// // 5.2 引入Vuex
// import Vuex from 'vuex';
// // 5.3 注册Vuex实例
// Vue.use(Vuex);
// // 5.4 创建Vuex实例对象
// const store = new Vuex.Store()



// 6 配置全局路由守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){  // 该路由需要登陆
    // vuex中或是sessionStorage中存在sessionID值即认为该用户已登陆
    if(store.state.sessionID || sessionStorage.getItem('sessionID')){
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }else{
    next();
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
