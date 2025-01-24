<template>
  <aside class="sidebar">
    <ul class="sidebar__menu">
      <li class="sidebar__item">메뉴 1</li>
      <li class="sidebar__item">메뉴 2</li>
      <li class="sidebar__item">메뉴 3</li>
    </ul>
  </aside>
</template>

<script setup></script>

<style lang="scss" scoped>
.sidebar {
  width: 140px;
  height: 100%;
  background-color: $color-white-300;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  &__menu {
    list-style: none;
    padding: 0;
    margin-top: 10px;
    width: 100%;
  }

  &__item {
    width: 85%;
    color: $color-black-700;
    padding: 12px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
