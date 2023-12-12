import {defineStore} from 'pinia';
import {Receipt} from 'src/types/receipt';


export const useReceiptStore = defineStore({
  id: 'receiptStore',
  state: (): { receipts: Receipt[] } => ({
    receipts: []
  }),

  actions: {
    save(receipt: Receipt) {

      if (!receipt.hasMinimumComponents()) {
        throw new Error('최소 2개 이상의 원재료가 필요 합니다.');
      }

      if (this.exists(receipt)) {
        throw new Error('같은 이름의 레피시가 이미 존재 합니다.');
      }

      this.receipts.push(receipt);
    },

    delete(receipt: Receipt) {
      if (!this.exists(receipt)) {
        throw new Error('존재하지 않는 레시피 입니다.');
      }
      this.receipts = this.receipts.filter(it => it.name !== receipt.name);
    },

    exists(receipt: Receipt) {
      return this.receipts.some(it => it.name === receipt.name);
    },

    existsByName(name: string) {
      return this.receipts.some(it => it.name === name);
    },
  }
});
