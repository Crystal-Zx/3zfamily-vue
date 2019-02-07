<template>
  <div class="app-setting">
    <div class="change_avatar">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        name="upfile"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="avatar_info">
        <p>
          <span class="mui-icon iconfont icon-tips"></span>
          点击头像可更换头像喔~
        </p>
        <!-- <button @click="isSuccess ? changeAvatar(avatarUrl) : avatarError()">保存头像</button> -->
         <!-- @click="isSuccess ? changeAvatar(avatarUrl) : avatarError()" -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // uid: this.$store.state.currentUser,
      avatarUrl: '',
      isSuccess: false,
      myHeader: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
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
        console.log(result);
        result.data.avatar = "http://127.0.0.1:3000/" + result.data.avatar;
        this.avatarUrl = result.data.avatar;
      })
    },
    handleAvatarSuccess(res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.toast({
          message: '上传头像图片只能是 JPG 格式!',
          iconClass: 'mui-icon iconfont icon-err'
        });
      }
      if (!isLt2M) {
        this.toast({
          message: '上传头像图片大小不能超过 2MB!',
          iconClass: 'mui-icon iconfont icon-err'
        });
      }
      if(isJPG && isLt2M){
        
      }
      return isJPG && isLt2M;
    },
    // changeAvatar(file){
    //   var url = '/user/changeAvatar';
    //   let fd = new FormData();
    //   fd.append('file',file);
    //   console.log(file);
    //   console.log(fd);
    //   this.axios.post(url,this.qs.stringify({
    //     // uid: this.$store.state.currentUser,
    //     fd: fd
    //   })).then(result=>{
    //     console.log(result.data);
    //   })
    // },
    // avatarError(){
    //   this.toast({
    //     message: '请先上传头像!',
    //     iconClass: 'mui-icon iconfont icon-err'
    //   });
    // }
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
</style>
