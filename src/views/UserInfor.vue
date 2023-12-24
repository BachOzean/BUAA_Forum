<template>
  <div>
    <left-rail></left-rail>
  <div class="content">
    <el-descriptions title="用户信息" column="1">
      <el-descriptions-item label="用户名">{{ user.user_name }}
      </el-descriptions-item>
      <br>
      <el-descriptions-item label="性别">
        {{user.gender}}
      </el-descriptions-item>
      <el-descriptions-item label="专业">{{ user.academy }}
      </el-descriptions-item>
      <br>
      <el-descriptions-item label="邮箱">{{ user.email }}
      </el-descriptions-item>
      <br>
    </el-descriptions>
    <el-button class="change" @click="ChangeInfo()">修改信息
    </el-button>
  </div>
  </div>
</template>
<script setup>
import LeftRail from "@/components/LeftRail.vue";

export default {
  name: "UserInfo",
  components:{LeftRail},
  data() {
    // var u = {
    //     'user_id': '',
    //     'user_name': '',
    //     'gender': '',
    //     'academy': '',
    //     'email':''
    // };
    return {
      user: '',
    };
  },
  methods: {
    getUserInfo() {
      this.$axios({
        method: "get",
        url: "/get_user",
      })
          .then(response => {
            if (response.code === 1000) {
              this.user = response.user;
              console.log(response.user);
            } else {
              console.log(response.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    ChangeInfo() {
      this.$router.push({name: 'UserChange'});
    }
  },
  mounted: function () {
    this.getUserInfo();
  },

}

</script>

<style scoped lang="less">
.content {
  text-align: left;
  max-width: 100%;
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
  border-radius: 5px;
  .change {
    margin: 10px auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin-left: 220px;
  }
}
</style>
