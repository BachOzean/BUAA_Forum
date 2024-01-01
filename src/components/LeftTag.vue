<template>
  <div class="box">
    <div class="div">
      <div class="div-2">热门标签</div>
    </div>
    <div class="tag-box" v-for="(tag, index) in tags" :key="index">
      <!--      <img loading="lazy" :src="community.imageUrl" class="community-image" alt=""/>-->
      <div class="div-4">
        <div class="div-5">{{ tag.name }}</div>
        <div class="tag-count">
          <div class="tag-count-number">{{ tag.count }}</div>
          <div class="tag-count-text">个帖子在该标签下</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [
        {
          name: "日常",
          count: 100
        },
        {
          name: "学习",
          count: 1
        },
        {
          name: "求助",
          count: 114514
        },
        {
          name: "校园",
          count: 222
        }
      ]
    };
  },
  methods: {
    async getTopTags() {
      const response = await this.$axios.get("/top_tags")
      if (response.code !== 1000) {
        console.log(response)
      } else {
        this.tags = response.top_tags;
      }
    }
  },
  mounted() {
    this.getTopTags()
  }
};
</script>

<style scoped lang="less">
.box {
  border-radius: 16px;
  background-color: var(--Dark-3, #262d34);
  display: flex;
  margin-top: 20px;
  width: 100%;
  flex-direction: column;
  padding: 20px 23px 20px 24px;
  max-width: 310px;
}

@media (max-width: 312px) {
  .box {
    padding: 0 20px;
  }
}

.div {
  display: flex;
  padding-right: 8px;
  justify-content: space-between;
  gap: 3px;
}

.div-2 {
  color: var(--secondary-color-background-2, #f7f7f7);
  font: 100 36px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
  margin-bottom: 20px;
}

.img {
  aspect-ratio: 1;
  object-fit: contain;
  margin-left: 30px;
  width: 40px;
  overflow: hidden;
  align-self: start;
  margin-top: 4px;
  max-width: 100%;
}

.tag-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  gap: 10px;
}

.tag-count {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}

.tag-count-number {
  color: var(--Secondary-Color-Secondary-3, #97989D);

  /* Regular 10 */
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 160% */
}

.tag-count-text {
  color: var(--Secondary-Color-Secondary-3, #97989D);

  /* Regular 10 */
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 160% */
}

.community-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 50px;
  align-items: flex-start;
  overflow: hidden;
  max-width: 100%;
}

.div-4 {
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
}

.div-5 {
  color: var(--secondary-color-background-2, #f7f7f7);
  white-space: nowrap;
  font: 400 20px/20px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
}

@media (max-width: 312px) {
  .div-5 {
    white-space: initial;
  }
}


</style>
