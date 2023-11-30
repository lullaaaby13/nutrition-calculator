import {defineStore} from 'pinia';
import {ref} from 'vue';
import Ingredient from 'src/types/ingredient';

export const useIngredientPageStore = defineStore('ingredientPageStore', () => {

  const createIngredientDialog = ref(false);
  const showCreateIngredientDialog = () => {
    createIngredientDialog.value = true;
  }

  const updateIngredient = ref<Ingredient | any>({});
  const updateIngredientDialog = ref(false);
  const showUpdateIngredientDialog = (ingredient: Ingredient) => {
    updateIngredient.value = ingredient;
    updateIngredientDialog.value = true;
  }
  const closeUpdateIngredientDialog = () => {
    updateIngredientDialog.value = false;
  }

  return {
    updateIngredient,
    updateIngredientDialog,
    showUpdateIngredientDialog,
    createIngredientDialog,
    showCreateIngredientDialog,
    closeUpdateIngredientDialog,
  };
});
