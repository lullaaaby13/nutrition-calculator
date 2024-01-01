import {api} from 'boot/axios';
import {Receipt, UpdateReceiptRequest} from 'src/model/receipt';

export default class ReceiptAPI {
  static async list(): Promise<Receipt[]> {
    const {data} = await api.get('/receipts')
    return data;
  }

  static async save(request: any): Promise<Receipt> {
    const { data } = await api.post('/receipts', request);
    return  data;
  }

  static async delete(id: number): Promise<void> {
    const { data } = await api.delete(`/receipts/${id}`);
    return data;
  }

  static async update(id: number, request: UpdateReceiptRequest): Promise<Receipt> {
    const { data } = await api.put(`/receipts/${id}`, request);
    return data;
  }
}
