<template>
  <div class="app-swiper">
    <mt-swipe :auto="3000" :speed="300">
      <mt-swipe-item v-for="item in imgList" :key="item.bid">
        <img :src="item.img_url" :alt="item.title">
      </mt-swipe-item>
    </mt-swipe>  
  </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  props:["imgList"]  // 子组件接收父组件数据
}
</script>

<style>
  .app-swiper .mint-swipe{
      height: 180px;
  }
  .app-swiper .mint-swipe img{
      width: 100%;
      height: 100%;
      /* display: block;
      object-fit: cover; */
  }
</style>
