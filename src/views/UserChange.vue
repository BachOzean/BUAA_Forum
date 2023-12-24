<template>
  <div class="Father">
    <left-rail></left-rail>

<div class="content">

<el-form :inline="true" :model="formInline" class="form">
  <el-row>
    <el-col>
      <el-form-item label="用户名">
        <el-input v-model="formInline.user_name" type="text"></el-input>
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
        <el-input v-model="formInline.email"></el-input>
      </el-form-item>
    </el-col>
  </el-row>

</el-form>
  <el-button class="change" @click="change()">
    确认修改
  </el-button>
  <el-button slot="reference" class="password" @click="showPasswordModal()">
    修改密码
  </el-button>
  <div class="modal" v-show="isPasswordModalVisible">
    <el-form >
      <el-row>
        <el-col>
          <el-form-item label="原始密码">
            <el-input v-model="oldPassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="修改密码">
            <el-input v-model="newPassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button class="passchange" @click="confirmPasswordChange()">
        确认修改
      </el-button>
      <el-button class="cancle" @click="hidePasswordModal()">
        取消修改
      </el-button>
    </el-form>
  </div>

</div>
</div>

</template>

<script setup>
import LeftRail from "@/components/LeftRail.vue";

export default {

  name:"dataForUser",
  components:{LeftRail},
  data(){
    return {
      isPasswordModalVisible:false,
      oldPassword:"",
      newPassword:"",
      formInline: {
        user_name:"darth",
        gender: "沃尔玛购物袋",
        email:"2416617876@qq.com",
        academy: "BUAA"
      }
    }
  },
  methods:{
    getUserInfo() {
      this.$axios({
        method: "get",
        url: "/get_user",
      })
          .then(response => {
            if (response.code === 1000) {
              this.formInline = response.user
              console.log(response.user);
            } else {
              console.log(response.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    change() {
      // 在这里执行表单提交的逻辑
    },
    showPasswordModal() {
      this.isPasswordModalVisible = true;
    },
    hidePasswordModal() {
      this.isPasswordModalVisible = false;
    },
    confirmPasswordChange() {
      // 在这里执行密码修改的逻辑，使用 this.oldPassword 和 this.newPassword
      // 修改完成后可以隐藏弹窗
      this.isPasswordModalVisible = false;
    }
  },
  mounted: function () {
    this.getUserInfo();
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
    margin-left: 180px;
  }
  .passchange{
    margin: 10px auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin-left: 180px;
  }


}
</style>
