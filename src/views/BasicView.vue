<template>
  <BasicTemplate>
    <div class="main-container">
      <h2 class="main-title">vue-js basic page</h2>
      <div class="content-area">메인 컨텐츠</div>
    </div>
  </BasicTemplate>
</template>

<script setup>
import BasicTemplate from '@components/templates/BasicTemplate.vue';
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-title {
  color: $color-black-700;
  font-size: 24px;
  margin-bottom: 20px;
}

.content-area {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
