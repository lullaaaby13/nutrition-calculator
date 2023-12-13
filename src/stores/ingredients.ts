import {defineStore} from 'pinia';
import IngredientAPI from 'src/api/ingredient';
import {Ingredient, IngredientCategory} from 'src/types/ingredient';

export const useIngredientStore = defineStore('ingredient', {
  state: (): { ingredients: Ingredient[] } => ({
    ingredients: [],
  }),
  actions: {

    async save(ingredient: any) {

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

      await IngredientAPI.save(request);

      await this.refresh();
    },

    async update(ingredient: any) {
        const request = {
            id: ingredient.id,
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

        await IngredientAPI.update(ingredient.id, request);

        await this.refresh();
    },

    async delete(id: number) {
      await IngredientAPI.delete(id);
      await this.refresh()
    },

    findByName(name: string) {
        return this.ingredients.find(it => it.name === name);
    },

    async refresh() {
      const ingredients: Ingredient[] = await IngredientAPI.list();
      this.ingredients = ingredients;
    },

    emptyIngredient() {
      return {
        category: IngredientCategory.FRESH,
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
