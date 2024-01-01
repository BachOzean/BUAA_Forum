
<template>
  <div class="box">
    <div class="div">
      <div class="div-2">热门社区</div>
      <img loading="lazy" src="..\assets\images\arrow.png" class="img"
      />
    </div>
    <div class="div-3">
      <img loading="lazy" src="..\assets\images\basketball.png" class="img-2"
      />
      <div class="div-4" >
        <div class="div-5" >篮球社团</div>
      </div>
    </div>
    <div class="div-7">
      <img
          loading="lazy"
          src="..\assets\images\sing.png" class="img-3"
      />
      <div class="div-8">
        <div class="div-9">唱跳社团</div>
      </div>
    </div>
    <div class="div-11">
      <img
          loading="lazy"
          src="..\assets\images\rap.png" class="img-4"
      />
      <div class="div-12">
        <div class="div-13">Rap社团</div>
      </div>
    </div>
    <div class="div-15">
      <img
          loading="lazy"
          src="..\assets\images\database.png" class="img-5"
      />
      <div class="div-16">
        <div class="div-17">数据库小组</div>
      </div>
    </div>
  </div>
</template>
<script setup>

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
  max-width: 170px;
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
  font: 100 24px/36px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
}
.img {
  aspect-ratio: 1;
  object-fit: contain;
  margin-left: 30px;
  width: 20px;
  overflow: hidden;
  align-self: start;
  margin-top: 4px;
  max-width: 100%;
}
.div-3 {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  gap: 10px;
}
.img-2 {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  align-items: flex-start;
  box-shadow: 0px 3px 3px 0px rgba(255, 171, 97, 0.06);
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
  font: 400 18px/24px Source Sans Pro, -apple-system, Roboto, Helvetica,
  sans-serif;
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
