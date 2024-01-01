<template>
  <div class="box">
    <div class="div">
      <div class="div-2">热门社团</div>
      <img loading="lazy" src="..\assets\images\arrow.png" class="img"
      />
    </div>
    <div class="community-box" v-for="(community, index) in communities" :key="index">
      <!--      <img loading="lazy" :src="community.imageUrl" class="community-image" alt=""/>-->
      <div class="div-4">
        <div class="div-5">{{ community.name }}</div>
        <div class="cnt">社团人数: {{ community.user_count }}</div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      communities: [
        {
          name: "篮球社团",
          user_count: 10,
          imageUrl: "../assets/images/basketball.png"
        },
        {
          name: "唱跳社团",
          user_count: 10,
          imageUrl: "../assets/images/sing.png"
        },
        {
          name: "Rap社团",
          user_count: 10,
          imageUrl: "../assets/images/rap.png"
        },
        {
          name: "数据库小组",
          user_count: 10,
          imageUrl: "../assets/images/database.png"
        }
      ]
    };
  },
  methods: {
    async getHotCommunity() {
      const response = await this.$axios.get("/top_communities")
      if (response.code !== 1000) {
        console.log(response)
      } else {
        this.communities = response.top_communities
        console.log(this.communities)
      }
    }
  },
  mounted() {
    this.getHotCommunity()
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

.community-box {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  gap: 10px;
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

.cnt {
  color: var(--Secondary-Color-Secondary-3, #97989D);

  /* Regular 10 */
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 160% */
}

@media (max-width: 312px) {
  .div-5 {
    white-space: initial;
  }
}

.div-7 {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  gap: 10px;
}

.img-3 {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  align-items: flex-start;
  box-shadow: 0px 3px 3px 0px rgba(239, 99, 86, 0.06);
  overflow: hidden;
  max-width: 100%;
}

.div-8 {
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
}

.div-9 {
  color: var(--secondary-color-background-2, #f7f7f7);
  white-space: nowrap;
  font: 400 18px/24px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
}

@media (max-width: 991px) {
  .div-9 {
    white-space: initial;
  }
}

.div-11 {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  gap: 10px;
}

.img-4 {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  align-items: flex-start;
  border-radius: 4px;
  border: 1px solid rgba(85, 161, 255, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(85, 161, 255, 0.06);
  overflow: hidden;
  max-width: 100%;
}

.div-12 {
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
}

.div-13 {
  color: var(--secondary-color-background-2, #f7f7f7);
  white-space: nowrap;
  font: 400 18px/24px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
}

@media (max-width: 991px) {
  .div-13 {
    white-space: initial;
  }
}

.div-15 {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  gap: 10px;
}

.img-5 {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  align-items: flex-start;
  box-shadow: 0px 3px 3px 0px rgba(255, 201, 99, 0.06);
  overflow: hidden;
  max-width: 100%;
}

.div-16 {
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
}

.div-17 {
  color: var(--secondary-color-background-2, #f7f7f7);
  white-space: nowrap;
  font: 400 18px/24px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
}

@media (max-width: 991px) {
  .div-17 {
    white-space: initial;
  }
}


.div-21 {
  color: var(--secondary-color-background-2, #f7f7f7);
  white-space: nowrap;
  font: 400 12px/18px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
}
</style>
