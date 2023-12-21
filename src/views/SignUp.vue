<template>
  <div class="signup-box">
    <h2>SignUp</h2>
    <form>
      <div class="user-box">
        <input type="text" v-model="username" required>
        <label>Username*</label>
      </div>
      <div class="user-box">
        <input type="text" v-model="gender" required>
        <label>Gender*</label>
      </div>
      <div class="user-box">
        <input type="password" v-model="password" required>
        <label>Password*</label>
      </div>
      <div class="user-box">
        <input type="password" v-model="confirm_password" required>
        <label>Confirm Password*</label>
      </div>
      <div class="user-box">
        <input type="text" v-model="academy" required>
        <label>Academy</label>
      </div>
      <div class="user-box">
        <input type="text" v-model="email" required>
        <label>E-mail</label>
      </div>
      <div class="message-container" v-if="this.message !== ''">
        <div class="message-box">
          <p>{{ message }}</p>
        </div>
      </div>


      <a href="#" @click.prevent="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      email: '',
      academy: '',
      gender: '',
      confirm_password: "",
      message: ''
    };
  },
  computed: {},
  created() {

  },
  methods: {
    submit() {
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          email: this.email,
          gender: this.gender,
          password: this.password,
          confirm_password: this.confirm_password
        }
      }).then((res) => {
        this.message = res.message
        if (res.code == 1000) {
          console.log('signup success');
          this.$router.push({name: "Login"});
        } else {
          console.log(res.message);
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
};
</script>
<style scoped>
html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
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

.signup-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.signup-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.signup-box .user-box {
  position: relative;
}

.signup-box .user-box input {
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

.signup-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.signup-box .user-box input:focus ~ label,
.signup-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.signup-box form a {
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

.signup-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}

.signup-box a span {
  position: absolute;
  display: block;
}

.signup-box a span:nth-child(1) {
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

.signup-box a span:nth-child(2) {
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

.signup-box a span:nth-child(4) {
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
