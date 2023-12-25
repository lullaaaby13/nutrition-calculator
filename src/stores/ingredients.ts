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
        sugar: ingredient.sugar,
        protein: ingredient.protein,
        caffeine: ingredient.caffeine,
        fat: ingredient.fat,
        saturatedFat: ingredient.saturatedFat,
        fiber: ingredient.fiber
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
            sugar: ingredient.sugar,
            protein: ingredient.protein,
            caffeine: ingredient.caffeine,
            fat: ingredient.fat,
            saturatedFat: ingredient.saturatedFat,
            fiber: ingredient.fiber
        };
        console.log('update : ', ingredient)

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

    findById(id: number) {
      return this.ingredients.find(it => it.id === id);
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
        sugar: 0,
        protein: 0,
        caffeine: 0,
        fat: 0,
        saturatedFat: 0,
        fiber: 0,
        memo: '',
      };
    }
  }
});
