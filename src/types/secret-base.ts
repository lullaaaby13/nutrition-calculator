import Ingredient, {IngredientMock} from 'src/types/ingredient';


export class SecretBase {
  private _name: string;
  private _components: SecretBaseComponent[];
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

  public static empty(): SecretBase {
    return new SecretBase('EMPTY');
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

  public replaceComponents(components: SecretBaseComponent[]) {
    if (components.length < 2) {
      throw new Error('원재료는 2개 이상이어야 합니다.');
    }
    const before = this._components;
    this._components = [];
    try {
      components.forEach(it => {
        this.addComponent(it.amount, it.ingredient);
      });
    } catch (e) {
      this._components = before;
      throw e;
    }
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

  get components(): SecretBaseComponent[] {
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
      const ratio = cur.amount / 100;
      acc.calories += cur.ingredient.calories * ratio;
      acc.carbohydrates += cur.ingredient.carbohydrates * ratio;
      acc.sugars += cur.ingredient.sugars * ratio;
      acc.protein += cur.ingredient.protein * ratio;
      acc.caffeine += cur.ingredient.caffeine * ratio;
      acc.fat += cur.ingredient.fat * ratio;
      acc.saturatedFat += cur.ingredient.saturatedFat * ratio;
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

  public summary(): SecretBaseSummary {
    const ingredient = this.ingredient();
    return {
      name: this.name,
      memo: this.memo,
      amount: this._components.reduce((acc, cur) => acc + cur.amount, 0),
      unitPrice: this._components.reduce((acc, cur) => acc + cur.ingredient.unitPrice * (cur.amount / 100), 0),
      ingredient
    }
  }

}
export interface SecretBaseSummary {
  amount: number;
  unitPrice: number;
  calories: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
  caffeine: number;
  fat: number;
  saturatedFat: number;
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

export class SecretBaseComponent {
  amount: number;
  ingredient: Ingredient;
  constructor(amount: number, ingredient: Ingredient) {
    this.amount = amount;
    this.ingredient = ingredient;
  }

  public static summary(components: SecretBaseComponent[]): SecretBaseSummary {
    return components.reduce((acc, cur) => {
      const ratio = Number(cur.amount) / 100;
      acc.amount += Number(cur.amount);
      acc.unitPrice += Number(cur.ingredient.unitPrice) * ratio;
      acc.calories += Number(cur.ingredient.calories) * ratio;
      acc.carbohydrates += Number(cur.ingredient.carbohydrates) * ratio;
      acc.sugars += Number(cur.ingredient.sugars) * ratio;
      acc.protein += Number(cur.ingredient.protein) * ratio;
      acc.caffeine += Number(cur.ingredient.caffeine) * ratio;
      acc.fat += Number(cur.ingredient.fat) * ratio;
      acc.saturatedFat += Number(cur.ingredient.saturatedFat) * ratio;
      return acc;
    }, {
      amount: 0,
      unitPrice: 0,
      caffeine: 0,
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      protein: 0,
      saturatedFat: 0,
      sugars: 0,
    });
  }

}
