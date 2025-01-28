<template>
  <BaseTemplate
    :title="recipeStore.currentRecipe?.name"
    :show-back-button="true"
    @back="goBack"
  >
    <div class="image-wrapper">
      <img
        src="@assets/images/사과 바나나 스무디.png"
        alt="사과 바나나 스무디 이미지"
        loading="lazy"
        class="image-content"
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
  </BaseTemplate>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useRecipeStore } from '@stores/recipeStore';
import CardTemplate from '@components/molecules/CardTemplate.vue';
import CategoryCard from '@components/molecules/CategoryCard.vue';
import BaseTemplate from '@components/templates/BaseTemplate.vue';

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
$spacing-sm: 8px;
$spacing-md: 16px;
$border-radius-lg: 16px;
$border-radius-sm: 8px;

.recipe-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.image {
  &-wrapper {
    @include flex-center;

    position: relative;
    width: 100%;
    height: 30vh;
    margin: 0 auto $spacing-sm;
    border-radius: $border-radius-lg;
    overflow: hidden;
  }

  &-content {
    max-width: 100%;
    max-height: 100%;
    border-radius: $border-radius-lg;
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
