
export default class Ingredient {
  private _name: string;
  private _category: IngredientCategoryType;
  private _calories: number;
  private _unitPrice: number;
  private _carbohydrates: number;
  private _sugars: number;
  private _protein: number;
  private _caffeine: number;
  private _fat: number;
  private _saturatedFat: number;
  private _memo: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(name: string, category: IngredientCategoryType) {
    this.name = name;
    this.category = category;
    this.calories = 0;
    this.unitPrice = 0;
    this.carbohydrates = 0;
    this.sugars = 0;
    this.protein = 0;
    this.caffeine = 0;
    this.fat = 0;
    this.saturatedFat = 0;
    this.memo = '';
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value) {
      throw new Error('이름을 입력해 주세요.');
    }
    this._name = value;
  }

  get category(): IngredientCategoryType {
    return this._category;
  }

  set category(value: IngredientCategoryType) {
    if (!value) {
      throw new Error('카테고리를 선택해 주세요.');
    }
    this._category = value;
  }

  get calories(): number {
    return this._calories;
  }

  set calories(value: number) {
    this.validateGreaterThanZero(value, '칼로리');
    this._calories = Number(value);
  }

  get unitPrice(): number {
    return this._unitPrice;
  }

  set unitPrice(value: number) {
    this.validateGreaterThanZero(value, '단위 가격');
    this._unitPrice = Number(value);
  }

  get carbohydrates(): number {
    return this._carbohydrates;
  }

  set carbohydrates(value: number) {
    this.validateGreaterThanZero(value, '탄수화물');
    this._carbohydrates = Number(value);
  }

  get sugars(): number {
    return this._sugars;
  }

  set sugars(value: number) {
    this.validateGreaterThanZero(value, '당류');
    this._sugars = Number(value);
  }

  get protein(): number {
    return this._protein;
  }

  set protein(value: number) {
    this.validateGreaterThanZero(value, '단백질');
    this._protein = Number(value);
  }

  get caffeine(): number {
    return this._caffeine;
  }

  set caffeine(value: number) {
    this.validateGreaterThanZero(value, '카페인');
    this._caffeine = Number(value);
  }

  get fat(): number {
    return this._fat;
  }

  set fat(value: number) {
    this.validateGreaterThanZero(value, '지방');
    this._fat = Number(value);
  }

  get saturatedFat(): number {
    return this._saturatedFat;
  }

  set saturatedFat(value: number) {
    this.validateGreaterThanZero(value, '포화지방산');
    this._saturatedFat = Number(value);
  }

  get memo(): string {
    return this._memo;
  }

  set memo(value: string) {
    this._memo = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  private validateGreaterThanZero(value: number, name: string) {
    if (value < 0) {
      throw new Error(`${name}은 0보다 커야 합니다.`);
    }
  }
}


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
}

export type IngredientCategoryType = typeof IngredientCategory[keyof typeof IngredientCategory];


const milk = new Ingredient('우유', IngredientCategory.FRESH);
milk.calories = 52;
milk.unitPrice = 260;
milk.carbohydrates = 4.86;
milk.sugars = 5.32;
milk.protein = 5.32;
milk.caffeine = 0;
milk.fat = 3.39;
milk.saturatedFat = 2.06;
const condensedMilk = new Ingredient('연유', IngredientCategory.FRESH);
condensedMilk.calories = 360;
condensedMilk.unitPrice = 1076;
condensedMilk.carbohydrates = 57;
condensedMilk.sugars = 49;
condensedMilk.protein = 8;
condensedMilk.caffeine = 0;
condensedMilk.fat = 11;
condensedMilk.saturatedFat = 7;
export const IngredientMock = {
  MILK: milk,
  CONDENSED_MILK: condensedMilk,
}

