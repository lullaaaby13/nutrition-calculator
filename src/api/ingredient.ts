import {api} from 'boot/axios';
import {CreateIngredientRequest, Ingredient} from 'src/types/ingredient';

export default class IngredientAPI {
  static async list(): Promise<Ingredient[]> {
     const { data } = await api.get('ingredients');
     return data;
  }

  static async save(request: CreateIngredientRequest): Promise<Ingredient> {
      const { data } = await api.post('ingredients', request);
      return data;
  }

  static async update(id: number, ingredient: any) {
        const { data } = await api.put(`ingredients/${id}`, ingredient);
        return data;
  }
  static async delete(id: number) {
        const { data } = await api.delete(`ingredients/${id}`);
        return data;
  }

}
