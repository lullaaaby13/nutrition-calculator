import Ingredient, {IngredientMock} from 'src/types/ingredient';
import {BaseType} from 'src/types/base-type';
import {ComponentSummary} from 'src/types/summary';

export class SecretBaseComponent {
  readonly amount: number;
  readonly ingredient: Ingredient;
  constructor(amount: number, ingredient: Ingredient) {
    if (amount < 1) {
      throw new Error('원재료의 양은 1 이상이어야 합니다.');
    }
    this.amount = amount;
    this.ingredient = ingredient;
  }

}

export class SecretBase extends BaseType {

  private _components: SecretBaseComponent[];
  constructor(name: string, memo?: string) {
    super();
    this._components = [];
    this.name = name;
    this.memo = memo;
  }

  public static empty(): SecretBase {
    return new SecretBase('EMPTY');
  }

  public addComponent(amount: number, ingredient: Ingredient) {
    if (this._components.some(it => it.ingredient.name === ingredient.name)) {
      throw new Error('이미 추가된 원재료 입니다.');
    }
    this._components.push(new SecretBaseComponent(amount, ingredient));
    this.updatedAt = new Date();
  }

  public removeComponent(ingredient: Ingredient) {
    this._components = this._components.filter(it => it.ingredient.name !== ingredient.name);
    this.updatedAt = new Date();
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
      this.updatedAt = new Date();
    } catch (e) {
      this._components = before;
      throw e;
    }
  }

  public hasMinimumComponents(): boolean {
    return this._components.length >= 2;
  }

  get components(): SecretBaseComponent[] {
    return this._components;
  }

  get summary(): ComponentSummary {
    const componentSummary = new ComponentSummary();
    componentSummary.addSecretBaseComponents(this._components);
    return componentSummary;
  }

  get totalAmount(): number {
    return this._components.reduce((acc, cur) => acc + cur.amount, 0);
  }

}

const ultraMilk = new SecretBase('울트라 밀크', '고농축 최강 우유');
ultraMilk.addComponent(10, IngredientMock.MILK);
ultraMilk.addComponent(20, IngredientMock.CONDENSED_MILK);

const testSecretBase = new SecretBase('테스트 시크릿베이스');
testSecretBase.addComponent(10, IngredientMock.TESTA);
testSecretBase.addComponent(20, IngredientMock.TESTB);


export const SecretBaseMock = {
  ULTRA_MILK: ultraMilk,
  TEST: testSecretBase,
}

