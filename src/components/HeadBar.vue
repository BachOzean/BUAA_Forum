<template>
  <div>
  <header class="header">
    <div class="container">
      <div class="logo-container">
        <img class="img" src="../assets/images/logo.png" alt="logo"/>
      </div>
      <div class="title">北航树洞</div>
      <div class="collections">
        <div class="icon" @click="goIndex">
          <img class="img" src="../assets/images/home.svg" alt="collection"/>
        </div>
        <div class="icon" @click="goMyPost">
          <img class="img" src="../assets/images/calender.svg" alt="collection"/>
        </div>
        <div class="icon" @click="goCommunities">
          <img class="img" src="../assets/images/group.svg" alt="collection"/>
        </div>
        <div class="icon" @click="goPublish">
          <img class="img" src="../assets/images/interviews.svg" alt="collection"/>
        </div>
      </div>
      <div class="main-container">
        <div class="image-wrapper">
          <div class="search-text">
            <input type="text" class="search-text" placeholder="Type here to search..." v-model="keyword"
                   @keyup.enter="searchPost"/>
          </div>
          <img loading="lazy" src="../assets/images/search.svg" alt="search" class="image"/>
        </div>
      </div>
      <div class="personal-info">
        <div class="icon-wrapper">
          <div class="image-wrapper">
            <img loading="lazy" src="../assets/images/notifications.svg" alt="notification" class="image"/>
          </div>
        </div>
      </div>
      <div class="btns">
        <div v-show="!isLogin">
          <a class="login-btn" @click="goLogin">登录</a>
          <a class="login-btn" @click="goSignUp">注册</a>
        </div>
        <div class="user-box" v-show="isLogin">
          <span class="user" @click="goUserInfo">{{ currUsername }}</span>
          <div class="dropdown-content">
            <a @click="goLogout">登出</a>
            <a @click="goMyPost">我的发帖</a>
            <a @click="goUserInfo">个人信息</a>
            <a @click="goToMyCommunity()">我的社团</a>
          </div>
        </div>
      </div>
    </div>
  </header>
  </div>
</template>

<script>
// import DayOfWord from './DayOfWord.vue';

// import Vue from "vue";

export default {
  name: "HeadBar",
  // components: {DayOfWord},
  data() {
    return {
      keyword: '',
    }
  },
  created() {
    this.$store.commit("init");
  },
  mounted() {
    // this.$bus.$on('pageNumber', (value) => {
    //   this.pageNumber = value;
    // });
    // this.$bus.$on('pageSize', (value) => {
    //   this.pageSize = value;
    // });
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    currUsername() {
      console.log(this.$store.getters.username);
      return this.$store.getters.username;
    }
  },
  methods: {
    async searchPost() {
      this.$store.commit("search", this.keyword);
      await this.$router.push({name: "Home"});
    },
    goIndex() {
      this.$router.push({name: "Home"});
    },
    goLogin() {
      this.$router.push({name: "Login"});
    },
    goSignUp() {
      this.$router.push({name: "SignUp"});
    },
    goLogout() {
      this.$store.commit("logout");
      this.$router.push({name: "Home"})
    },
    goUserInfo() {
      this.$router.push({name: "UserInfor"})
    },
    goCommunities() {
      this.$router.push({name: "CommunityPage"})
    },
    goMyPost() {
      this.$router.push({name: "MyPosts"})
    },
    goPublish() {
      this.$router.push({name: "Publish"})
    },
    goToMyCommunity(){
      this.$router.push({name:"MyCommunity"})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.personal-info {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.search-text {
  color: var(--secondary-color-secondary-4, #858ead);
  background: #2c353d;
  font-feature-settings: "clig" off, "liga" off;
  font: 400 14px/22px Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
  border-radius: 4px;
  width: 400px;

}


.main-container {
  border-radius: 8px;
  background-color: var(--Dark-4, #2c353d);
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  padding: 9px 20px;
}

@media (max-width: 991px) {
  .main-container {
    max-width: 100%;
  }
}

.icon-wrapper {
  align-items: center;
  border-radius: 7px;
  background-color: var(--Dark-4, #2c353d);
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  padding: 10px;
}

.image-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}


.image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 20px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
}


.icon {
  align-items: center;
  border-radius: 7px;
  background-color: var(--red-red, #2c353d);
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  padding: 10px;

  .img {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 20px;
    overflow: hidden;
  }
}

.icon:hover {
  background-color: var(--red-red-90, #ff571a);
}

.collections {
  display: flex;
  gap: 20px;
  justify-content: center;
  max-width: 991px;
}

.title {
  color: var(--red-red-90, #ff571a);
  align-self: stretch;
  flex-grow: 1;
  white-space: nowrap;
  font: 700 26px/38px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
}

.container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  max-width: 100%;
  flex-wrap: wrap;
}

.logo-container {
  align-items: center;
  border-radius: 6px;
  background-color: var(--secondary-color-background-2, #f7f7f7);
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  margin: auto 0;
  padding: 4px;
}

.img {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 22px;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 48px;
  position: fixed;
  background-color: var(--Dark-3, #262d34);

  padding: 20px;

  display: flex;
  display: -webkit-flex;
  align-items: center;
  top: 0;
  z-index: 100;

  .logo {
    margin-left: 10px;
    height: 32px;
    background: url("../assets/images/logo.png") no-repeat;
    background-size: 32px 32px;
    background-position: left center;
    padding-left: 35px;
    line-height: 32px;
    flex-grow: 0;
    margin-right: 16px;
    cursor: pointer;
    font-weight: 600;
  }

  .day-of-word {
    max-width: 690px;
    margin: 0 auto;
  }

  .btns {
    flex-grow: 0;
    margin-left: 16px;
    margin-right: 10px;
    display: flex;
    display: -webkit-flex;
    align-items: center;

    .login-btn {
      border: 1px solid transparent;
      border-radius: 4px;
      box-sizing: border-box;
      text-align: center;
      letter-spacing: 1px;
      text-decoration: none;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      line-height: 24px;
      text-transform: uppercase;
      padding: 3px 16px;
      border-color: #0079d3;
      color: #0079d3;
      fill: #0079d3;
      display: inline-block;
      cursor: pointer;

      &:nth-child(2) {
        margin: 0 10px;
      }
    }

    .user {
      width: auto;
      height: 24px;
      background: url("../assets/images/avatar.png") no-repeat;
      background-size: 24px 24px;
      background-position: left center;
      padding-left: 28px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      cursor: pointer;
      padding: 12px 12px 12px 28px;

      &::after {
        content: "";
        width: 0;
        height: 0;
        border-top: 5px solid #878a8c;
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        margin-top: 5px;
        margin-left: 10px;
      }
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

      a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        cursor: pointer;
      }

      a:hover {
        background-color: #f1f1f1
      }
    }

    .user-box:hover .dropdown-content {
      display: block;
    }
  }

}</style>
