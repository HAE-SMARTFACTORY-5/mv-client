<template>
  <div class="card-template">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card-template {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  // background-color: $color-gray-200;
  background-color: $color-white-000;
  border-radius: 8px;
  margin: 8px 0;
  padding: 16px;
}
</style>
