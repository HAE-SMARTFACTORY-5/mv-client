<template>
  <div class="recipe-detail">
    <div class="recipe-detail-header">
      <div class="recipe-detail-back" @click="goBack">
        <span>←</span>
      </div>
      <span class="mx-2">닭가슴살 오믈렛</span>
    </div>

    <div class="recipe-detail-content">
      <CardTemplate>
        <div class="d-flex align-items-center justify-content-between w-100">
          <span>⏰조리시간: 20분 </span>
          <span> 난이도: 쉬움</span>
        </div>
      </CardTemplate>

      <CardTemplate>
        <h3 class="mb-3 fw-bold">재료</h3>
        <div class="ingredient">
          <CategoryCard v-for="(ingredient, index) in ingredients" :key="index">
            <div class="category-layout">
              <div class="category-layout-icon">{{ ingredient.icon }}</div>
              <span class="category-layout-text--title">{{
                ingredient.name
              }}</span>
            </div>
          </CategoryCard>
        </div>
      </CardTemplate>

      <CardTemplate>
        <div class="recipe-card-header">
          <h3 class="mb-3 fw-bold">조리 순서</h3>
          <!-- <span class="recipe-card-header-link">전체보기>></span> -->
        </div>
        <div class="recipe">
          <CategoryCard
            v-for="(step, index) in cookingSteps"
            :key="index"
            class="recipe-category-card"
          >
            <div>
              <div class="category-layout">{{ index + 1 }}. {{ step }}</div>
            </div>
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

const goBack = () => {
  router.back();
};

const ingredients = [
  { icon: '🥚', name: '계란' },
  { icon: '🍗', name: '닭가슴살' },
  { icon: '🧅', name: '양파' },
  { icon: '🧂', name: '소금' },
  { icon: '🌶️', name: '후추' },
];

const cookingSteps = [
  '닭가슴살을 잘게 다집니다.',
  '달걀을 다져 봅니다.',
  '계란을 풀어 닭가슴살과 양파와 섞습니다.',
  '팬에 기름을 두르고 오믈렛을 만듭니다.',
];
</script>

<style lang="scss" scoped>
.recipe-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: $color-white-000;

  &-header {
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

    h2 {
      margin: 0;
      margin-left: 16px;
    }
  }

  &-back {
    cursor: pointer;
    font-size: 24px;
  }

  &-content {
    padding: 16px;
  }
}

.recipe-category-card {
  min-width: 100%;
  background-color: $color-white-000;
  flex-direction: row;
  align-items: center;
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

.category-layout {
  @include category-layout;
}

.recipe-info {
  &-meta {
    color: $color-gray-500;
    font-size: 0.9em;
  }
}

.recipe-section {
  margin-bottom: 24px;

  h4 {
    color: $color-blue-700;
    margin-bottom: 12px;
  }
}

.ingredient-list {
  list-style: none;
  padding: 0;

  li {
    padding: 8px 0;
    border-bottom: 1px solid $color-gray-200;
  }
}

.cooking-steps {
  padding-left: 20px;

  li {
    margin-bottom: 12px;
    line-height: 1.5;
  }
}
</style>
