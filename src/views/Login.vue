<template>
  <div class="page-container">
    <div class="left-light"></div>
    <div class="right-light"></div>
    <div class="login-box">
      <h2>Login</h2>
      <form>
        <div class="user-box">
          <input type="text" v-model="username" required>
          <label>Username</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="password" required>
          <label>Password</label>
        </div>
        <div class="message-container" v-if="this.message !== ''">
          <div class="message-box">
            <p>{{ message }}</p>
          </div>
        </div>
        <div class="button-container">
          <a href="#" @click.prevent="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
          <a href="#" @click.prevent="goToSignUp">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            SignUp
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    submit() {
      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        this.message = res.message;
        if (res.code == 1000) {
          localStorage.setItem("loginResult", JSON.stringify(res.user));
          this.$store.commit("login", res.user);
          this.$router.push({name: "Home"})
        } else {
          console.log(res.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    goToSignUp() {
      this.$router.push({name: "SignUp"});
    }

  }
};
</script>

<style scoped>
html {
  height: 100%;
}

.left-light {
  position: fixed;
  left: 0;
  top: -300px;
  width: 310px;
  height: 1150px;
  background-image: linear-gradient(
      180deg,
      rgba(84, 84, 212, 0.27) 0%,
      rgba(84, 84, 212, 0.11) 100%
  );
  transform: rotate(-54deg);
  border-radius: 155px;
  filter: blur(99.5px);
  z-index: 0;
}

.right-light {
  position: fixed;
  right: 0;
  top: 0;
  width: 310px;
  height: 1150px;
  background-image: linear-gradient(
      180deg,
      rgba(251, 168, 28, 0.11) 0%,
      rgba(224, 86, 136, 0.06) 100%
  );
  transform: rotate(65.5deg);
  border-radius: 155px;
  filter: blur(99.5px);
  z-index: 0;

}

.message-container {
  position: relative;
  width: 100%;
  padding: 10px;
  border: 2px solid #03e9f4; /* 主题颜色 */
  background-color: rgb(118, 118, 118);
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: inset 0 0 5px 1px #03e9f4; /* 内发光效果 */
}

.message-box {
  color: #fff;
  text-align: left;
}

.page-container {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
  font-family: "Poppins", system-ui;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.signup-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>