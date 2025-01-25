<template>
  <div class="base-layout">
    <!-- 헤더 -->
    <header class="base-layout__header">
      <i class="fa-solid fa-utensils me-2"></i>
      오늘의 요리
    </header>

    <!-- 메인 컨테이너 -->
    <main class="base-layout__container">
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
            <i class="fa-solid fa-star me-2"></i>
            추천 레시피
          </h2>
        </div>
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
              class="btn btn-primary px-2"
              @click="router.push(`/recipe/${recipe.name}`)"
            >
              레시피
            </button>
          </CategoryCard>
        </div>
      </CardTemplate>
    </main>
  </div>
</template>

<script setup>
import CardTemplate from '@components/templates/CardTemplate.vue';
import CategoryCard from '@components/molecules/CategoryCard.vue';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useRecipeStore } from '@stores/recipeStore';
import { useFridgeStore } from '@stores/fridgeStore';

const router = useRouter();
const recipeStore = useRecipeStore();
const fridgeStore = useFridgeStore();
const activeStorage = ref('fridge');

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
// 기본 레이아웃
.base-layout {
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
    background-color: $color-blue-500;
    color: $color-white-000;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Noto Sans KR';
  }

  &__container {
    @include flex-basic;
    flex-direction: column;
    padding: 16px;
    height: calc(100vh - 60px);
  }
}

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
      background-color: $color-blue-500;
      border-color: $color-blue-500;
      color: $color-white-000;
    }

    &:hover {
      border-color: $color-blue-500;
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
    color: $color-blue-700;
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
  flex: 1;
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
    color: $color-blue-500;
  }
}
</style>
