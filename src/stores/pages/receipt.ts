import {defineStore} from 'pinia';
import {ref} from 'vue';
import {ReceiptCategory, ReceiptType} from 'src/types/receipt';

export const useReceiptPageStore = defineStore('receiptPageStore', () => {


  const createReceiptDialog = ref(false);
  const showCreateReceiptDialog = () => {
    createReceiptDialog.value = true;
  }

  const closeCreateReceiptDialog = () => {
    createReceiptDialog.value = false;
  }

  const updateReceipt = ref<ReceiptType>({
    category: ReceiptCategory.COFFEE, components: [], createdAt: '', id: 0, memo: '', name: '', sellingPrice: 0, updatedAt: ''
  });
  const updateReceiptDialog = ref(false);
  const showUpdateReceiptDialog = (secretBase: ReceiptType) => {
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
