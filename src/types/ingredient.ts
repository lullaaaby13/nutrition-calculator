export interface Ingredient {
  id: number;
  name: string;
  category: IngredientCategory;
  calories: number;
  unitPrice: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
  caffeine: number;
  fat: number;
  saturatedFat: number;
  memo?: string;
  createdAt?: string;
  updatedAt?: string;
};


export const IngredientCategory = {
  FRESH: {
    name: 'fresh',
    label: '신선 식품',
  },
  FRUITS: {
    name: 'fruits',
    label: '과일 & 채소',
  },
  FLOUR: {
    name: 'flour',
    label: '가루류 & 곡류',
  },
  COFFEE: {
    name: 'coffee',
    label: '커피 원두 & 차',
  },
  TOPPING: {
    name: 'topping',
    label: '토핑 재료',
  },
  ADDITIVES: {
    name: 'additives',
    label: '식품 첨가물',
  },
  PACKAGING: {
    name: 'packaging',
    label: '포장 용품',
  },
};

export type IngredientCategory = typeof IngredientCategory[keyof typeof IngredientCategory];
