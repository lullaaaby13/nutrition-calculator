import {SecretBase} from 'src/types/secret-base';
import Ingredient from 'src/types/ingredient';
import {BaseType} from 'src/types/base-type';
import {ComponentSummary} from 'src/types/summary';

export class Receipt extends BaseType {
  private _category: ReceiptCategory = ReceiptCategory.COFFEE;
  private _components: ReceiptComponent[] = [];
  constructor(name: string, memo?: string) {
    super();
    this._components = [];
    this.name = name;
    this.memo = memo;
  }

  public static empty(): Receipt {
    return new Receipt('EMPTY');
  }

  public addComponent(amount: number, component: SecretBase | Ingredient) {
    if (this._components.some(it => it.component.name === component.name)) {
      throw new Error('이미 추가된 원재료 입니다.');
    }
    this._components.push(new ReceiptComponent(amount, component));
    this.updatedAt = new Date();
  }

  get category(): ReceiptCategory {
    return this._category;
  }

  set category(value: ReceiptCategory) {
    if (!value) {
      throw new Error('카테고리를 선택해 주세요.');
    }
    this._category = value;
  }
}


export class ReceiptComponent {
  readonly amount: number;
  readonly component: SecretBase | Ingredient;

  constructor(amount: number, component: SecretBase | Ingredient) {
    if (amount < 1) {
      throw new Error('원재료의 양은 1 이상이어야 합니다.');
    }
    this.amount = amount;
    this.component = component;
  }

}

export const ReceiptCategory = {
  COFFEE: {
    name: 'coffee',
    label: 'Coffee'
  },
  TEA: {
    name: 'tea',
    label: 'Tea'
  },
  BREAD: {
    name: 'bread',
    label: 'Bread'
  },
  CAKE: {
    name: 'cake',
    label: 'Cake'
  },
  BEVERAGE: {
    name: 'beverage',
    label: 'Beverage'
  },
  OTHER: {
    name: 'other',
    label: 'Other'
  }
}

export type ReceiptCategory = typeof ReceiptCategory[keyof typeof ReceiptCategory];
