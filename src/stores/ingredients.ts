import {defineStore} from 'pinia';
import IngredientAPI from 'src/api/ingredient';
import {CreateIngredientRequest, Ingredient, UpdateIngredientRequest} from 'src/model/ingredient';
import {ref} from "vue";

export const useIngredientStore = defineStore('ingredients', () => {
  const ingredients = ref<Ingredient[]>([]);

  const fetchAll = async () => {
      const responses = await IngredientAPI.list();
      clear();
      responses.forEach(it => ingredients.value.push(it));
  };

  const save = async (request: CreateIngredientRequest) => {
    const ingredient = await IngredientAPI.save(request);
    ingredients.value.push(ingredient);
  };

  const update = async (id: number, request: UpdateIngredientRequest) => {
    const ingredient = await IngredientAPI.update(id, request);
    console.log('update', ingredient)
    replace(ingredient);
  };

  const remove = async (id: number) => {
    await IngredientAPI.delete(id);
    let index = ingredients.value.findIndex(it => it.id === id);
    if (index !== -1) {
      ingredients.value.splice(index, 1);
    }
  };

  const replace = (ingredient: Ingredient) => {
    const index = ingredients.value.findIndex(it => it.id === ingredient.id);
    if (index !== -1) {
      ingredients.value[index] = ingredient;
    }
  };

  const clear = () => {
    ingredients.value.splice(0, ingredients.value.length);
  }

  return {
    ingredients,
    fetchAll,
    save,
    update,
    remove,
    replace,
    clear,
  };
});
