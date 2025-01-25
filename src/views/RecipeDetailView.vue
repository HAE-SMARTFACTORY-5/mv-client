<template>
  <div class="recipe-detail">
    <!-- 헤더 -->
    <header class="recipe-detail__header">
      <button
        class="recipe-detail__back-btn"
        @click="goBack"
        aria-label="뒤로 가기"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h1 class="recipe-detail__heading">
        {{ recipeStore.currentRecipe?.name }}
      </h1>
    </header>

    <main class="recipe-detail__content">
      <div class="recipe-detail__image-wrapper">
        <img
          src="@assets/images/chicken_omlet.jpg"
          alt="닭가슴살 오믈렛 이미지"
          loading="lazy"
          class="recipe-detail__image"
        />
      </div>
      <!-- 요리 간략 정보 -->
      <CardTemplate>
        <div class="recipe-info">
          <span class="recipe-info__item"
            >⏰조리시간: {{ recipeStore.currentRecipe?.time }}</span
          >
          <span class="recipe-info__item"
            >난이도: {{ recipeStore.currentRecipe?.level }}</span
          >
        </div>
      </CardTemplate>

      <!-- 재료 섹션 -->
      <CardTemplate>
        <h2 class="section-title">재료</h2>
        <div class="ingredients">
          <CategoryCard
            v-for="ingredient in recipeStore.ingredients"
            :key="ingredient.id"
          >
            <div class="ingredients__item">
              <div class="ingredients__icon">{{ ingredient.icon }}</div>
              <span>{{ ingredient.name }}</span>
            </div>
          </CategoryCard>
        </div>
      </CardTemplate>

      <!-- 조리 순서 섹션 -->
      <CardTemplate>
        <h2 class="section-title">조리 순서</h2>
        <div class="cooking-steps">
          <CategoryCard
            v-for="step in recipeStore.currentRecipe?.content"
            :key="step"
          >
            <div class="cooking-steps__item">
              <span class="cooking-steps__text">{{ step }}</span>
            </div>
          </CategoryCard>
        </div>
      </CardTemplate>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useRecipeStore } from '@stores/recipeStore';
import CardTemplate from '@components/templates/CardTemplate.vue';
import CategoryCard from '@components/molecules/CategoryCard.vue';

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();

const goBack = () => {
  router.back();
};

onMounted(async () => {
  const recipeName = route.params.id;
  recipeStore.setCurrentRecipe(recipeName);
});
</script>

<style lang="scss" scoped>
// 변수 정의
$header-height: 60px;
$spacing-sm: 8px;
$spacing-md: 16px;
$border-radius-lg: 16px;
$border-radius-sm: 8px;

// 레시피 상세 페이지 기본 레이아웃
.recipe-detail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: $color-white-000;
  font-family: 'Noto Sans KR', sans-serif;

  // 헤더 섹션
  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: $header-height;
    padding: 0 $spacing-md;
    background-color: $color-blue-500;
    color: $color-white-000;
    z-index: 2;
  }

  &__back-btn {
    background: none;
    border: none;
    color: $color-white-000;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    margin-right: $spacing-md;
    transition: opacity 0.2s ease;
    font-family: 'Noto Sans KR', sans-serif;

    &:hover {
      opacity: 0.8;
    }
  }

  // 헤더 섹션 중 요리 이름
  &__heading {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }

  &__content {
    position: relative;
    margin-top: $header-height;
    padding: $spacing-md;
    background-color: rgba($color-white-000, 0.9);
    min-height: calc(100vh - #{$header-height});
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    height: 30vh;
    margin: 0 auto $spacing-md;
    border-radius: $border-radius-lg;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: $border-radius-lg;
    box-shadow: 0 4px 6px rgba($color-black-700, 0.1);
  }
}

// 레시피 정보 컴포넌트
.recipe-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: $color-gray-700;
  font-size: 0.95rem;

  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }
}

// 섹션 제목
.section-title {
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: $color-black-700;
}

// 재료 목록
.ingredients {
  display: flex;
  width: 100%;
  gap: $spacing-sm;
  padding: calc($spacing-sm / 2);
  overflow-x: auto;
  @include scrollbar;

  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-size: 30px;
    border-radius: $border-radius-sm;
  }
}

// 조리 순서
.cooking-steps {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: $spacing-sm;
  padding: calc($spacing-sm / 2);
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  @include scrollbar;

  &__item {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
  }

  &__text {
    color: $color-gray-900;
    line-height: 1.5;
  }
}
</style>
