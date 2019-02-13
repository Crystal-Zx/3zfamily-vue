<template>
  <div class="app-login" :style="`height:${height}px`">
    <div class="mui-card">
      <div class="login_box" v-if="showPage==0">
        <img class="logo" src="../../assets/3zf_logo.png" />
        <div class="uname_box">
          <div class="uname_info">
            <span class="mui-icon iconfont icon-user"></span>
            <input type="text" name="uname" placeholder="请输入用户名或手机号" v-model="uname">
          </div>
          <!-- <div class="uname_verify">
            <span class="warning mui-icon iconfont icon-warning"></span>
          </div> -->
        </div>
        <div class="upwd_box">
          <div class="upwd_info">
            <span class="mui-icon iconfont icon-pwd"></span>
            <input type="password" name="upwd" placeholder="请输入密码" v-model="upwd">
          </div>
          <!-- <div class="upwd_verify">
            <span class="warning mui-icon iconfont icon-warning"></span>
          </div> -->
        </div>
        <p class="forget_pwd">忘记密码？</p>
      </div>
      <div class="register_box" v-else>
        <img class="logo" src="../../assets/3zf_logo.png" />
        <div class="phone_box">
          <div class="phone_info">
            <span class="mui-icon iconfont icon-phone"></span>
            <input type="text" name="phone" placeholder="请输入有效的手机号" v-model="regPhone" @blur="toVerify(0)">
          </div>
          <div class="phone_verify" v-show="verifyRes[0] !== -1">
            <span class="warning mui-icon iconfont icon-warning" v-if="verifyRes[0]==0"></span>
            <span class="right mui-icon iconfont icon-right" v-else></span>
          </div>
        </div>
        <div class="uname_box">
          <div class="uname_info">
            <span class="mui-icon iconfont icon-user"></span>
            <input type="text" name="uname" placeholder="请输入用户名" v-model="regUname" @blur="toVerify(1)">
          </div>
          <div class="uname_verify" v-show="verifyRes[1]!=-1">
            <span class="warning mui-icon iconfont icon-warning" v-if="verifyRes[1]==0"></span>
            <span class="right mui-icon iconfont icon-right" v-if="verifyRes[1]==1"></span>
          </div>
        </div>
        <div class="upwd_box">
          <div class="upwd_info">
            <span class="mui-icon iconfont icon-pwd"></span>
            <input type="password" name="upwd" placeholder="请输入密码" v-model="regPwd" @blur="toVerify(2)">
          </div>
          <div class="upwd_verify" v-show="verifyRes[2]!=-1">
            <span class="warning mui-icon iconfont icon-warning" v-if="verifyRes[2]==0"></span>
            <span class="right mui-icon iconfont icon-right" v-if="verifyRes[2]==1"></span>
          </div>
        </div>
        <div class="upwd_box upwd_box_again">
          <div class="upwd_info">
            <span class="mui-icon iconfont icon-pwd"></span>
            <input type="password" name="upwd_again" placeholder="请再次输入密码" v-model="regPwdAgain" @blur="toVerify(3)">
          </div>
          <div class="upwd_verify" v-show="verifyRes[3]!=-1">
            <span class="warning mui-icon iconfont icon-warning" v-if="verifyRes[3]==0"></span>
            <span class="right mui-icon iconfont icon-right" v-if="verifyRes[3]==1"></span>
          </div>
        </div>
      </div>
      <div class="btn_group">
        <button class="register" @click="toRegister()">注册</button>
        <button class="login" @click="toLogin()">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      height: 0,
      showPage: 0,    // 显示登陆/注册页面的哪一个 0->登陆 1->注册
      verifyRes: [-1,-1,-1,-1],  // 验证结果：0->warning 1->right -1->初始加载，不加载
      regPhone: '',   // 用户注册的手机号
      regUname: '',   // 用户注册的用户名
      regPwd: '',     // 用户注册的密码
      regPwdAgain: '',// 用户注册时再次输入的密码
      uname: '',      // 用户登录时输入的用户名或手机号
      upwd: ''        // 用户登录时输入的密码
    }
  },
  methods:{
    // 前端+后台验证
    toVerify(index){
      var reg = null;
      var url = '/user';
      var str = null,params = {};
      switch(index){
        case 0:   // 手机号验证
          reg = /^1[34578]\d{9}$/;    // 前端验证：手机号格式正确与否
          url += '/isPhoneRepeat';    // 后台验证：该手机号是否已注册
          str = this.regPhone;
          params.phone = this.regPhone;
          this.verify(index,reg,str,url,params);
          break;
        case 1:   // 用户名验证
          reg = /^[\w\u4e00-\u9fa5]{4,16}$/;
          url += '/isUnameRepeat';
          str = this.regUname;
          params.uname = this.regUname;
          this.verify(index,reg,str,url,params);
          break;
        case 2:   // 密码强度验证
          reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*?\(\)\.]).*$/;
          if(reg.test(this.regPwd)){
            this.$set(this.verifyRes,2,1);
          }else{
            this.$set(this.verifyRes,2,0);
          }
          break;
        case 3:   // 密码一致验证
          if(this.regPwd == this.regPwdAgain){
            this.$set(this.verifyRes,3,1);
          }else{
            this.$set(this.verifyRes,3,0)
          }
          break;
        default: break;
      }
    },
    // 封装前端正则+后台重复验证的函数（在本项目中仅用于用户注册的手机号和用户名检测）
    verify(index,reg,str,url,params){
      // 前端验证
      // 后台验证：前端正则验证通过则进行后台验证，否则直接将验证结果为0
      if(reg.test(str)){
        var verify = 1;
        // 若先就将verifyRes设置了值 会先闪现一个√再提示×
        // this.$set(this.verifyRes, index, 1);
        this.axios.get(url,{params}).then(result=>{
          // 总的验证结果等于 前端&&后台
          this.$set(this.verifyRes,index,verify && result.data.code);
        })
      }else{
        this.$set(this.verifyRes, index, 0);
      }
    },
    // 注册函数
    toRegister(){
      // 若当前非注册页面，点击切换到注册页面
      if(this.showPage != 1){
        this.showPage = 1;
      // 当前页是注册页面，点击进行注册
      }else{
        var isSignin = true;
        for(var value of this.verifyRes){
          if(value == 1) continue;
          else{
            isSignin = false;
            break;
          }
        }
        // 所有验证都通过才进行注册
        if(isSignin){
          var url = '/user/signin';
          this.axios.post(url,this.qs.stringify({
            phone: this.regPhone,
            uname: this.regUname,
            upwd: this.regPwd
          })).then(result=>{
            // 注册成功
            if(result.data.code == 1){
              // 再次初始化相关数据
              this.initReg();
              // 进行提示
              this.$toast({
                message: '注册成功！',
                iconClass: 'mui-icon iconfont icon-congratulation'
              });
              // 跳转到登陆页
              this.showPage = 0;
            }
          })
        }else{
          this.$toast({
            message: '您的注册信息有误，请更正！',
            iconClass: 'mui-icon iconfont icon-err'
          })
        }
      }
    },
    toLogin(){
      // 若当前非登陆页面，点击切换到登陆页面
      if(this.showPage != 0){
        this.showPage = 0;
      // 当前页是登陆页面，点击进行登陆
      }else{
        var url = '/user/login';
        this.axios.post(url,this.qs.stringify({
          uname: this.uname,
          upwd: this.upwd
        })).then(result=>{
          if(result.data.code == 1){
            // 提示用户登录成功
            this.$toast({
              message: '登陆成功！',
              iconClass: 'mui-icon iconfont icon-congratulation'
            });
            // 再次初始化input框双向绑定的数据
            this.uname = '';
            this.upwd = '';
            // 将结果存入sessionStorage
            sessionStorage.setItem('uid',result.data.output.user.uid); 
            sessionStorage.setItem('sessionID',result.data.output.sessionID);
            // 将sessionStorage的数据存入vuex
            this.$store.dispatch('setUser',result.data.output.user.uid);
            this.$store.dispatch('setSessionID',result.data.output.sessionID);
            var redirect = this.$route.query.redirect;
            this.$router.push(redirect);
          }else{
            this.$toast({
              message: '登陆失败！',
              iconClass: 'mui-icon iconfont icon-err'
            })
          }
        })
      }
    },
    handleClick(page){
      this.showPage = page;
    },
    initReg(){
      for(var index in this.verifyRes){
        this.$set(this.verifyRes, index, -1);
      }
      this.regPhone = '';
      this.regUname = '';
      this.regPwd = '';
      this.regPwdAgain = '';
    }
  },
  mounted(){
    this.height = window.innerHeight;
  }
}
</script>

