import Ingredient from 'src/types/ingredient';


export class SecretBase {
  private _name: string;
  private _components: { amount: number, ingredient: Ingredient }[];
  private _createdAt: Date;
  private _updatedAt: Date;
  constructor(name: string) {
    this._name = name;
    this._components = [];
    this._createdAt = new Date();
    this._updatedAt = new Date();

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
    if (!this._name) {
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
}
