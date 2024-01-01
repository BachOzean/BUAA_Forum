<template>
  <div>


    <el-col :span="12"  class="tac">
      <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item index="1" @click="goToMyPosts()">
          <i class="el-icon-location"></i>
          <span slot="title">我的帖子</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goToMyCommunity()">
          <i class="el-icon-menu"></i>
          <span slot="title">我的社团</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goToUser()">
          <i class="el-icon-document"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="4" @click="goToUserChange()">
          <i class="el-icon-setting"></i>
          <span slot="title">修改信息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>

</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goToUserChange(){
      this.$router.push({name: 'UserChange'})
    },
    goToUser(){
      this.$router.push({name: 'UserInfor'})
    },
    goToMyPosts(){
      this.$router.push({name:"MyPosts"})
    },
    goToMyCommunity(){
      this.$router.push({name:"MyCommunity"})
    }
  }
}
</script>

<style scoped lang="less">
.tac{
  overflow: hidden;
  max-width: 150px;
}
</style>
