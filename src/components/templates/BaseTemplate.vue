<template>
  <div class="base-template">
    <header class="base-template__header">
      <button
        v-if="showBackButton"
        class="base-template__back-btn"
        @click="$emit('back')"
        aria-label="뒤로 가기"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div class="base-template__header-text">
        <i v-if="icon" :class="icon" class="me-2"></i>
        <h1 class="base-template__heading">
          <slot name="header-title">{{ title }}</slot>
        </h1>
      </div>
    </header>

    <hr class="section-divider" />
    <main class="base-template__content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
  },
  showBackButton: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['back']);
</script>

<style lang="scss" scoped>
$header-height: 60px;
$spacing-md: 16px;

.section-divider {
  width: 100%;
  border: 0;
  height: 1px;
  background-color: $color-black-700;
}

.base-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: $color-white-000;

  &__header {
    @include flex-basic;
    height: 60px;
    padding: 0 16px;

    &-text {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: $color-black-700;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Noto Sans KR';
    }
  }

  &__back-btn {
    background: none;
    border: none;
    color: $color-black-700;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    margin-right: $spacing-md;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__heading {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;

    flex-grow: 1;
    padding: 16px;
    width: 100%;
    background-color: $color-white-200;
    font-family: 'Noto Sans KR', sans-serif;
  }
}
</style>
