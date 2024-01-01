import {defineStore} from 'pinia';
import {ref} from 'vue';
import {ReceiptCategory, Receipt} from 'src/model/receipt';

export const useReceiptPageStore = defineStore('receiptPageStore', () => {


  const createReceiptDialog = ref(false);
  const showCreateReceiptDialog = () => {
    createReceiptDialog.value = true;
  }

  const closeCreateReceiptDialog = () => {
    createReceiptDialog.value = false;
  }

  const updateReceipt = ref<Receipt>({
    id: 0,
    memo: '',
    name: '',
    sellingPrice: 0,
    category: ReceiptCategory.coffee,
    components: [],
    createdAt: '',
    updatedAt: ''
  });
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
