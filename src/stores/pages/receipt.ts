import {defineStore} from 'pinia';
import {ref} from 'vue';
import {Receipt} from 'src/types/receipt';

export const useReceiptPageStore = defineStore('receiptPageStore', () => {


  const createReceiptDialog = ref(false);
  const showCreateReceiptDialog = () => {
    createReceiptDialog.value = true;
  }

  const closeCreateReceiptDialog = () => {
    createReceiptDialog.value = false;
  }

  const updateReceipt = ref<Receipt>(Receipt.empty());
  const updateReceiptDialog = ref(false);
  const showUpdateReceiptDialog = (secretBase: Receipt) => {
    updateReceipt.value = secretBase;
    updateReceiptDialog.value = true;

  }
  const closeUpdateReceiptDialog = () => {
    updateReceiptDialog.value = false;
  }

  return {
    createReceiptDialog,
    showCreateReceiptDialog,
    closeCreateReceiptDialog,
    updateReceipt,
    updateReceiptDialog,
    showUpdateReceiptDialog,
    closeUpdateReceiptDialog
  }
});
