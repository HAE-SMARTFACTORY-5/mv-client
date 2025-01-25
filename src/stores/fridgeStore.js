import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getIngredientIcon } from '@/utils/iconMaps';
import axios from 'axios';
import { API_BASE_URL } from '@config';

export const useFridgeStore = defineStore('fridge', () => {
  const fridgeIngredients = ref([]);

  // 개발용 예시 데이터
  const sampleIngredients = [
    {
      ingredientId: 1,
      name: '사과',
    },
    {
      ingredientId: 2,
      name: '바나나',
    },
    {
      ingredientId: 3,
      name: '당근',
    },
    {
      ingredientId: 4,
      name: '양파',
    },
  ];

  const ingredients = computed(() => {
    // 데이터가 없을 경우 예시 데이터 사용
    const sourceData = fridgeIngredients.value.length
      ? fridgeIngredients.value
      : sampleIngredients;

    return sourceData.map((ingredient) => ({
      id: ingredient.ingredientId,
      name: ingredient.name,
      icon: getIngredientIcon(ingredient.name),
      count: '1개', // 기본값 설정
    }));
  });

  const getFridgeIngredients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ingredients`);
      fridgeIngredients.value = response.data;
      //   console.log(fridgeIngredients.value);
    } catch (error) {
      console.error('재료 목록을 가져오는데 실패했습니다:', error);
      fridgeIngredients.value = [];
    }
  };

  return {
    ingredients,
    getFridgeIngredients,
  };
});
