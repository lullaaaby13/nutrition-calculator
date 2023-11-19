import {defineStore} from 'pinia';
import {IngredientCategory} from "@/enum/ingredientCategory";

export const useSecretBaseStore = defineStore({
  id: 'secret-base',
  state: () => ({
    secretBases: [
      {
        name: '비법소스',
        ingredients: [
          {
            name: '우유',
            category: IngredientCategory.FRESH,
            calories: 180,
            unitPrice: 100,
            carbohydrates: 100,
            sugars: 100,
            protein: 100,
            caffeine: 100,
            fat: 100,
            saturatedFat: 100,
            memo: '우히히',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: '연유',
            category: IngredientCategory.FRESH,
            calories: 180,
            unitPrice: 100,
            carbohydrates: 100,
            sugars: 100,
            protein: 100,
            caffeine: 100,
            fat: 100,
            saturatedFat: 100,
            memo: '연유라떼 맛이쪙',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        memo: '비법소스는 비밀이지',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  }),
  actions: {
    save(secretBase) {
      if (this.exists(secretBase)) {
        throw new Error('같은 이름의 비법소스가 이미 존재 합니다.');
      }
      secretBase.createdAt = new Date();
      secretBase.updatedAt = new Date();
      this.secretBases.push(secretBase);
    },
    delete(secretBase) {
      if (!this.exists(secretBase)) {
        throw new Error('존재하지 않는 비법소스 입니다.');
      }
      this.secretBases = this.secretBases.filter((ingredient) => ingredient.name !== secretBase.name);
    },
    exists(secretBase) {
      return this.secretBases.some((ingredient) => ingredient.name === secretBase.name);
    },
    existsByName(name) {
      return this.secretBases.some((ingredient) => ingredient.name === name);
    },
  }
});
