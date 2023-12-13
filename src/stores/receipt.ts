import {defineStore} from 'pinia';
import { ReceiptType} from 'src/types/receipt';
import ReceiptAPI from 'src/api/receipts';


export const useReceiptStore = defineStore({
  id: 'receiptStore',
  state: (): { receipts: ReceiptType[] } => ({
    receipts: []
  }),

  actions: {
    async save(receipt: ReceiptType) {

      const request = {
        name: receipt.name,
        memo: receipt.memo,
        category: receipt.category,
        components: receipt.components.map(component => ({
          amount: component.amount,
          sourceType: component.sourceType,
          sourceId: component.source.id
        })),
        sellingPrice: receipt.sellingPrice,
      };

      await ReceiptAPI.save(request);
      await this.refresh();
    },

    async delete(id: number) {
      await ReceiptAPI.delete(id);
      await this.refresh();
    },

    async update(id: number, request: any) {
        await ReceiptAPI.update(id, request);
        await this.refresh();
    },

    async refresh() {
      const receiptTypes = await ReceiptAPI.list();
      console.log('refresh:' , receiptTypes)
      this.receipts = receiptTypes;
    },
  }
});
