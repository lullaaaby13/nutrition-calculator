import {defineStore} from 'pinia';
import Ingredient, {IngredientCategory, IngredientMock} from 'src/types/ingredient';

export const useIngredientStore = defineStore('ingredient', {
  state: (): { ingredients: Ingredient[] } => ({
    ingredients: [
      IngredientMock.MILK,
      IngredientMock.CONDENSED_MILK,
      // new Ingredient('우유', IngredientCategory.FRESH),
      // new Ingredient('연유', IngredientCategory.FRESH),
      // new Ingredient('밀가루', IngredientCategory.FLOUR),
    ],
  }),
  actions: {
    save(ingredient: Ingredient) {
      if (this.existsByName(ingredient.name)) {
        throw new Error('같은 이름의 성분이 이미 존재 합니다.');
      }
      this.ingredients.push(ingredient);
    },

    delete(ingredient: Ingredient) {
      const index = this.ingredients.indexOf(ingredient);
      this.ingredients.splice(index, 1);
    },

    exists(ingredient: Ingredient) {
      return this.ingredients.some(it => it.name === ingredient.name);
    },

    existsByName(name: string) {
      return this.ingredients.some(it => it.name === name);
    },

    findByName(name: string) {
        return this.ingredients.find(it => it.name === name);
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
