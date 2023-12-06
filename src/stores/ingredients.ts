import {defineStore} from 'pinia';
import Ingredient, {IngredientCategory, IngredientMock} from 'src/types/ingredient';

export const useIngredientStore = defineStore('ingredient', {
  state: (): { ingredients: Ingredient[] } => ({
    ingredients: [
      // IngredientMock,WATER,
      IngredientMock.ESPRESSO,
      IngredientMock.MILK,
      IngredientMock.CONDENSED_MILK,
      IngredientMock.WATER,
    ],
  }),
  actions: {
    async save(ingredient: Ingredient) {
      if (this.existsByName(ingredient.name)) {
        throw new Error('같은 이름의 성분이 이미 존재 합니다.');
      }

      const request = {
        name: ingredient.name,
        category: ingredient.category.name,
        memo: ingredient.memo,
        calories: ingredient.calories,
        unitPrice: ingredient.unitPrice,
        carbohydrates: ingredient.carbohydrates,
        sugars: ingredient.sugars,
        protein: ingredient.protein,
        caffeine: ingredient.caffeine,
        fat: ingredient.fat,
        saturatedFat: ingredient.saturatedFat,
      };
      await window.ingredients.save(JSON.stringify(request));
      // TODO refresh로 로직 변경
      await this.refresh();
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

    async refresh() {
      const ingredients = await window.ingredients.list();
      console.log(ingredients);
      this.ingredients = ingredients.map(it => JSON.parse(it));

      // this.ingredients = ingredients.map(it => ({
      //   name: it.name,
      //   category: IngredientCategory.FRESH,
      //   memo: it.memo,
      //   calories: it.calories,
      //   unitPrice: it.unitPrice,
      //   carbohydrates: it.carbohydrates,
      //   sugars: it.sugars,
      //   protein: it.protein,
      //   caffeine: it.caffeine,
      //   fat: it.fat,
      //   saturatedFat: it.saturatedFat,
      // }))
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
