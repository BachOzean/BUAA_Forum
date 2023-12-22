<template>
  <div class="content">
    <svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-bubble" viewBox="0 0 1024 1024">
          <title>bubble</title>
          <path class="path1"
                d="M512 224c8.832 0 16 7.168 16 16s-7.2 16-16 16c-170.464 0-320 89.728-320 192 0 8.832-7.168 16-16 16s-16-7.168-16-16c0-121.408 161.184-224 352-224zM512 64c-282.784 0-512 171.936-512 384 0 132.064 88.928 248.512 224.256 317.632 0 0.864-0.256 1.44-0.256 2.368 0 57.376-42.848 119.136-61.696 151.552 0.032 0 0.064 0 0.064 0-1.504 3.52-2.368 7.392-2.368 11.456 0 16 12.96 28.992 28.992 28.992 3.008 0 8.288-0.8 8.16-0.448 100-16.384 194.208-108.256 216.096-134.88 31.968 4.704 64.928 7.328 98.752 7.328 282.72 0 512-171.936 512-384s-229.248-384-512-384zM512 768c-29.344 0-59.456-2.24-89.472-6.624-3.104-0.512-6.208-0.672-9.28-0.672-19.008 0-37.216 8.448-49.472 23.36-13.696 16.672-52.672 53.888-98.72 81.248 12.48-28.64 22.24-60.736 22.912-93.824 0.192-2.048 0.288-4.128 0.288-5.888 0-24.064-13.472-46.048-34.88-56.992-118.592-60.544-189.376-157.984-189.376-260.608 0-176.448 200.96-320 448-320 246.976 0 448 143.552 448 320s-200.992 320-448 320z"></path>
        </symbol>
        <symbol id="icon-star" viewBox="0 0 1024 1024">
          <title>star</title>
          <path class="path1"
                d="M1020.192 401.824c-8.864-25.568-31.616-44.288-59.008-48.352l-266.432-39.616-115.808-240.448c-12.192-25.248-38.272-41.408-66.944-41.408s-54.752 16.16-66.944 41.408l-115.808 240.448-266.464 39.616c-27.36 4.064-50.112 22.784-58.944 48.352-8.8 25.632-2.144 53.856 17.184 73.12l195.264 194.944-45.28 270.432c-4.608 27.232 7.2 54.56 30.336 70.496 12.704 8.736 27.648 13.184 42.592 13.184 12.288 0 24.608-3.008 35.776-8.992l232.288-125.056 232.32 125.056c11.168 5.984 23.488 8.992 35.744 8.992 14.944 0 29.888-4.448 42.624-13.184 23.136-15.936 34.88-43.264 30.304-70.496l-45.312-270.432 195.328-194.944c19.296-19.296 25.92-47.52 17.184-73.12zM754.816 619.616c-16.384 16.32-23.808 39.328-20.064 61.888l45.312 270.432-232.32-124.992c-11.136-6.016-23.424-8.992-35.776-8.992-12.288 0-24.608 3.008-35.744 8.992l-232.32 124.992 45.312-270.432c3.776-22.56-3.648-45.568-20.032-61.888l-195.264-194.944 266.432-39.68c24.352-3.616 45.312-18.848 55.776-40.576l115.872-240.384 115.84 240.416c10.496 21.728 31.424 36.928 55.744 40.576l266.496 39.68-195.264 194.912z"></path>
        </symbol>
      </defs>
    </svg>

    <div class="blog-container">

      <div class="blog-header">
        <div class="blog-cover">
          <div class="blog-author">
            <h3>{{post.user_name}}</h3>
          </div>
        </div>
      </div>

      <div class="blog-body">
        <div class="blog-title">
          <h1><a href="#">{{ post.title }}</a></h1>
        </div>
        <div class="blog-summary">
          <p>I love working on fresh designs that <a href="https://www.youtube.com/watch?v=hANtM1vJvOo">breathe</a>. To
            that end, I need to freshen up my portfolio here because it does exactly the opposite. For the next month I
            will be working almost exclusively on my portfolio. Sounds like a lot of fun!</p>
        </div>
        <div class="blog-tags">
          <ul>
            <li><a href="#">css</a></li>
            <li><a href="#">web design</a></li>
            <li><a href="#">codepen</a></li>
            <li><a href="https://twitter.com/russbeye">twitter</a></li>
          </ul>
        </div>
        <div class="blog-content markdown-body" v-html="post.content"
             style="background-color: white;color: #0d1117"></div>
      </div>


      <div class="blog-footer">
        <ul>
          <li class="published-date">{{post.post_time}}}</li>
          <li class="comments"><a href="#">
            <svg class="icon-bubble">
              <use xlink:href="#icon-bubble"></use>
            </svg>
            <span class="numero">4</span></a></li>
          <li class="shares"><a href="#">
            <svg class="icon-star" @click="vote(post.post_id)">
              <use xlink:href="#icon-star"></use>
            </svg>
            <span class="numero">{{ post.likes_count }}</span></a></li>
        </ul>
      </div>

    </div>


    <!--    <div class="left">-->
    <!--      <div class="container">-->
    <!--        <div class="post">-->
    <!--          <a class="vote">-->
    <!--            <span class="iconfont icon-up" @click="vote(post.post_id, 1)"></span>-->
    <!--          </a>-->
    <!--          <span class="text">{{ post.vote_num }}</span>-->
    <!--          <a class="vote">-->
    <!--            <span class="iconfont icon-down" @click="vote(post.post_id, -1)"></span>-->
    <!--          </a>-->
    <!--        </div>-->
    <!--        <div class="l-container">-->
    <!--          <h4 class="con-title">{{ post.title }}</h4>-->
    <!--          <div class="con-info markdown-body" v-html="post.content"></div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      &lt;!&ndash; 评论区 &ndash;&gt;-->
    <!--      <Comment :sourceId="this.$route.params.id"></Comment>-->
    <!--    </div>-->
    <!--    <div class="right">-->
    <!--      <div class="topic-info">-->
    <!--        <h5 class="t-header"></h5>-->
    <!--        <div class="t-info">-->
    <!--          <a class="avatar"></a>-->
    <!--          <span class="topic-name">b/{{ post.community.community_name }}</span>-->
    <!--        </div>-->
    <!--        <p class="t-desc">{{ post.community.introduction }}</p>-->
    <!--        <p class="t-create-time">{{ post.community.create_time }}</p>-->
    <!--        <div class="date">{{ create_time }}</div>-->
    <!--        <button class="topic-btn" @click="goCommunityDetail(post.community.community_id)">JOIN</button>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
