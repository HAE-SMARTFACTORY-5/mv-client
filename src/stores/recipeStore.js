import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getRecipeIcon, getIngredientIcon } from '@/utils/iconMaps';
import axios from 'axios';
import { API_BASE_URL } from '@config';

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref([]);
  const currentRecipe = ref(null);
  const isInitialized = ref(false);

  // 예시 데이터 (개발용)
  const sampleRecipes = [
    {
      name: '[DEV] 계란말이',
      content: [
        '1. 계란을 그릇에 풀어 우유와 함께 섞는다.',
        '2. 당근을 잘게 다진다.',
        '3. 다진 당근을 계란물에 넣고 섞는다.',
        '4. 그릇에 계란물을 넣고, 팬에서 10-15분간 익다.',
      ],
      level: '쉬움',
      time: '20분',
      ingredient: ['계란', '우유', '당근'],
    },
    {
      name: '당근 계란말이',
      content: [
        '1. 당근을 썬다.',
        '2. 계란을 풀어 소금으로 간을 한다.',
        '3. 채썬 당근를 계란에 넣고 섞는다.',
        '4. 팬에 기름을 두르고, 계란물을 부어 익힌다.',
        '5. 완전히 익기 전에 한쪽으로 말아가며 계란말이를 만든다.',
      ],
      level: '보통',
      time: '15분',
      ingredient: ['계란', '닭고기', '소금'],
    },
    {
      name: '닭가슴살 샐러드',
      content: [
        '1. 닭가슴살을 삶아서 식힌 후 손으로 찢어준다.',
        '2. 양상추와 채소들을 씻어서 먹기 좋은 크기로 썬다.',
        '3. 방울토마토는 2등분하고, 오이는 얇게 슬라이스한다.',
        '4. 준비된 채소들과 닭가슴살을 그릇에 담는다.',
        '5. 올리브오일과 발사믹 식초를 넣고 섞어 완성한다.',
      ],
      level: '쉬움',
      time: '20분',
      ingredient: [
        '닭가슴살',
        '양상추',
        '방울토마토',
        '오이',
        '올리브오일',
        '발사믹식초',
      ],
    },
    {
      name: '닭가슴살 오믈렛',
      content: [
        '1. 닭가슴살을 잘게 다진다.',
        '2. 계란을 그릇에 풀어 소금, 후추로 간을 한다.',
        '3. 팬에 기름을 두르고 다진 닭가슴살을 볶는다.',
        '4. 닭가슴살이 익으면 계란물을 부어 가장자리가 익을 때까지 기다린다.',
        '5. 반으로 접어 접시에 담아 완성한다.',
      ],
      level: '보통',
      time: '15분',
      ingredient: ['닭가슴살', '계란', '소금', '후추', '식용유'],
    },
  ];

  const recipeList = computed(() => {
    // recipes.value가 배열이 아닌 경우 빈 배열로 초기화
    if (!Array.isArray(recipes.value)) {
      recipes.value = [];
    }

    // 데이터가 없을 경우 예시 데이터 사용
    const sourceData = recipes.value.length > 0 ? recipes.value : sampleRecipes;

    return sourceData.map((recipe, index) => ({
      ...recipe,
      id: index + 1,
      icon: getRecipeIcon(recipe.name),
    }));
  });

  const ingredients = computed(() => {
    if (!currentRecipe.value) return [];

    return currentRecipe.value.ingredient.map((item, index) => ({
      id: index + 1,
      icon: getIngredientIcon(item),
      name: item,
    }));
  });

  const getRecipes = async () => {
    // 이미 초기화되었다면 API 호출하지 않음
    if (isInitialized.value) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/recipes`);
      recipes.value = Array.isArray(response.data) ? response.data : [];
      isInitialized.value = true;
      console.log(recipes.value);
    } catch (error) {
      console.error('레시피 목록을 가져오는데 실패했습니다:', error);
      recipes.value = [];
    }
  };

  const setCurrentRecipe = (recipeName) => {
    currentRecipe.value = recipeList.value.find(
      (recipe) => recipe.name === recipeName,
    );
  };

  return {
    recipeList,
    currentRecipe,
    ingredients,
    getRecipes,
    setCurrentRecipe,
  };
});
