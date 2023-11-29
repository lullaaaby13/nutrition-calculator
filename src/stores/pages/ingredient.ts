import {defineStore} from 'pinia';
import {reactive, ref} from 'vue';
import Ingredient from 'src/types/ingredient';

export const useIngredientPageStore = defineStore('ingredientPageStore', () => {

  const createIngredientDialog2 = ref(false);
  const showCreateIngredientDialog = () => {
    console.log('check')
    createIngredientDialog2.value = true;
    console.log(createIngredientDialog2.value);
  }

  const updateIngredient = ref<Ingredient | null>(null);
  const updateIngredientDialog = ref(false);
  const showUpdateIngredientDialog = (ingredient: Ingredient) => {
    updateIngredient.value = ingredient;
    updateIngredientDialog.value = true;
  }

  return {
    updateIngredient,
    updateIngredientDialog,
    showUpdateIngredientDialog,
    createIngredientDialog2,
    showCreateIngredientDialog,
  };
});
