<template>
  <nav class="navbar">
    <div class="navbar__left">
      <button class="navbar__toggle" @click="toggleSidebar">
        <span class="toggle-icon"></span>
      </button>
      <div class="navbar__logo">Logo</div>
    </div>
    <div class="navbar__menu">
      <a href="#" class="navbar__link">홈</a>
      <a href="#" class="navbar__link">소개</a>
      <a href="#" class="navbar__link">연락처</a>
    </div>
  </nav>
</template>

<script setup>
const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: $color-gray-900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__toggle {
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    // &:hover {
    //   background-color: rgba(255, 255, 255, 0.1);
    //   border-radius: 4px;
    // }

    .toggle-icon {
      position: relative;
      width: 20px;
      height: 2px;
      background-color: $color-white-300;

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        background-color: $color-white-300;
        transition: all 0.3s ease;
      }

      &::before {
        top: -6px;
      }

      &::after {
        bottom: -6px;
      }
    }
  }

  &__logo {
    color: $color-white-300;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__menu {
    display: flex;
    gap: 20px;
  }

  &__link {
    color: $color-white-300;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
