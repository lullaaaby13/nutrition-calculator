export interface Ingredient {
  id: number;
  name: string;
  category: IngredientCategory;
  calories: number;
  unitPrice: number;
  carbohydrates: number;
  sugar: number;
  fiber: number;
  protein: number;
  caffeine: number;
  fat: number;
  saturatedFat: number;
  memo?: string;
  createdAt?: string;
  updatedAt?: string;
};

export enum IngredientCategory {
  fresh = 'fresh',
  fruits = 'fruits',
  flour = 'flour',
  coffee = 'coffee',
  topping = 'topping',
  additives = 'additives',
  packaging = 'packaging',
};

export type IngredientCategoryOption = {
  value: IngredientCategory;
  label: string;
};
export const ingredientCategoryOptions: IngredientCategoryOption[] = [
  {
    value: IngredientCategory.fresh,
    label: '신선 식품',
  },
  {
    value: IngredientCategory.fruits,
    label: '과일 & 채소',
  },
  {
    value: IngredientCategory.flour,
    label: '가루류 & 곡류',
  },
  {
    value: IngredientCategory.coffee,
    label: '커피 원두 & 차',
  },
  {
    value: IngredientCategory.topping,
    label: '토핑 재료',
  },
  {
    value: IngredientCategory.additives,
    label: '식품 첨가물',
  },
  {
    value: IngredientCategory.packaging,
    label: '포장 용품',
  },
];

export const labelOfIngredientCategory = (category: IngredientCategory): string => {
  const option = ingredientCategoryOptions.find(it => it.value === category);
  if (option) {
    return option.label;
  }
  return '';
}

export interface CreateIngredientRequest {
  name: string,
  memo?: string,
  unitPrice: number,
  calories: number,
  protein: number,
  fat: number,
  carbohydrates: number,
  sugar: number,
  fiber: number,
  caffeine: number,
  saturatedFat: number,
  category: IngredientCategory,
}

export interface UpdateIngredientRequest {
  name: string,
  memo?: string,
  unitPrice: number,
  calories: number,
  protein: number,
  fat: number,
  carbohydrates: number,
  sugar: number,
  fiber: number,
  caffeine: number,
  saturatedFat: number,
  category: IngredientCategory,
}


export const emptyIngredient: Ingredient = {
  caffeine: 0,
  calories: 0,
  carbohydrates: 0,
  category: IngredientCategory.fresh,
  fat: 0,
  fiber: 0,
  id: 0,
  name: "",
  protein: 0,
  saturatedFat: 0,
  sugar: 0,
  unitPrice: 0,
}
