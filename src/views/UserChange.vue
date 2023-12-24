<template>
  <div>
    <left-rail></left-rail>

  <div class="content" v-show="infor">

    <el-form :inline="true" :model="formInline" class="form">
      <el-row>
        <el-col>
          <el-form-item label="用户名">
            <el-input v-model="formInline.user_name"></el-input>
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
  </div>
    <div class="modal" v-show="isPasswordModalVisible">
      <el-form>
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
        <el-button class="passchange" @click="changePassWord()">
          确认修改
        </el-button>
        <el-button class="cancle" @click="hidePasswordModal()">
          取消修改
        </el-button>
      </el-form>
    </div>

  </div>


</template>

<script setup>
import Vue from "vue";
import LeftRail from "@/components/LeftRail.vue";

export default {

  name: "dataForUser",
  components:{LeftRail},
  data() {
    return {
      isPasswordModalVisible: false,
      infor:true,
      oldPassword: "",
      newPassword: "",
      formInline: {
        user_name: "darth",
        gender: "沃尔玛购物袋",
        email: "2416617876@qq.com",
        academy: "BUAA"
      }
    }
  },
  methods: {
    getUserInfo() {
      this.$axios({
        method: "get",
        url: "/get_user",
      })
          .then(response => {
            if (response.code === 1000) {
              this.formInline = response.user
            } else {
              console.log(response.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    change() {
      this.$axios.post('/change_user', this.formInline)
          .then(response => {
            // 请求成功，处理响应
            if (response.code === 409) {
              Vue.prototype.$message.error('新用户名已存在')
            }
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('更新用户信息失败', error);
          });
    },
    changePassWord() {
      this.$axios({
        method: "post",
        url: "/modify_password",
        data: {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }
      })
          .then(response => {
            if (response.code === 1000) {
              Vue.prototype.$message.info("密码修改成功")
              this.isPasswordModalVisible = false;
              this.infor=true
            } else {
              console.log(response.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    showPasswordModal() {
      this.isPasswordModalVisible = true;
      this.infor=false
    },
    hidePasswordModal() {
      this.isPasswordModalVisible = false;
      this.infor=true
    },
  },
  mounted: function () {
    this.getUserInfo();
  }
}
</script>

<style scoped lang="less">
.content {
  text-align: left;
  max-width: 100%;
  box-sizing: border-box;
  //flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  display: block;
  padding: 20px 24px;
  margin-top: 88px;
  background: #b9b9b9;
  max-width: 600px;
  /* fallback for old browsers */
  /* Chrome 10-25, Safari 5.1-6 */
  align-items: center;
  margin-left: 500px;
  border-radius: 5px;

  .form {
    display: block;
  }

  .change {
    margin: 10px auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin-left: 180px;
  }

  .passchange {
    margin: 10px auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin-left: 180px;
  }


}
.modal{
  text-align: left;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  display: block;
  padding: 20px 24px;
  margin-top: 88px;
  background: #b9b9b9;
  max-width: 600px;
  align-items: center;
  margin-left: 500px;
  border-radius: 5px;
}
</style>