<style lang="scss" scoped>
  $theme_bg: #F3D7B5;
  $gray: #555;
  $btn_register: #E5E8B1;
  $theme: #F2753F;
  // $btn_login:
  html,body,.app-login{
    background-image: url('../../assets/bg_img_3.jpg');
    background-size: 100% 100%;
    padding: 10px;
  }
  .app-login .mui-card{
    background: rgba(255,255,255,.4);
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login_box,.register_box{
      width: 85%;
      .logo{
        width: 180px;
        margin-bottom: 40px;
      }
      .uname_box,.phone_box{
        margin-bottom: 30px;
      }
      // 用户名及密码框
      .uname_box,.upwd_box,.phone_box{
        display: flex;
        justify-content: center;
        align-items: center;
        // 用户名及密码框样式
        .uname_info,.upwd_info,.phone_info{
          width: 100%;
          display: flex;
          align-items: center;
          border: 1px $gray solid;
          border-radius: 10px;
          background: rgba(255, 255, 255, .5);
          span{
            margin-left: 10px;
          }
          input{
            width: 100%;
            margin: 0;
            outline: none;
            background: none;
            border: 0;
          }
        }
        // 验证结果标识
        .uname_verify,.upwd_verify,.phone_verify{
          position: absolute;
          right: 0px;
        }
      }
      // 忘记密码
      .forget_pwd{
        display: flex;
        justify-content: flex-end;
        margin: 8px 0 40px 0;
        font-size: 15px;
        color: $gray;
      }
      
      // 注册页面：
      .upwd_box_again{
        margin: 30px 0 40px 0;
      }
    }
    // 登陆注册按钮
    .btn_group{
      width: 85%;
      display: flex;
      justify-content: space-between;
      button{
        width: 48%;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 10px;
        padding: 8px 15px;
      }
      .register{
        color: $gray;
        border: 1px solid $btn_register;
        background: $btn_register;
      }
      .login{
        color: white;
        border: 1px solid $theme;
        background: $theme;
      }
    }
    
  }
  .warning{
    color: #EB3F3F;
    // #FF4238;
  }
  .right{
    color: #00B32D;
    // #24B455;
  }
</style>
