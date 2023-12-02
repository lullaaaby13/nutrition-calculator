import {defineStore} from 'pinia';
import {Receipt, ReceiptMock} from 'src/types/receipt';


export const useReceiptStore = defineStore({
  id: 'receiptStore',
  state: (): { receipts: Receipt[] } => ({
    receipts: [
      ReceiptMock.AMERICANO
    ]
  }),

  actions: {
    save(secretBase: Receipt) {

      if (this.exists(secretBase)) {
        throw new Error('같은 이름의 레피시가 이미 존재 합니다.');
      }

      this.receipts.push(secretBase);
    },

    delete(secretBase: Receipt) {
      if (!this.exists(secretBase)) {
        throw new Error('존재하지 않는 레시피 입니다.');
      }
      this.receipts = this.receipts.filter(it => it.name !== secretBase.name);
    },

    exists(secretBase: Receipt) {
      return this.receipts.some(it => it.name === secretBase.name);
    },

    existsByName(name: string) {
      return this.receipts.some(it => it.name === name);
    },
  }
});
