import {defineStore} from 'pinia';
import {CreateReceiptRequest, Receipt, UpdateReceiptRequest} from 'src/model/receipt';
import ReceiptAPI from 'src/api/receipts';
import {ref} from "vue";


export const useReceiptStore = defineStore('receipts', () => {

  const receipts = ref<Receipt[]>([]);

  const save = async (request: CreateReceiptRequest) => {
    const receipt = await ReceiptAPI.save(request);
    receipts.value.push(receipt);
  };

  const remove = async (id: number) => {
    await ReceiptAPI.delete(id);
    let index = receipts.value.findIndex(it => it.id === id);
    if (index !== -1) {
      receipts.value.splice(index, 1);
    }
  };

  const update = async (id: number, request: UpdateReceiptRequest) => {
    const receipt = await ReceiptAPI.update(id, request);
    replace(receipt);
  };

  const replace = (receipt: Receipt) => {
    const index = receipts.value.findIndex(it => it.id === receipt.id);
    if (index !== -1) {
      receipts.value[index] = receipt;
    }
  }

  const fetchAll = async () => {
    const responses = await ReceiptAPI.list();
    clear();
    responses.forEach(it => receipts.value.push(it));
  };

  const clear = () => {
    receipts.value.splice(0, receipts.value.length);
  }

  return {
    receipts,
    save,
    remove,
    update,
    refresh: fetchAll,
  }

});
