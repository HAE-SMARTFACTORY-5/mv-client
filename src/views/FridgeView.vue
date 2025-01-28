<template>
  <BaseTemplate
    title="오늘의 요리"
    icon="fa-solid fa-utensils"
    :show-back-button="true"
    @back="goBack"
  >
    <div class="storage-tabs">
      <button
        class="storage-tabs__btn"
        :class="{ active: activeStorage === 'fridge' }"
        @click="activeStorage = 'fridge'"
      >
        냉장실
      </button>
      <button
        class="storage-tabs__btn"
        :class="{ active: activeStorage === 'freezer' }"
        @click="activeStorage = 'freezer'"
      >
        냉동실
      </button>
    </div>

    <!-- 냉장고 재료 섹션 -->
    <CardTemplate class="storage-section">
      <div class="ingredients">
        <CategoryCard
          v-for="(ingredient, index) in currentIngredients"
          :key="`ingredient-${index}`"
          class="ingredients__card"
        >
          <div class="category">
            <div class="category__icon">{{ ingredient.icon }}</div>
            <div class="category__content">
              <span class="category__title">{{ ingredient.name }}</span>
              <span class="category__subtitle">{{ ingredient.count }}</span>
            </div>
          </div>
        </CategoryCard>
      </div>
    </CardTemplate>

    <!-- 추천 레시피 섹션 -->
    <CardTemplate class="recipe-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fa-solid fa-book me-2"></i>
          추천 레시피
        </h2>
      </div>
      <hr class="section-divider" />
      <div class="recipes-list">
        <CategoryCard
          v-for="recipe in recipes"
          :key="`recipe-${recipe.id}`"
          class="recipes-list__card"
        >
          <div class="category">
            <div class="category__icon">{{ recipe.icon }}</div>
            <div class="category__content">
              <span class="category__title">{{ recipe.name }}</span>
              <span class="category__subtitle">
                {{ recipe.level }} {{ recipe.time }}
              </span>
            </div>
          </div>
          <button
            class="btn category__content__btn"
            @click="router.push(`/recipe/${recipe.name}`)"
          >
            레시피
          </button>
        </CategoryCard>
      </div>
    </CardTemplate>
  </BaseTemplate>
</template>

<script setup>
import BaseTemplate from '@components/templates/BaseTemplate.vue';
import CardTemplate from '@components/molecules/CardTemplate.vue';
import CategoryCard from '@components/molecules/CategoryCard.vue';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useRecipeStore } from '@stores/recipeStore';
import { useFridgeStore } from '@stores/fridgeStore';

const router = useRouter();
const recipeStore = useRecipeStore();
const fridgeStore = useFridgeStore();
const activeStorage = ref('fridge');

// goBack 함수 추가
const goBack = () => {
  router.back();
};

// 백엔드에서 냉동고 API 추가 후 삭제
const freezerIngredients = [
  { icon: '🍗', name: '닭가슴살', count: '2개' },
  { icon: '🐟', name: '고등어', count: '1마리' },
  { icon: '🥩', name: '돼지고기', count: '300g' },
];

// 반응형 정의
const currentIngredients = computed(() => {
  return activeStorage.value === 'fridge'
    ? fridgeStore.ingredients
    : freezerIngredients;
});

const recipes = computed(() => recipeStore.recipeList);

// 데이터 로드
onMounted(async () => {
  await fridgeStore.getFridgeIngredients();
  await recipeStore.getRecipes();
});
</script>

<style lang="scss" scoped>
// 저장소 탭
.storage-tabs {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;

  &__btn {
    padding: 8px 16px;
    border: 1px solid $color-gray-300;
    border-radius: 8px;
    background-color: $color-white-000;
    color: $color-gray-600;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background-color: $color-white-000;
      border-color: $color-black-700;
      color: $color-black-700;
    }

    &:hover {
      border-color: $color-black-700;
    }
  }
}

// 공통 스타일
.title {
  // margin-bottom: 1rem;
  font-weight: 700;
}

.section-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  &__link {
    cursor: pointer;
    color: $color-gray-700;
  }
}

// 카테고리 공통 스타일
.category {
  display: flex;
  align-items: center;
  gap: 12px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 35px;
    border-radius: 8px;
  }

  &__content {
    display: flex;
    flex-direction: column;

    &__btn {
      margin-right: 10px;
      padding: 4px 8px;
      background-color: $color-gray-200;
    }
  }

  &__title {
    font-weight: 600;
    color: $color-gray-900;
  }

  &__subtitle {
    font-size: 14px;
    color: $color-gray-600;
  }
}

// 재료 목록
.ingredients {
  display: flex;
  width: 100%;
  gap: 8px;
  padding: 4px;
  overflow-x: auto;
  @include scrollbar;

  &__card {
    flex-shrink: 0;
    background-color: $color-white-000;
  }
}

// 레시피 목록
.recipes-list {
  display: flex;
  flex-direction: column;

  min-height: 100px;
  width: 100%;
  gap: 8px;
  padding: 4px;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  @include scrollbar;

  &__card {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: $color-white-000;
  }
}

// 레시피 섹션
.recipe-section {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  height: 100%;
}

// 섹션 제목 스타일
.section-title {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 0 16px 8px;
  font-size: 20px;
  font-weight: 600;
  color: $color-gray-600;

  i {
    margin-top: 5px;
    color: $color-gray-700;
  }
}

// 섹션 구분선 스타일
.section-divider {
  width: 100%;
  border: 0;
  height: 0.5px;
  background-color: $color-gray-500;
  margin: 0 0 16px 0;
}
</style>
