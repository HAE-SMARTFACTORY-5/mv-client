import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules, // Prettier 플러그인 추천 규칙 추가
    },
  },
  pluginJs.configs.recommended, // JavaScript 추천 규칙
  ...pluginVue.configs['flat/essential'], // Vue.js 추천 규칙
  prettier, // Prettier 설정으로 ESLint 규칙 비활성화
];
