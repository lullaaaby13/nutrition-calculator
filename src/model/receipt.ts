import {SecretBase} from 'src/model/secret-base';
import {Ingredient} from 'src/model/ingredient';

export interface ReceiptComponent {
  type: 'INGREDIENT' | 'SECRET_BASE';
  amount: number;
  ingredient?: Ingredient;
  secretBase?: SecretBase;
}
export interface Receipt {
  id: number;
  name: string;
  memo?: string;
  category: ReceiptCategory;
  components: ReceiptComponent[];
  sellingPrice: number;
  createdAt: string;
  updatedAt: string;
}

export const isSameReceiptComponent = (a: ReceiptComponent, b: ReceiptComponent) => {
  if (a.type === 'INGREDIENT' && b.type === 'INGREDIENT') {
    if (a.ingredient && b.ingredient) {
      return a.ingredient.id === b.ingredient.id;
    }
    return false;
  }
  if (a.type === 'SECRET_BASE' && b.type === 'SECRET_BASE') {
    if (a.secretBase && b.secretBase) {
      return a.secretBase.id === b.secretBase.id;
    }
    return false;
  }

  return false;
}

export enum ReceiptCategory {
  coffee = 'coffee',
  tea = 'tea',
  bread = 'bread',
  beverage = 'beverage',
  shavedIce = 'shavedIce',
  other = 'other',
}

export type ReceiptCategoryOption = {
  value: ReceiptCategory;
  label: string;
};
export const receiptCategoryOptions: ReceiptCategoryOption[] = [
  {
    value: ReceiptCategory.coffee,
    label: '커피'
  },
  {
    value: ReceiptCategory.tea,
    label: '차'
  },
  {
    value: ReceiptCategory.bread,
    label: '빵 & 케이크'
  },
  {
    value: ReceiptCategory.beverage,
    label: '음료'
  },
  {
    value: ReceiptCategory.shavedIce,
    label: '빙수'
  },
  {
    value: ReceiptCategory.other,
    label: '기타'
  }
];



export const labelOfReceiptCategory = (category: ReceiptCategory | string) => {
  let label = receiptCategoryOptions.find(it => it.value === category);
  if (label) {
    return label.label;
  }
  return '';
}


export interface CreateReceiptRequest {
  name: string;
  memo?: string;
  category: ReceiptCategory;
  sellingPrice: number;
  components: { type: 'INGREDIENT' | 'SECRET_BASE', amount: number, id: number }[];
}

export interface UpdateReceiptRequest {
  name: string;
  memo?: string;
  category: ReceiptCategory;
  sellingPrice: number;
  components: { type: 'INGREDIENT' | 'SECRET_BASE', amount: number, id: number }[];
}
