<template>
  <div class="columns">
    <div class="content">
      <div class="left">
        <SideBar></SideBar>
      </div>
      <div class="center">
        <!-- <h4 class="c-l-title">热门帖子</h4> -->


        <div class="c-l-header">
          <div class="new btn-iconfont" :class="{ active: timeOrder }" @click="selectOrder('time')">
            <i class="iconfont icon-polygonred"></i>New
          </div>
          <div class="top btn-iconfont" :class="{ active: scoreOrder }" @click="selectOrder('score')">
            <i class="iconfont icon-top"></i>Score
          </div>
          <div class="search-text-box">
            <div class="search-text">
              <input type="text" class="search-text" placeholder="请输入帖子的关键词" v-model="keyword"
                     @keyup.enter="searchPost"/>
            </div>
          </div>
          <div class="publish-btn" @click="goPublish">发表</div>
        </div>
        <ul class="c-l-list">
          <li class="c-l-item" v-for="post in postList" :key="post.post_id">
            <div class="blog-container" @click="goDetail(post.post_id)">
              <div class="blog-header">
                <div class="blog-author--no-cover">
                  <h3>Russ Beye</h3>
                </div>
                <button class="button" @click.stop="onClick">
                  <span>🎉</span>
                  <span>点</span>
                  <span>赞</span>
                </button>
              </div>

              <div class="blog-body">
                <div class="blog-title">
                  <h1><a href="#">{{ post.title }}</a></h1>
                </div>
                <div class="blog-summary">
                  <p>{{ post.content }} </p>
                </div>
                <div class="blog-tags">
                  <ul>
                    <li><a href="#">{{post.tag_names[0]}}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <div class="pagination-block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
                           :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="postsTotal">
            </el-pagination>
          </div>
        </ul>
      </div>
      <div class="right">
        <div class="run-time-container">
          <TimeMeter></TimeMeter>
        </div>
        <div class="github-project-card-container">
          <GithubProjectCard language="all"></GithubProjectCard>
        </div>
        <div class="github-golang-project-card-container">
          <GithubProjectCard language="golang" title="Golang热门项目排行榜"></GithubProjectCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
// @ is an alias to /src
import TimeMeter from '../components/TimeMeter.vue';
import GithubProjectCard from './components/GithubProjectCard.vue';
import Vue from 'vue';
import confetti from 'canvas-confetti';

