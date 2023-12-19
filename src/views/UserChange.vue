<template>
<div class="content">
<el-form :inline="true" :model="formInline" class="form">
  <el-row>
    <el-col>
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" type="text"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item label="性别">
        <el-input v-model="formInline.gender"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item label="学校">
        <el-input v-model="formInline.academy"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item label="邮箱">
        <el-input v-model="formInline.mail"></el-input>
      </el-form-item>
    </el-col>
  </el-row>

</el-form>
  <el-button class="change" @click="change()">
    确认修改
  </el-button>
</div>

</template>

<script setup>
export default {
  name:"formInline",
  data(){
    return {
      formInline: {
        user:"darth",
        gender: "沃尔玛购物袋",
        mail:"2416617876@qq.com",
        academy: "BUAA"
      }
    }
  },
  methods:{
    change(){

    }
  }
}
</script>

<style scoped lang="less">
.content{
  text-align: left;
  max-width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  display: block;
  padding: 20px 24px;
  margin-top: 88px;
  background: #6190E8;
  max-width: 600px;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6190E8, #A7BFE8);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #6190E8, #A7BFE8);
  align-items: center;
  margin-left: 500px;
  .form{
    display: block;
  }
  .change{
    margin: 10px auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin-left: 220px;
  }


}
</style>
