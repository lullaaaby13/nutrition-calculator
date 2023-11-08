import {defineStore} from 'pinia';
import {IngredientCategory} from "@/enum/ingredientCategory";

export const useIngredientStore = defineStore('ingredient', {
  state: () => ({
    ingredients: [
      {
        name: '우유',
        category: IngredientCategory.FRESH,
        calories: 180,
        carbohydrates: 100,
        sugars: 100,
        protein: 100,
        fat: 100,
        saturatedFat: 100,
        caffeine: 100,
        unitPrice: 100,
        memo: '우히히',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '연유',
        category: IngredientCategory.FRESH,
        calories: 260,
        carbohydrates: 150,
        sugars: 105,
        protein: 120,
        fat: 130,
        saturatedFat: 105,
        caffeine: 103,
        unitPrice: 101,
        memo: '연유라떼 맛이쪙',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '밀가루',
        category: IngredientCategory.FLOUR,
        calories: 180,
        carbohydrates: 100,
        sugars: 100,
        protein: 100,
        fat: 100,
        saturatedFat: 100,
        caffeine: 100,
        unitPrice: 100,
        memo: '우히히',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
  }),
  actions: {
    save(ingredient) {
      if (this.exists(ingredient)) {
        throw new Error('같은 이름의 성분이 이미 존재 합니다.');
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
    }
  }
});
