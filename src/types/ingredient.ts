import {BaseType} from 'src/types/base-type';

export default class Ingredient extends BaseType {
  private _category: IngredientCategory = IngredientCategory.FRESH;
  private _calories = 0;
  private _unitPrice = 0;
  private _carbohydrates = 0;
  private _sugars = 0;
  private _protein = 0;
  private _caffeine = 0;
  private _fat = 0;
  private _saturatedFat = 0;

  constructor(name: string, category: IngredientCategory) {
    super();
    this.name = name;
    this.category = category;
  }

  get category(): IngredientCategory {
    return this._category;
  }

  set category(value: IngredientCategory) {
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

export type IngredientCategory = typeof IngredientCategory[keyof typeof IngredientCategory];

const water = new Ingredient('물', IngredientCategory.FRESH);
const espresso = new Ingredient('에스프레소', IngredientCategory.COFFEE);
espresso.calories = 1;
espresso.unitPrice = 300;
espresso.carbohydrates = 0;
espresso.sugars = 0;
espresso.protein = 0.07;
espresso.caffeine = 75;
espresso.fat = 0.11;
espresso.saturatedFat = 0.05;

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

const testA = new Ingredient('TestIngredientA', IngredientCategory.FRESH);
testA.calories = 100;
testA.unitPrice = 100;
testA.carbohydrates = 100;
testA.sugars = 100;
testA.protein = 100;
testA.caffeine = 100;
testA.fat = 100;
testA.saturatedFat = 100;

const testB = new Ingredient('TestIngredientB', IngredientCategory.FRESH);
testB.calories = 200;
testB.unitPrice = 200;
testB.carbohydrates = 200;
testB.sugars = 200;
testB.protein = 200;
testB.caffeine = 200;
testB.fat = 200;
testB.saturatedFat = 200;

export const IngredientMock = {
  WATER: water,
  ESPRESSO: espresso,
  MILK: milk,
  CONDENSED_MILK: condensedMilk,
  TESTA: testA,
  TESTB: testB,
}

