import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useSecretBasePageStore = defineStore('secretBasePageStore', () => {

  const createSecretBaseDialog = ref(false);
  const showCreateSecretBaseDialog = () => {
    createSecretBaseDialog.value = true;
  }

  const closeCreateSecretBaseDialog = () => {
    createSecretBaseDialog.value = false;
  }

  const updateSecretBaseDialog = ref(false);


  return {
    createSecretBaseDialog,
    showCreateSecretBaseDialog,
    closeCreateSecretBaseDialog,
    updateSecretBaseDialog,
  }
});
