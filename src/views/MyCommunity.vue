<template>
  <div>
    <left-rail></left-rail>

  <div class="content">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form :inline="true" :model="newcommunity" class="form">
        <el-row>
          <el-col>
            <el-form-item label="社团名称">
              <el-input v-model="newcommunity.community_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="社团简介">
              <el-input type="textarea" v-model="newcommunity.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="create_Community()">确 定</el-button>
    </el-dialog>
    <div class="c-l-header">
      <h1 class="title">我的社团</h1>
      <div class="search-text-box">
        <div class="search-text">
          <input type="text" class="search-text" placeholder="请输入社团的关键词" v-model="keyword"
                 @keyup.enter="searchCommunityList"/>
        </div>
      </div>
      <div class="publish-btn" @click="searchCommunityList">搜索</div>
      <div class="publish-btn" @click="dialogVisible = true">创建社团</div>

    </div>

    <ul class="c-l-list">
      <li class="c-l-item" v-for="community in communityList" :key="community.community_id">
        <div class="l-container" >
          <div class="comm" @click="goDetail(community.community_id)">
            <div>
              <h4 class="con-title">{{ community.community_name }}</h4>
            </div>

            <div class="con-memo">
              <p>{{ community.description }}</p>
            </div>
          </div>

          <button class="leave-button" @click="leaveCommunity(community.community_id)">
            退出
          </button>
        </div>

        <!-- 将成员列表改为横向排列 -->
        <div class="community-users">
          <h5>成员:</h5>
          <ul class="horizontal-user-list">
            <li v-for="user in community.users" :key="user.user_id" class="horizontal-user-item">
              {{ user.user_name }}
              <button class="follow-button" @click.stop="followUser(user.user_id)">
                关注
              </button>
            </li>
          </ul>
        </div>
      </li>
      <div class="pagination-block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
                       :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="communityTotal">
        </el-pagination>
      </div>
    </ul>
  </div>
  </div>
</template>
<script setup>


import Vue from "vue";
import LeftRail from "@/components/LeftRail.vue";

export default {
  name: "communities",
  components:{LeftRail},
  data() {
    var community = {
      community_id: 1,
      community_name: "test",
      description: "test-community",
      users: []
    };
    return {
      communityList: [community],
      pageNumber: 1,
      pageSize: 5,
      communityTotal: 1,
      keyword: '',
      isSearch: false,
      dialogVisible: false,
      newcommunity:{
        community_name: "",
        description: ""
      }
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    goDetail(id) {
      this.$router.push({name: "Community", params: {id: id}});
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      if (!this.isSearch) {
        this.getCommunityList();
      } else {
        this.searchCommunityList();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (!this.isSearch) {
        this.getCommunityList();
      } else {
        this.searchCommunityList();
      }
    },
    async searchCommunityList() {
      if (!this.keyword) {
        this.isSearch = false;
        this.getCommunityList();
        return;
      }
      this.isSearch = true;
      const response = await this.$axios({
        method: "get",
        url: "/search_community",
        params: {
          page: this.pageNumber,
          size: this.pageSize,
          keyword: this.keyword
        }
      });
      if (response.code === 1000) {
        console.log(response.data);
        this.communityList = response.data;
        this.communityTotal = response.total_num;
      } else {
        console.log(response.message);
      }
    },
    joinCommunity(communityId) {
      // 发送加入社区的请求
      this.$axios.post('/join_community', {'community_id': communityId})
          .then(response => {
            if (response.code === 509) {
              Vue.prototype.$message.error('请勿重复加入社区')
            } else if (response.code === 1000) {
              Vue.prototype.$message.success('成功加入社区')
              this.getCommunityList();
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    leaveCommunity(communityId) {
      this.$axios.post('/leave_community', {'community_id': communityId})
          .then(response => {
            if (response.code === 404) {
              Vue.prototype.$message.error('用户不属于该社团')
            } else if (response.code === 1000) {
              Vue.prototype.$message.success('成功退出社团')
              this.getCommunityList();
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    create_Community() {
      this.$axios.post('/community', this.newcommunity)
          .then(response => {
            console.log(response)
            if (response.code === 500) {
              Vue.prototype.$message.error('创建失败，检查社团是否已经存在')
            } else if (response.code === 201) {
              Vue.prototype.$message.success('成功创建社区')
              this.dialogVisible=false
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    getCommunityList() {
      this.$axios({
        method: "get",
        url: "/my_communities",
        params: {
          page: this.pageNumber,
          size: this.pageSize,
        }
      })
          .then(response => {
            console.log(response)
            if (response.code === 1000) {
              this.communityList = response.data;
              this.communityTotal = response.total_num;
              console.log(this.communityList)
            } else {
              console.log(response.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    followUser(user_id) {
      this.$axios.post('/add_friendship', {'user2_id': user_id})
          .then(response => {
            if (response.code === 1000) {

              Vue.prototype.$message.success("成功关注");
            } else {
              console.log(user_id)
              Vue.prototype.$message.error("关注失败");
            }
          })
          .catch(error => {
            console.error('Error adding friendship:', error.response.data.error);

          });
    }
  },
  mounted: function () {
    this.getCommunityList();
  },
}
</script>
<style scoped lang="less">
.leave-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 20px 2px 4px 2px; /* Adjust the top margin to create the desired gap */
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.search-text-box {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 300px;
  height: 40px;
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
  text-align: left;
  max-width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  display: block;
  padding: 20px 24px;
  margin-top: 88px;

  .title {
    text-align: center;
    color: #f5f5f5;
    font-weight: bold; /* or use a numeric value like 700 for bold */
    font-family: 'Source Sans Pro', sans-serif;
  }

  .join-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .join-button:hover {
    background-color: #45a049;
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
      display: flex;
      margin-top: 20px;
      flex-direction: column;
      padding: 20px;
      max-width: 800px;
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
          margin-top: 20px;
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
    max-width: 800px;

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
  .comm{
    display: flex;
    flex-direction: column;
  }
  .l-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    // flex-direction: column;
  }

  .text-container {
    flex-grow: 1;
    margin-right: 10px;
  }

  .button-container {
    flex-shrink: 0;
  }

  .community-users {
    margin-left: 20px;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-info button {
    margin-left: 10px;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px; /* 调整与下一个用户信息之间的间距 */
  }

  .user-info span {
    flex-grow: 1; /* 让用户名占满剩余空间 */
    margin-right: 10px; /* 调整用户名与按钮之间的间距 */
    font-weight: bold; /* 加粗用户名字体 */
  }

  .follow-button {
    background-color: #3498db; /* 设置按钮背景颜色 */
    color: #fff; /* 设置按钮文字颜色 */
    padding: 6px 10px; /* 调整按钮内边距 */
    border: none; /* 移除按钮边框 */
    border-radius: 4px; /* 圆角按钮 */
    cursor: pointer; /* 添加手型光标 */
  }


}

.horizontal-user-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.horizontal-user-item {
  margin-right: 10px; /* 调整成员之间的间距 */
}

/* 使用 'Source Sans Pro' 字体 */
.content {
  margin-left: 350px;
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