export default {
  name: "Home",
  components: {TimeMeter, SideBar, GithubProjectCard},
  data() {
    var post1 = {
      post_id: 1,
      title: "test",
      content: "test",
      like_num: 1,
      user_id: 1,
      post_time: '',
      comments: 1
    };
    var post2 = {
      post_id: 2,
      title: "一眼丁真",
      content: "aaaa原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神原神",
      like_num: 1,
      user_id: 1,
      post_time: '',
      comments: 1
    };

    return {
      order: "time",
      //初始化一个postList数组，向其中添加一个post
      postList: [post1, post2],
      pageNumber: 1,
      pageSize: 5,
      postsTotal: 1,
      keyword: '',
      isSearch: false
    };
  },
  created() {
    if (this.$store.state.isSearch) {
      this.keyword = this.$store.state.keyword;
      this.$store.state.isSearch = false;
      this.searchPost();
    } else {
      this.getPostList();
    }
  },
  methods: {
    onClick(event) {
      // const button = document.querySelector('.button');
      // const buttonRect = button.getBoundingClientRect();

      const confettiOptions = {
        particleCount: 100,
        spread: 60,
        origin: {
          x: event.x / document.documentElement.clientWidth,
          y: event.y / 900
        }
      };
      console.log(event.x / document.documentElement.clientWidth);
      console.log(event.y / 1000);
      confetti(confettiOptions);
      this.vote();
    },
    selectOrder(order) {
      this.order = order;
      this.getPostList();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      if (!this.isSearch) {
        this.getPostList();
      } else {
        this.searchPost();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (!this.isSearch) {
        this.getPostList();
      } else {
        this.searchPost();
      }
    },
    goDetail(id) {
      this.$router.push({name: "Content", params: {id: id}});
    },
    getPostList() {
      this.$axios({
        method: "get",
        url: "/get_posts",
        params: {
          page: this.pageNumber,
          size: this.pageSize,
          order: this.order,
        }
      })
          .then(response => {
            if (response.code === 1000) {
              this.postList = response.data;
              this.postsTotal = response.total_num;
            } else {
              console.log(response.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    goPublish() {
      this.$router.push({name: "Publish"});
    },
    vote(post_id, direction) {
      this.$axios({
        method: "post",
        url: "/vote",
        data: {
          post_id: post_id,
          direction: direction,
        }
      })
          .then(response => {
            if (response.code == 1000) {
              console.log("vote success");
              this.getPostDetail();
            } else if (response.code == 1009) {
              Vue.prototype.$message.error('请勿重复投票')
            } else if (response.code == 1010) {
              Vue.prototype.$message.error('已过投票时间')
            } else {
              console.log(response.msg);
              Vue.prototype.$message.error('请先登录')
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    async searchPost() {
      if (!this.keyword) {
        this.isSearch = false;
        this.getPostList();
        return;
      }
      this.isSearch = true;
      const response = await this.$axios({
        method: "get",
        url: "/search_post",
        params: {
          page: this.pageNumber,
          size: this.pageSize,
          keyword: this.keyword
        }
      });
      if (response.code === 1000) {
        console.log(response.data);
        this.postList = response.data;
        this.postsTotal = response.total_num;
      } else {
        console.log(response.message);
      }
    },
  },
  computed: {
    timeOrder() {
      return this.order == "time";
    },
    scoreOrder() {
      return this.order == "score";
    }
  }
};
</script>

<style scoped lang="less">

button {
  cursor: pointer;
  font: inherit;
  margin: 0;
  padding: 0;
}

.button {
  background-color: #2c353d;
  color: #fff;
  border: 0;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5em 1.25em;
  border-radius: 0.5em;
  z-index: 999;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  box-shadow: 0px 1.7px 2.2px rgba(0, 0, 0, 0.02),
  0px 4px 5.3px rgba(0, 0, 0, 0.028),
  0px 7.5px 10px rgba(0, 0, 0, 0.035),
  0px 13.4px 17.9px rgba(0, 0, 0, 0.042),
  0px 25.1px 33.4px rgba(0, 0, 0, 0.05),
  0px 60px 80px rgba(0, 0, 0, 0.07);
}

.button:active {
  transform: scale(1.04);
}

// Blog container
//-------------------------
.blog-container {
  background: #262d34;
  border-radius: 6px;
  font-family: Source Sans Pro, Microsoft YaHei, sans-serif;
  font-weight: 100;
  width: auto;
}

.blog-container a {
  color: #4d4dff;
  text-decoration: none;
  transition: .25s ease;

  &:hover {
    border-color: #fa6733;
    color: #fa6733;
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

.blog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-author,
.blog-author--no-cover {
  margin: 0 10px;
  width: 100%;
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
  color: #f5f5f5;
  font-weight: 100;
}

.blog-author--no-cover h3 {
  color: lighten(#f5f5f5, 40%);
  font-weight: 100;
}

// Blog body
//-------------------------
.blog-body {
  margin: 0 10px;
  width: 90%;
  row-gap: 5px;
}

.video-body {
  height: 100%;
  width: 100%;
}

.blog-title h1 a {
  color: #f5f5f5;
  font-weight: 100;
  font-family: Source Sans Pro;

}

.blog-summary p {
  color: #f5f5f5;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.blog-tags ul {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  gap: 10px;
}

.blog-tags li {
  border-radius: 20px;
  background: #2C353D;
}

.blog-tags a {
  //border: 1px solid lighten(#333, 40%);

  border-radius: 3px;
  font-size: .75rem;
  height: 1.5rem;
  line-height: 1.5rem;
  letter-spacing: 1px;
  padding: 0 .5rem;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 5rem;
  color: var(--Secondary-Color-Secondary-5, #C5D0E6);
  /* SemiBold 10 */
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
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
  flex: auto;
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
    fill: #fa6733;
  }
}

.columns {
  max-width: 100%;
}

.search-text-box {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 300px;
}

.search-text {
  color: var(--secondary-color-secondary-4, #858ead);
  background: #2c353d;
  font-feature-settings: "clig" off, "liga" off;
  font: 400 14px/22px Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
  border-radius: 4px;
  width: 100%;
  padding: 3px;
}

.content {
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 88px auto 0;
  padding: 20px 20px;
  background: #2c353d;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2c353d, #4f5d73);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2c353d, #303f56);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  .left {
    width: 312px;
    height: fit-content;
    margin-top: 20px;
    background: var(--Dark-3, #262d34);
    border-radius: 6px;
  }

  .center {
    width: 800px;
    padding-bottom: 10px;
    margin: 0 24px;

    .c-l-title {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      color: #1a1a1b;
      text-transform: unset;
      padding-bottom: 10px;
    }

    .c-l-header {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      display: -ms-flexbox;
      flex-flow: row nowrap;
      height: 56px;
      -ms-flex-pack: start;
      justify-content: flex-start;
      margin-bottom: 16px;
      border-radius: 16px;
      background-color: var(--Dark-3, #262d34);
      display: flex;
      padding: 20px;
      gap: 20px;

      .iconfont {
        margin-right: 4px;
      }

      .btn-iconfont {
        display: flex;
        display: -webkit-flex;
      }

      .active {
        background: #f6f7f8;
        color: #0079d3;
        fill: #0079d3;
        border-radius: 20px;
        height: 32px;
        line-height: 32px;
        margin-right: 8px;
        padding: 0 10px;
      }

      .new {
        font-size: 14px;
        margin-right: 18px;
      }

      .top {
        font-size: 14px;
      }

      .search {
        flex-grow: 0.5;
        margin: 0 auto;
        max-width: 650px;
        position: relative;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        border-radius: 6px;
        color: var(--secondary-color-secondary-4, #858ead);
        background-color: var(--Dark-4, #858ead);

        .search-icon {
          width: 18px;
          height: 18px;
          line-height: 18px;
          background-size: cover;
          display: inline-block;
          position: absolute;
          cursor: pointer;
          border-radius: 4px;
          right: 1rem;
          padding: 5px;

          &:hover {
            background: silver;
          }
        }

        .s-input {

          color: var(--secondary-color-secondary-4, #858ead);
          background: #2c353d;
          font-feature-settings: "clig" off, "liga" off;
          font: 400 14px/22px Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
          border-radius: 4px;
          width: 100%;

        }
      }

      .publish-btn {
        width: fit-content;
        height: fit-content;
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
        fill: #ff6934;
        display: inline-block;
        cursor: pointer;
        border-color: #ff6934;
        background: #ff6934;
        color: #fff;

        &:nth-child(2) {
          margin: 0 10px;
        }
      }

      .sort {
        margin-left: 300px;
        display: flex;
        color: #0079d3;
        display: -webkit-flex;
        align-items: center;

        .sort-triangle {
          width: 0;
          height: 0;
          border-top: 5px solid #0079d3;
          border-right: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid transparent;
          margin-top: 5px;
          margin-left: 10px;
        }
      }
    }

    @media (max-width: 991px) {
      .c-l-header {
        max-width: 100%;
        margin-top: 20px;
      }
    }

    .c-l-list {
      .c-l-item {
        list-style: none;
        cursor: pointer;
        margin-bottom: 10px;
        color: #878a8c;
        position: relative;
        border-radius: 16px;
        background-color: var(--Dark-3, #262d34);
        box-shadow: hsla(0, 0, 0, .2) 0 4px 2px -2px;

        display: flex;
        margin-top: 20px;
        flex-direction: column;
        padding: 20px;

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

          .iconfont {
            margin-right: 0;
          }

          .down {
            transform: scaleY(-1);
          }

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

          .con-title {
            color: #000000;
            font-size: 18px;
            font-weight: 500;
            line-height: 22px;
            text-decoration: none;
            word-break: break-word;
          }

          .con-memo {
            margin-top: 10px;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 4;
            display: -webkit-box;
            -webkit-box-orient: vertical;
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
            font-size: 14px;
            display: flex;
            display: -webkit-flex;

            .btn-item {
              display: flex;
              display: -webkit-flex;
              margin-right: 10px;

              .iconfont {
                margin-right: 4px;
              }
            }
          }
        }
      }
    }

    .pagination-block {
      background: #fff;
      padding: 8px;
    }
  }


  .right {
    width: 312px;
    margin-top: 28px;

    .run-time-container {
      margin-bottom: 1rem;
    }

    .github-project-card-container {
      margin: 1rem 0;
    }
  }
}
</style>
