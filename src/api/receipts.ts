import {api} from 'boot/axios';
import {ReceiptType} from 'src/types/receipt';

export default class ReceiptAPI {
  static async list(): Promise<ReceiptType[]> {
    const {data} = await api.get('/receipts')
    console.log('resposne: ', data)
    return data;
  }

  static async save(request: any) {
    const { data } = await api.post('/receipts', request);
    return  data;
  }

  static async delete(id: number) {
    const { data } = await api.delete(`/receipts/${id}`);
    return data;
  }

  static async update(id: number, request: any) {
    const { data } = await api.put(`/receipts/${id}`, request);
    return data;
  }
}
