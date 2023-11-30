import {defineStore} from 'pinia';
import {ref} from 'vue';
import {SecretBase} from 'src/types/secret-base';

export const useSecretBasePageStore = defineStore('secretBasePageStore', () => {

  const createSecretBaseDialog = ref(false);
  const showCreateSecretBaseDialog = () => {
    createSecretBaseDialog.value = true;
  }

  const closeCreateSecretBaseDialog = () => {
    createSecretBaseDialog.value = false;
  }

  const updateSecretBase = ref<SecretBase | any>({});
  const updateSecretBaseDialog = ref(false);
  const showUpdateSecretBaseDialog = (secretBase: SecretBase) => {
    updateSecretBase.value = secretBase;
    updateSecretBaseDialog.value = true;
  }
  const closeUpdateSecretBaseDialog = () => {
    updateSecretBaseDialog.value = false;
  }

  return {
    createSecretBaseDialog,
    showCreateSecretBaseDialog,
    closeCreateSecretBaseDialog,
    updateSecretBase,
    updateSecretBaseDialog,
    showUpdateSecretBaseDialog,
    closeUpdateSecretBaseDialog
  }
});

