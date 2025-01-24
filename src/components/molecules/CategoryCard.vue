<template>
  <div class="category-card">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.category-card {
  display: flex;
  background-color: $color-white-000;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  margin-bottom: 8px;
  margin-right: 8px;
  padding: 16px;

  min-width: 160px;
}
</style>
