import {defineStore} from 'pinia';
import {ref} from 'vue';
import {emptyIngredient, Ingredient} from 'src/model/ingredient';

export const useIngredientPageStore = defineStore('ingredientPageStore', () => {

  const createIngredientDialog = ref(false);
  const showCreateIngredientDialog = () => {
    createIngredientDialog.value = true;
  }
  const closeCreateIngredientDialog = () => {
    createIngredientDialog.value = false;
  }

  const updateIngredient = ref<Ingredient>(emptyIngredient);
  const updateIngredientDialog = ref(false);
  const showUpdateIngredientDialog = (ingredient: Ingredient) => {
    console.log('showUpdateIngredientDialog', ingredient);
    updateIngredient.value = ingredient;
    updateIngredientDialog.value = true;
  }
  const closeUpdateIngredientDialog = () => {
    updateIngredientDialog.value = false;
  }

  return {
    createIngredientDialog,
    showCreateIngredientDialog,
    closeCreateIngredientDialog,
    updateIngredient,
    updateIngredientDialog,
    showUpdateIngredientDialog,
    closeUpdateIngredientDialog,
  };
});

