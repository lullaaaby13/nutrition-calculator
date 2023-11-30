import Ingredient, {IngredientCategory, IngredientMock} from 'src/types/ingredient';


export class SecretBase {
  private _name: string;
  private _components: { amount: number, ingredient: Ingredient }[];
  private _createdAt: Date;
  private _updatedAt: Date;
  private _memo?: string;
  constructor(name: string, memo?: string) {
    this.name = name;
    this._components = [];
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this.memo = memo;
  }


  public addComponent(amount: number, ingredient: Ingredient) {
    if (this._components.some(it => it.ingredient.name === ingredient.name)) {
      throw new Error('이미 추가된 원재료 입니다.');
    }
    if (amount < 1) {
      throw new Error('원재료의 양은 1 이상이어야 합니다.');
    }
    this._components.push({ amount, ingredient });
  }

  public removeComponent(ingredient: Ingredient) {
    this._components = this._components.filter(it => it.ingredient.name !== ingredient.name);
  }

  public hasMinimumComponents(): boolean {
    return this._components.length >= 2;
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

  get components(): { amount: number; ingredient: Ingredient }[] {
    return this._components;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get memo(): string | undefined {
    return this._memo;
  }

  set memo(value: string) {
    this._memo = value;
  }

  public ingredient(): SecretBaseIngredient {
    return this.components.reduce((acc, cur) => {
      acc.calories += cur.ingredient.calories * cur.amount;
      acc.carbohydrates += cur.ingredient.carbohydrates * cur.amount;
      acc.sugars += cur.ingredient.sugars * cur.amount;
      acc.protein += cur.ingredient.protein * cur.amount;
      acc.caffeine += cur.ingredient.caffeine * cur.amount;
      acc.fat += cur.ingredient.fat * cur.amount;
      acc.saturatedFat += cur.ingredient.saturatedFat * cur.amount;
      return acc;
    }, {
      caffeine: 0,
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      protein: 0,
      saturatedFat: 0,
      sugars: 0
    });
  }

}

export interface SecretBaseIngredient {
  calories: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
  caffeine: number;
  fat: number;
  saturatedFat: number;
}


const ultraMilk = new SecretBase('울트라 밀크', '고농축 최강 우유');
ultraMilk.addComponent(10, IngredientMock.MILK);
ultraMilk.addComponent(20, IngredientMock.CONDENSED_MILK);

export const SecretBaseMock = {
  ULTRA_MILK: ultraMilk
}
