export class BaseType {
  private _name = '';
  protected _memo?: string;
  private _createdAt: Date = new Date();
  private _updatedAt: Date = new Date();

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value) {
      throw new Error('이름을 입력해 주세요.');
    }
    this._name = value;
  }
  get memo(): string | undefined {
    return this._memo;
  }

  set memo(value: string | undefined) {
    this._memo = value;
    this._updatedAt = new Date();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
