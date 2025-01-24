<template>
  <div class="basic-layout">
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.basic-layout {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: $color-white-100;
  padding-top: env(safe-area-inset-top); // 노치 영역
}

.main-content {
  padding: 16px;
  height: 100%;
}
</style>
