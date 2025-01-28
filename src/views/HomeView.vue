<template>
  <div class="home-view">
    <div class="img-wrapper">
      <img
        src="@assets/images/bg_pink.png"
        alt="home-bg"
        class="img-wrapper__content"
      />
      <div class="weather">
        <div class="weather__temperature">
          <i class="weather__temperature-icon">☁️</i>
          <span class="weather__temperature-value">-1°</span>
          <span class="weather__temperature-range">2° / 1°</span>
        </div>
        <div class="weather__greeting">
          <p>흐린 날이에요.</p>
          <p>오늘도 좋은 하루 되세요!</p>
        </div>
      </div>
    </div>

    <div class="notification">
      <span class="mt-1">냉장고 점검일 (2025-02-05) 이 다가와요!</span>
    </div>

    <div class="home-view__content">
      <section class="section">
        <div class="section__header">
          <span>즐겨찾기</span>
          <span class="section__header-link">모두보기</span>
        </div>
        <category-card class="card card--favorite">
          <i class="fa-solid fa-plus card--favorite-icon"></i>
          <span class="card--favorite-text">즐겨찾기 추가하기</span>
        </category-card>
      </section>

      <section class="section">
        <div class="section__header">
          <span>제어목록</span>
          <span class="section__header-link">모두보기</span>
        </div>
        <div class="section__list">
          <category-card
            v-for="item in controlItems"
            :key="item.id"
            class="card"
          >
            <div class="card__header">
              <i :class="item.icon" class="card__header-icon"></i>
              <button v-if="item.button" class="card__header-button">
                {{ item.button }}
              </button>
              <span v-if="item.info" class="card__header-info">{{
                item.info
              }}</span>
            </div>
            <span class="card__name">{{ item.name }}</span>
          </category-card>
        </div>
      </section>

      <section class="section">
        <div class="section__header">
          <span>편의 서비스</span>
          <span class="section__header-link">모두보기</span>
        </div>
        <div class="section__list">
          <category-card
            v-for="item in serviceItems"
            :key="item.id"
            class="card"
          >
            <div class="card__header">
              <i :class="item.icon" class="card__header-icon"></i>
              <button v-if="item.button" class="card__header-button">
                {{ item.button }}
              </button>
              <span v-if="item.info" class="card__header-info">{{
                item.info
              }}</span>
            </div>
            <span class="card__name">{{ item.name }}</span>
          </category-card>
        </div>
      </section>
    </div>

    <nav class="bottom-nav">
      <button class="bottom-nav__item">
        <i class="fa-regular fa-user bottom-nav__item-icon"></i>
        <span class="bottom-nav__item-text">내 정보</span>
      </button>
      <button class="bottom-nav__item">
        <i class="fa-solid fa-file-invoice bottom-nav__item-icon"></i>
        <span class="bottom-nav__item-text">공지사항</span>
      </button>
      <button class="bottom-nav__item">
        <i class="fa-regular fa-bell bottom-nav__item-icon"></i>
        <span class="bottom-nav__item-text">알림</span>
      </button>
      <button class="bottom-nav__item">
        <i class="fa-regular fa-message bottom-nav__item-icon"></i>
        <span class="bottom-nav__item-text">문의</span>
      </button>
      <button class="bottom-nav__item">
        <i class="fa-solid fa-gear bottom-nav__item-icon"></i>
        <span class="bottom-nav__item-text">설정</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import CategoryCard from '@/components/molecules/CategoryCard.vue';

const controlItems = [
  {
    id: 1,
    name: '가스밸브',
    icon: 'fa-solid fa-fire-flame-simple',
    button: '끄기',
  },
  {
    id: 2,
    name: '냉장고',
    icon: 'fa-regular fa-snowflake',
    info: '-5°/1°',
  },
  {
    id: 3,
    name: '에어컨',
    icon: 'fa-solid fa-wind',
    button: '관리',
  },
  {
    id: 4,
    name: '조명',
    icon: 'fa-solid fa-lightbulb',
    info: '2/12',
  },
];

const serviceItems = [
  {
    id: 1,
    name: 'E/V 호출',
    icon: 'fa-solid fa-elevator',
    button: '호출',
  },
  {
    id: 2,
    name: '냉장고',
    icon: 'fa-regular fa-snowflake',
    info: '2/12',
  },
  {
    id: 3,
    name: '에어컨',
    icon: 'fa-solid fa-wind',
    info: '2/12',
  },
  {
    id: 4,
    name: '가스밸브',
    icon: 'fa-solid fa-fire-flame-simple',
    info: '2/12',
  },
];
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    background-color: $color-error-050;
    border-radius: 20px 20px 0 0;
    padding: 20px;
    top: calc(40% - 40px);
  }
}

.img-wrapper {
  width: 100%;
  height: 40%;
  position: relative;
  z-index: 1;

  &__content {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.notification {
  display: flex;
  position: absolute;
  width: 100%;
  height: 80px;
  background-color: rgba(67, 67, 67, 0.7);
  top: calc(35% - 40px);
  z-index: 2;
  justify-content: center;
  color: $color-white-200;
  font-size: 14px;
}

.weather {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  z-index: 2;

  &__temperature {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    &-icon {
      font-size: 30px;
      margin-bottom: 16px;
    }

    &-value {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    &-range {
      font-size: 16px;
    }
  }

  &__greeting {
    p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 5px;
    }
  }
}

.section {
  margin-bottom: 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    &-link {
      font-size: 12px;
      color: $color-gray-400;
      cursor: pointer;
    }
  }

  &__list {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.card {
  display: flex;
  flex-direction: column;
  min-width: 120px;
  height: 90px;
  padding: 15px;
  margin-top: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &--favorite {
    @include flex-center;
    flex-direction: column;

    &-icon {
      font-size: 24px;
      color: $color-gray-200;
      margin-bottom: 10px;
    }

    &-text {
      font-size: 10px;
      color: $color-gray-400;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    &-icon {
      font-size: 20px;
    }

    &-button {
      background-color: $color-white-000;
      border: rgba(0, 0, 0, 0.1) 1px solid;
      border-radius: 20%;
      width: 35px;
      height: 25px;
      font-size: 10px;
    }

    &-info {
      font-size: 12px;
    }
  }

  &__name {
    font-size: 12px;
  }
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: white;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &__item {
    @include flex-center;
    flex-direction: column;
    border: none;
    background: none;
    cursor: pointer;

    &-icon {
      font-size: 20px;
      margin-bottom: 4px;
    }

    &-text {
      font-size: 12px;
    }
  }
}
</style>
