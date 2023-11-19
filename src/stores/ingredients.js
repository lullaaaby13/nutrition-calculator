import {defineStore} from 'pinia';
import {IngredientCategory} from "@/enum/ingredientCategory";

export const useIngredientStore = defineStore('ingredient', {
  state: () => ({
    ingredients: [
      {
        name: '우유',
        category: IngredientCategory.FRESH,
        calories: 43,
        unitPrice: 260,
        carbohydrates: 100,
        sugars: 100,
        protein: 8,
        caffeine: 0,
        fat: 14,
        saturatedFat: 10,
        memo: '우유라떼 맛이쪙',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '연유',
        category: IngredientCategory.FRESH,
        calories: 54,
        unitPrice: 575,
        carbohydrates: 10,
        sugars: 6,
        protein: 15,
        caffeine: 3,
        fat: 15,
        saturatedFat: 10,
        memo: '연유라떼 맛이쪙',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '밀가루',
        category: IngredientCategory.FLOUR,
        calories: 180,
        unitPrice: 100,
        carbohydrates: 100,
        sugars: 100,
        protein: 100,
        caffeine: 100,
        fat: 100,
        saturatedFat: 100,
        memo: '우히히',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
  }),
  actions: {
    save(ingredient) {
      if (!ingredient.name) {
        alert('이름을 입력해 주세요');
        throw new Error('이름을 입력해 주세요.');
      }
      if (this.existsByName(ingredient.name)) {
        throw new Error('같은 이름의 성분이 이미 존재 합니다.');
      }
      if (!ingredient.category) {
        throw new Error('카테고리를 선택해 주세요.');
      }

      ingredient.createdAt = new Date();
      ingredient.updatedAt = new Date();
      this.ingredients.push(ingredient);
    },
    delete(ingredient) {
      let index = this.ingredients.indexOf(ingredient);
      this.ingredients.splice(index, 1);
    },
    exists(ingredient) {
      return this.ingredients.some(it => it.name === ingredient.name);
    },
    existsByName(name) {
      return this.ingredients.some(it => it.name === name);
    },
    emptyIngredient() {
      return {
        category: null,
        name: '',
        calories: 0,
        unitPrice: 0,
        carbohydrates: 0,
        sugars: 0,
        protein: 0,
        caffeine: 0,
        fat: 0,
        saturatedFat: 0,
        memo: '',
      };
    }
  }
});