// import Comment from '../components/Comment.vue';
import Vue from 'vue';

export default {
  name: "Content",
  // components: { Comment },
  data() {
    return {
      post: {
        post_id: 0,
        title: '11111111111',
        content: "`code` $$a_x $$ 你还有什么不懂的，不懂的话就去原两把吧，原着原着，你就醒悟了，你会发现，原来还是自己原的太少，为什么要放弃原神这款旷世之作而去玩其他答辩游戏，原神带给你的不止有享受感，欢快感，还给你带来了真理，人为什么会愤怒，为什么会难过，为什么会不幸福，究其根本就是原的太少，你越原越兴奋，越原越幸福，越幸福才要继续原，幸福产自原神，原神生产幸福，幸福围绕原神，原神发散幸福，将你开始原的一刻记作起点，将结束原的那一刻记作终点，起点趋于负无穷，终点趋于正无穷，无限地原，无限的真理，真理就是原得太少，原得不够多，真理驱使我们的前进，前进的我们悟出真理，原来是我原的太少，原来原神是无限的，有限的电源，手机的性能，寿命，这些物理因素并不能限制原的进行，不能阻止真理的诞生，不能阻止追寻真理的我们，我们的大脑是强大的，可以包罗万象，你看，天空被我们轻易地吸收，汪洋被我们轻易地容纳，而原神，存在我们的脑内，即使没有手机，没有电脑等载体，我们存在真理的大脑依旧可以诞生生产真理的原神，我们诞生出原神，原神孕育出真理，真理滋养着原神，原神生产出真理，这样一来，世界便是原神，宇宙便是原神，原神便是无限，有限的世间万物和无限的原神相比，根本不值一提，有限在无限面前只是一瞬，我们将原神的记忆传承给下一代，传承给新的生物，传承给新的世界，原的记忆在宇宙中流传，我们的死亡并不是终点，这是下一次原的起点，不会终结",
        user_name: 'default',
        post_time: '2023',
        likes_count: 0,
        community: {
          community_id: 0,
          community_name: '11',
          introduction: '1',
          create_time: '11111',
        },
      },
    }
  },
  methods: {
    getPostDetail() {
      this.$axios({
        method: "get",
        url: "/posts/" + this.$route.params.id,
      })
          .then(response => {
            if (response.code == 1000) {
              let MarkdownIt = require('markdown-it');
              let md = new MarkdownIt();
              this.post = response.post;
              this.post.content = md.render(this.post.content);
              console.log(this.post)
            } else {
              console.log(response.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    vote(post_id) {
      this.$axios({
        method: "post",
        url: "/vote",
        data: {
          post_id: post_id,
        }
      })
          .then(response => {
            if (response.code == 1000) {
              console.log("点赞成功");
              this.getPostDetail();
            } else if (response.code == 1009) {
              Vue.prototype.$message.error('请勿重复投票')
            } else {
              console.log(response.msg);
              Vue.prototype.$message.error('请先登录')
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    goCommunityDetail(community_id) {
      this.$router.push({
        name: 'Community',
        params: {
          id: community_id
        }
      });
    },
  },
  mounted() {
    this.getPostDetail();
  }
};
</script>

<style lang="less" scoped>
body {
  background: #e5ded8;
  box-sizing: border-box;
}

// Blog container
//-------------------------
.blog-container {
  background: #fff;
  border-radius: 5px;
  box-shadow: hsla(0, 0, 0, .2) 0 4px 2px -2px;
  font-family: "adelle-sans", sans-serif;
  font-weight: 100;
  margin: 48px auto;
  width: 20rem;
  @media screen and (min-width: 480px) {
    width: 28rem;
  }
  @media screen and (min-width: 767px) {
    width: 40rem;
  }
  @media screen and (min-width: 959px) {
    width: 50rem;
  }
}

.blog-container a {
  color: #4d4dff;
  text-decoration: none;
  transition: .25s ease;

  &:hover {
    border-color: #ff4d4d;
    color: #ff4d4d;
  }
}

// Blog header
//-------------------------
.blog-cover {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/yosemite-3.jpg");
  background-size: cover;
  border-radius: 5px 5px 0 0;
  height: 15rem;
  box-shadow: inset hsla(0, 0, 0, .2) 0 64px 64px 16px;
}

.blog-author,
.blog-author--no-cover {
  margin: 0 auto;
  padding-top: .125rem;
  width: 80%;
}

.blog-author h3::before,
.blog-author--no-cover h3::before {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/russ.jpeg");
  background-size: cover;
  border-radius: 50%;
  content: " ";
  display: inline-block;
  height: 32px;
  margin-right: .5rem;
  position: relative;
  top: 8px;
  width: 32px;
}

.blog-author h3 {
  color: #fff;
  font-weight: 100;
}

.blog-author--no-cover h3 {
  color: lighten(#333, 40%);
  font-weight: 100;
}

// Blog body
//-------------------------
.blog-body {
  margin: 0 auto;
  width: 80%;
}

.video-body {
  height: 100%;
  width: 100%;
}

.blog-title h1 a {
  color: #333;
  font-weight: 100;
}

.blog-summary p {
  color: lighten(#333, 10%);
}

.blog-content h2 a {
  color: #333;
  font-weight: 80;
  padding-top: 20px;
}

.blog-tags ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
}

.blog-tags li + li {
  margin-left: .5rem;
}

.blog-tags a {
  border: 1px solid lighten(#333, 40%);
  border-radius: 3px;
  color: lighten(#333, 40%);
  font-size: .75rem;
  height: 1.5rem;
  line-height: 1.5rem;
  letter-spacing: 1px;
  padding: 0 .5rem;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 5rem;
}

// Blog footer
//-------------------------
.blog-footer {
  border-top: 1px solid lighten(#333, 70%);
  margin: 0 auto;
  padding-bottom: .125rem;
  width: 80%;
}

.blog-footer ul {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  padding-left: 0;
}

.blog-footer li:first-child {
  margin-right: auto;
}

.blog-footer li + li {
  margin-left: .5rem;
}

.blog-footer li {
  color: lighten(#333, 40%);
  font-size: .75rem;
  height: 1.5rem;
  letter-spacing: 1px;
  line-height: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  white-space: nowrap;

  & a {
    color: lighten(#333, 40%);
  }
}

.comments {
  margin-right: 1rem;
}

.published-date {
  border: 1px solid lighten(#333, 40%);
  border-radius: 3px;
  padding: 0 .5rem;
}

.numero {
  position: relative;
  top: -0.5rem;
}

// Icons
//-------------------------
.icon-star,
.icon-bubble {
  fill: lighten(#333, 40%);
  height: 24px;
  margin-right: .5rem;
  transition: .25s ease;
  width: 24px;

  &:hover {
    fill: #ff4d4d;
  }
}

.content {
  max-width: 100%;
  min-height: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 24px;
  margin-top: 48px;

  .left {
    flex-grow: 1;
    max-width: 740px;
    border-radius: 4px;
    word-break: break-word;
    background: #ffffff;
    border: #edeff1;
    flex: 1;
    margin: 32px;
    margin-right: 12px;
    padding-bottom: 30px;
    position: relative;

    .container {
      width: 100%;
      height: auto;
      position: relative;


      .post {
        align-items: center;
        box-sizing: border-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        height: 100%;
        left: 0;
        padding: 8px 4px 8px 0;
        position: absolute;
        top: 0;
        width: 40px;
        border-left: 4px solid transparent;
        background: #f8f9fa;

        .text {
          color: #1a1a1b;
          font-size: 12px;
          font-weight: 700;
          line-height: 16px;
          pointer-events: none;
          word-break: normal;
        }
      }

      .l-container {
        padding: 15px;
        margin-left: 40px;
        background-color: rgba(255, 255, 255, 0.8);

        .con-title {
          color: #000000;
          font-size: 18px;
          font-weight: 500;
          line-height: 22px;
          text-decoration: none;
          word-break: break-word;
        }

        .con-info {
          margin: 25px 0;
          line-height: 2;
          background-color: white;

          code {
            overflow-x: scroll !important;

            ::-webkit-scrollbar {
              width: 10px;
              height: 10px;
            }
          }
        }

        .con-cover {
          height: 512px;
          width: 100%;
          background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585999647247&di=7e9061211c23e3ed9f0c4375bb3822dc&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F04d8cda08e170f4a58c18c45a93c539375c22162.jpg") no-repeat;
          background-size: cover;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .user-btn {
          font-size: 12px;
          display: flex;
          display: -webkit-flex;

          .btn-item {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            margin-right: 10px;

            .iconfont {
              margin-right: 4px;
            }
          }
        }
      }
    }

    .comment {
      width: 100%;
      height: auto;
      position: relative;

      .c-left {
        .line {
          border-right: 2px solid #edeff1;
          // width: 20px;
          height: 100%;
          position: absolute;
          left: 20px;
        }

        .c-arrow {
          display: flex;
          display: -webkit-flex;
          position: absolute;
          z-index: 2;
          flex-direction: column;
          left: 12px;
          background: #ffffff;
          padding-bottom: 5px;
        }
      }

      .c-right {
        margin-left: 40px;
        padding-right: 10px;

        .c-user-info {
          margin-bottom: 10px;

          .name {
            color: #1c1c1c;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }

          .num {
            padding-left: 4px;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            color: #7c7c7c;
          }
        }

        .c-content {
          font-family: Noto Sans, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 21px;
          word-break: break-word;
          color: rgb(26, 26, 27);
        }
      }
    }
  }

  .right {
    flex-grow: 0;
    width: 312px;
    margin-top: 32px;

    .topic-info {
      width: 100%;
      // padding: 12px;
      cursor: pointer;
      background-color: #ffffff;
      color: #1a1a1b;
      border: 1px solid #cccccc;
      border-radius: 4px;
      overflow: visible;
      word-wrap: break-word;
      padding-bottom: 30px;

      .t-header {
        width: 100%;
        height: 34px;
        background: #0079d3;
      }

      .t-info {
        padding: 0 12px;
        display: flex;
        display: -webkit-flex;
        width: 100%;
        height: 54px;
        align-items: center;

        .avatar {
          width: 54px;
          height: 54px;
          background: url("../assets/images/avatar.png") no-repeat;
          background-size: cover;
          margin-right: 10px;
        }

        .topic-name {
          height: 100%;
          line-height: 54px;
          font-size: 16px;
          font-weight: 500;
        }
      }

      .t-desc,
      .t-create-time {
        font-family: Noto Sans, Arial, sans-serif;
        font-size: 14px;
        line-height: 21px;
        font-weight: 400;
        word-wrap: break-word;
        margin-bottom: 8px;
        padding: 0 12px;
      }

      .date {
        font-family: Noto Sans, Arial, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        margin-top: 20px;
        padding: 0 12px;
      }

      .topic-btn {
        width: 286px;
        height: 34px;
        line-height: 34px;
        color: #ffffff;
        margin: 12px auto 0 auto;
        background: #003f6d;
        border-radius: 4px;
        box-sizing: border-box;
        margin-left: 13px;
      }
    }
  }
}
</style>