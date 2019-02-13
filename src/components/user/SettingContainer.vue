<template>
  <div class="app-setting">
    <div class="change_avatar">
      <!-- https://jsonplaceholder.typicode.com/posts/ -->
      <el-upload
        class="avatar-uploader"
        action="123"
        :http-request="upload"
        :headers="importHeaders"
        :show-file-list="false"
        name="upfile"
        :on-change="onchange"
        :before-upload="beforeAvatarUpload">
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="avatar_info">
        <p>
          <span class="mui-icon iconfont icon-tips"></span>
          点击头像可更换头像喔~
        </p>
        <button @click="toSave()">保存头像</button>
         <!-- @click="isSuccess ? changeAvatar(avatarUrl) : avatarError()" -->
      </div>
    </div>
    <ul class="user_info">
      <li>
        <span>电话：</span>
        <span class="phone" v-text="userInfo.phone"></span>
      </li>
      <li class="uname">
        <span>用户名：</span>
        <span class="uname" v-text="userInfo.uname"></span>
      </li>
      <li class="changePwd">
        <span>修改密码</span>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // uid: this.$store.state.currentUser,
      avatarUrl: '',
      // isSuccess: false,
      importHeaders: {
        enctype:"multipart/form-data"
      },
      fd: {},
      userInfo: {}
    };
  },
  // props: ['currentUser'],
  methods: {
    // 获取用户基本信息
    getUserInfo(){
      var uid = this.$store.state.currentUser;
      var url = '/user/getUserInfo';
      this.axios.get(url,{
        params:{
          uid
        }
      }).then(result=>{
        console.log(result.data);
        if(!result.data.avatar){
          result.data.avatar = "http://127.0.0.1:3000/img/avatar/default.jpg";
        }else{
          result.data.avatar = "http://127.0.0.1:3000/" + result.data.avatar;
        }
        this.avatarUrl = result.data.avatar;
        this.userInfo = result.data;
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$toast({
          message: '上传头像图片只能是 JPG 格式!',
          iconClass: 'mui-icon iconfont icon-err'
        });
      }
      if (!isLt2M) {
        this.$toast({
          message: '上传头像图片大小不能超过 2MB!',
          iconClass: 'mui-icon iconfont icon-err'
        });
      }
      return isJPG && isLt2M;
    },
    upload(params){
      let fd = new FormData();
      fd.append('uid',this.$store.state.currentUser);
      fd.append('avatar',params.file);
      this.fd = fd;
      // var url = '/user/changeAvatar';
      // this.axios.post(url,fd).then(result=>{
      //   if(result.data.code == 1){
      //     this.toast({
      //       message: '更改头像成功！',
      //       iconClass: 'mui-icon iconfont icon-congratulation'
      //     });
      //   }
      // })
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    // 当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file,fileList){
      var _this = this;
      // 获取input上传文件的DOM元素
      var event = event || window.event;
      // event.target.files可以选择多个文件，此处仅选一个
      var file = event.target.files[0];
      // 以上file对象只获取到了对文件的描述信息，但没有获得文件中的数据，而inputBox.value也只是保存的是文件的绝对路径。可以通过html5提供的FileReader读取到文件中的数据。
      var reader = new FileReader(); 
      // 读取文件内容，结果用data:url的字符串形式表示
      // !注意：这是一步异步操作
      reader.readAsDataURL(file);
      //转base64
      reader.onload = function(e) {
        // 读取完成后，数据保存在对象的result属性中
        _this.avatarUrl = e.target.result //将图片路径赋值给src
      }
    },
    toSave(){
      var url = '/user/changeAvatar';
      this.axios.post(url,this.fd).then(result=>{
        if(result.data.code == 1){
          this.$toast({
            message: '更改头像成功！',
            iconClass: 'mui-icon iconfont icon-congratulation'
          });
          this.$router.push('/personal');
        }
      })
    }
  },
  created(){
    this.getUserInfo();
  },
  mounted(){
    // 显示用户初始头像
    // this.avatarUrl = require(`@/assets/avatar/1.jpg`);
  }
}
</script>

<style lang="scss">
  $theme: #F2753F;
  $avatarSize: 100px;
  // 头像更换
  .app-setting .change_avatar{
    background: white;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    .avatar-uploader{
      width: $avatarSize;height: $avatarSize;
      .el-upload {
        width: 100%;height: 100%;
        border: 1px dashed $theme;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: $theme;
      width: $avatarSize;
      height: $avatarSize;
      line-height: $avatarSize;
      text-align: center;
    }
    .avatar {
      width: $avatarSize;
      height: $avatarSize;
      display: block;
    }
    .avatar_info{
      height: $avatarSize;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      p{
        position: relative;
        top: 10px;
      }
      span{
        color: $theme;
      }
      button{
        // color: $theme;
        // border: 1px solid $theme;
        background: $theme;
        color: white;
        border: 0;
      }
    }
  }
  // 用户详细信息
  .app-setting .user_info{
    background: white;
    list-style: none;
    padding: 0;
    li{
      display: flex;
      align-items: center;
      margin: 0 20px;
      padding: 10px 0;
      border-bottom: 1px dotted #999;;
      justify-content: space-between;
    }
    li:last-child{
      border: 0;
    }
  }
</style>
