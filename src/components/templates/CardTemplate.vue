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
  background-color: $color-gray-200;
  border-radius: 8px;
  margin: 16px 0;
  padding: 16px;
}
</style>
