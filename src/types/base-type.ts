export class BaseType {
  private _name = '';
  protected _memo?: string;
  protected createdAt: Date = new Date();
  protected updatedAt: Date = new Date();

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
    this.updatedAt = new Date();
  }
}
