import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useSecretBasePageStore = defineStore('secretBasePageStore', () => {
  const showSecretBaseCreateDialog = ref(false);
  const showSecretBaseUpdateDialog = ref(false);
  const updateSecretBase = ref(null);

  const showCreateDialog = () => {
    showSecretBaseCreateDialog.value = true;
  }
  const showUpdateDialog = (secretBase: any) => {
    updateSecretBase.value = secretBase;
    showSecretBaseUpdateDialog.value = true;
  }


  return {
    showSecretBaseCreateDialog,
    showSecretBaseUpdateDialog,
    showCreateDialog,
    showUpdateDialog,

    updateSecretBase,
  }
});
