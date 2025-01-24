<template>
  <div class="base-layout">
    <div class="base-layout-top">🥄오늘의 요리</div>
    <div class="base-layout-container">
      <CardTemplate>
        <h3 class="mb-3 fw-bold">냉장고 재료</h3>
        <div class="ingredient">
          <CategoryCard v-for="(ingredient, index) in ingredients" :key="index">
            <div class="category-layout">
              <div class="category-layout-icon">{{ ingredient.icon }}</div>
              <div class="category-layout-text">
                <span class="category-layout-text--title">{{
                  ingredient.name
                }}</span>
                <span class="category-layout-text--count">{{
                  ingredient.count
                }}</span>
              </div>
            </div>
          </CategoryCard>
        </div>
      </CardTemplate>

      <CardTemplate>
        <div class="recipe-card-header">
          <h3 class="mb-3 fw-bold">추천 레시피</h3>
          <!-- <span class="recipe-card-header-link">전체보기>></span> -->
        </div>
        <div class="recipe">
          <CategoryCard
            v-for="(recipe, index) in recipes"
            :key="index"
            class="recipe-category-card"
          >
            <div>
              <div class="category-layout">
                <div class="category-layout-icon">{{ recipe.icon }}</div>
                <div class="category-layout-text">
                  <span class="category-layout-text--title">{{
                    recipe.name
                  }}</span>
                  <span class="category-layout-text--count"
                    >{{ recipe.difficulty }} {{ recipe.time }}</span
                  >
                </div>
              </div>
            </div>
            <button
              class="category-layout-button btn btn-primary px-3"
              @click="router.push(`/recipe/${recipe.id}`)"
            >
              레시피
            </button>
          </CategoryCard>
        </div>
      </CardTemplate>
    </div>
  </div>
</template>

<script setup>
import CardTemplate from '@components/templates/CardTemplate.vue';
import CategoryCard from '@components/molecules/CategoryCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const ingredients = [
  { icon: '🥚', name: '계란', count: '3개' },
  { icon: '🍗', name: '닭가슴살', count: '2개' },
  { icon: '🥬', name: '양상추', count: '1개' },
  { icon: '🥚', name: '계란', count: '3개' },
  { icon: '🍗', name: '닭가슴살', count: '2개' },
  { icon: '🥬', name: '양상추', count: '1개' },
];

const recipes = [
  {
    id: 1,
    icon: '🍳',
    name: '닭가슴살 오믈렛',
    difficulty: '쉬움',
    time: '20분',
  },
  {
    id: 2,
    icon: '🥗',
    name: '닭가슴살 샐러드',
    difficulty: '쉬움',
    time: '20분',
  },
  {
    id: 3,
    icon: '🥗',
    name: '닭가슴살 샐러드',
    difficulty: '쉬움',
    time: '20분',
  },
  {
    id: 4,
    icon: '🍳',
    name: '닭가슴살 오믈렛',
    difficulty: '쉬움',
    time: '20분',
  },
  {
    id: 5,
    icon: '🥗',
    name: '닭가슴살 샐러드',
    difficulty: '쉬움',
    time: '20분',
  },
  {
    id: 6,
    icon: '🥗',
    name: '닭가슴살 샐러드',
    difficulty: '쉬움',
    time: '20분',
  },
];
</script>

<style lang="scss" scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: $color-white-000;

  &-top {
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: $color-white-000;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Noto Sans KR';
    width: 100%;
    height: 60px;
    background-color: $color-blue-500;
  }

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 16px;
  }
}

.recipe-card-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  &-link {
    cursor: pointer;
    color: $color-blue-700;
  }
}

.recipe-category-card {
  min-width: 100%;
  background-color: $color-white-000;
  flex-direction: row;
}

.ingredient {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: auto;
  width: 100%;
  gap: 8px;
  padding: 4px;
  @include scrollbar;
}

.recipe {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px;
  width: 100%;
  gap: 8px;
  padding: 4px;
  @include scrollbar;
}

.category-layout {
  @include category-layout;

  &-button {
    margin-left: auto;
  }
}
</style>
