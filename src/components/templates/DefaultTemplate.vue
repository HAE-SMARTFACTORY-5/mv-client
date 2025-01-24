<template>
  <div class="default-layout">
    <NavigationBar @toggle-sidebar="toggleSidebar" />
    <div class="content-wrapper">
      <Transition name="slide">
        <SideBar v-show="showSidebar" class="sidebar" />
      </Transition>
      <main class="main-content" :class="{ 'sidebar-expanded': showSidebar }">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavigationBar from '@components/organisms/NavigationBar.vue';
import SideBar from '@components/organisms/SideBar.vue';

const showSidebar = ref(true);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  padding-top: 60px;
  min-height: 100vh;
  background-color: $color-white-100;
  position: relative;
}

.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  z-index: 100;
  transition: transform 0.3s ease;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 0;
  transition: margin-left 0.3s ease;

  &.sidebar-expanded {
    margin-left: 140px;
  }
}

// 트랜지션 애니메이션
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
