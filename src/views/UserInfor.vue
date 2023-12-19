<template>
  <div class="content">
    <el-descriptions title="用户信息" column="1">
      <el-descriptions-item label="用户名">Darth
      </el-descriptions-item>
      <br>
      <el-descriptions-item label="性别">
        武装直升机
      </el-descriptions-item>
      <el-descriptions-item label="学校">北京航空航天大学
      </el-descriptions-item>
      <br>
      <el-descriptions-item label="邮箱">2416617876@qq.com
      </el-descriptions-item>
      <br>
    </el-descriptions>
    <el-button class="change" @click="changeinfor()">修改信息
    </el-button>
  </div>

</template>
<script setup>
export default {
  methods:{
    changeinfor(){
      this.$router.push({name: 'Change'});
    }
  }
}

</script>

<style scoped lang="less" >
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
