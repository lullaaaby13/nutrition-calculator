import {SecretBaseType} from 'src/types/secret-base';
import {BaseType} from 'src/types/base-type';
import {ComponentSummary} from 'src/types/summary';
import {Ingredient} from 'src/types/ingredient';

export interface ReceiptComponentType {
  amount: number;
  sourceType: 'Ingredient' | 'SecretBase';
  source: SecretBaseType | Ingredient;
}

export const isSameReceiptComponent = (a: ReceiptComponentType, b: ReceiptComponentType) => {
    return a.sourceType === b.sourceType && a.source.id === b.source.id;
}
export const ReceiptCategory = {
  COFFEE: {
    name: 'coffee',
    label: '커피'
  },
  TEA: {
    name: 'tea',
    label: '차'
  },
  BREAD: {
    name: 'bread',
    label: '빵 & 케이크'
  },
  BEVERAGE: {
    name: 'beverage',
    label: '음료'
  },
  SHAVED_ICE: {
    name: 'shavedIce',
    label: '빙수'
  },
  OTHER: {
    name: 'other',
    label: '기타'
  }
}

export type ReceiptCategory = typeof ReceiptCategory[keyof typeof ReceiptCategory];
export interface ReceiptType  {
  id?: number;
  name: string;
  memo?: string;
  category: ReceiptCategory;
  components: ReceiptComponentType[];
  sellingPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
//
// export class Receipt extends BaseType {
//   private _category: ReceiptCategory = ReceiptCategory.COFFEE;
//   private _components: ReceiptComponent[] = [];
//   private _sellingPrice: number;
//   constructor(name: string, category: ReceiptCategory, memo?: string) {
//     super();
//     this._category = category;
//     this._components = [];
//     this._sellingPrice = 0;
//     this.name = name;
//     this.memo = memo;
//   }
//
//   public static empty(): Receipt {
//     return new Receipt('EMPTY', ReceiptCategory.COFFEE);
//   }
//
//   public addIngredient(amount: number, ingredient: Ingredient) {
//     if (this._components.some(it => it.component.name === ingredient.name)) {
//       throw new Error('이미 추가된 원재료 입니다.');
//     }
//     this._components.push(new ReceiptComponent(amount, ingredient));
//     this.updatedAt = new Date();
//   }
//   public addSecretBase(amount: number, secretBase: SecretBase) {
//     if (this._components.some(it => it.component.name === secretBase.name)) {
//       throw new Error('이미 추가된 원재료 입니다.');
//     }
//     this._components.push(new ReceiptComponent(amount, secretBase));
//     this.updatedAt = new Date();
//   }
//   public addComponent(component: ReceiptComponent) {
//     if (this._components.some(it => it.component.name === component.component.name)) {
//       throw new Error('이미 추가된 원재료 입니다.');
//     }
//     this._components.push(component);
//     this.updatedAt = new Date();
//   }
//
//   get category(): ReceiptCategory {
//     return this._category;
//   }
//
//   set category(value: ReceiptCategory) {
//     if (!value) {
//       throw new Error('카테고리를 선택해 주세요.');
//     }
//     this._category = value;
//   }
//
//   get secretBases() {
//     return this._components.filter(it => it.component instanceof SecretBase);
//   }
//
//   get ingredients() {
//     //return this._components.filter(it => it.component instanceof Ingredient);
//     return [];
//   }
//
//   get components(): ReceiptComponent[] {
//     return this._components;
//   }
//
//   get totalAmount(): number {
//     return this._components.reduce((acc, cur) => acc + cur.amount, 0);
//   }
//
//   public replaceComponents(components: ReceiptComponent[]) {
//     if (components.length < 2) {
//       throw new Error('원재료는 2개 이상이어야 합니다.');
//     }
//     const before = this._components;
//     this._components = [];
//     try {
//       components.forEach(it => {
//         this.addComponent(it);
//       });
//       this.updatedAt = new Date();
//     } catch (e) {
//       this._components = before;
//       throw e;
//     }
//   }
//
//   public hasMinimumComponents(): boolean {
//     return this._components.length >= 2;
//   }
//
//
//   get sellingPrice(): number {
//     return this._sellingPrice;
//   }
//
//   set sellingPrice(value: number) {
//     if (value < 0) {
//       throw new Error('판매가격은 0 이상이어야 합니다.');
//     }
//     this._sellingPrice = value;
//   }
//
//   get salesMargin(): number {
//     return Math.round(((this.sellingPrice - this.summary.unitPrice) / this.sellingPrice) * 100);
//   }
//
//   get summary(): ComponentSummary {
//     const componentSummary = new ComponentSummary();
//     componentSummary.addReceiptComponents(this._components);
//     return componentSummary;
//   }
// }

//
// export class ReceiptComponent {
//   readonly amount: number;
//   readonly component: SecretBase | Ingredient;
//
//   constructor(amount: number, component: SecretBase | Ingredient) {
//     if (amount < 1) {
//       throw new Error('원재료의 양은 1 이상이어야 합니다.');
//     }
//     this.amount = amount;
//     this.component = component;
//   }
//
// }



