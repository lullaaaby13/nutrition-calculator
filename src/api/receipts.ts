import {api} from 'boot/axios';
import {Receipt, UpdateReceiptRequest} from 'src/model/receipt';

export default class ReceiptAPI {
  static async list(): Promise<Receipt[]> {
    const {data} = await api.get('api/receipts')
    return data;
  }

  static async save(request: any): Promise<Receipt> {
    const { data } = await api.post('api/receipts', request);
    return  data;
  }

  static async delete(id: number): Promise<void> {
    const { data } = await api.delete(`api/receipts/${id}`);
    return data;
  }

  static async update(id: number, request: UpdateReceiptRequest): Promise<Receipt> {
    const { data } = await api.put(`api/receipts/${id}`, request);
    return data;
  }
}
