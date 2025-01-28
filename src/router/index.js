import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@views/HomeView.vue'),
  },
  {
    path: '/fridge',
    name: 'Fridge',
    component: () => import('@views/FridgeView.vue'),
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: () => import('@views/RecipeDetailView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
