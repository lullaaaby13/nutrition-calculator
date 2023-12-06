import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

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

@Entity()
export default class Ingredient {

  @PrimaryGeneratedColumn({ name: 'id' })
  private id?: number;

  @Column({ name: 'name', type: 'varchar' })
  private name = '';

  @Column({ name: 'memo', type: 'varchar', nullable: true })
  private memo?: string = '';

  @Column({ name: 'category', type: 'varchar', transformer: {
      from: (value: string) => value,
      to: (value: string) => value,
  }})
  private category: IngredientCategory = '';

  @Column({ name: 'calories', type: 'decimal' })
  private calories = 0;

  @Column({ name: 'unitPrice', type: 'decimal' })
  private unitPrice = 0;

  @Column({ name: 'carbohydrates', type: 'decimal' })
  private carbohydrates = 0;

  @Column({ name: 'sugars', type: 'decimal' })
  private sugars = 0;

  @Column({ name: 'protein', type: 'decimal' })
  private protein = 0;

  @Column({ name: 'caffeine', type: 'decimal' })
  private caffeine = 0;

  @Column({ name: 'fat', type: 'decimal' })
  private fat = 0;

  @Column({ name: 'saturatedFat', type: 'decimal' })
  private saturatedFat = 0;

  @CreateDateColumn()
  @Column({ name: 'createdAt', type: 'datetime' })
  private createdAt: Date = new Date();

  @UpdateDateColumn()
  @Column({ name: 'updatedAt', type: 'datetime' })
  private updatedAt: Date= new Date();

  public getId(): number {
    return this.id || -1;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    if (!value) {
      throw new Error('이름을 입력해 주세요.');
    }
    this.name = value;
  }

  public getMemo(): string {
    return this.memo || '';
  }

  public setMemo(value: string) {
    this.memo = value;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(value: string) {
    this.category = value;
  }

  public getCalories(): number {
    return this.calories;
  }

  public setCalories(value: number) {
    if (value < 0) {
      throw new Error('칼로리는 0보다 작을 수 없습니다.');
    }
    this.calories = value;
  }

  public getUnitPrice(): number {
    return this.unitPrice;
  }

  public setUnitPrice(value: number) {
    if (value < 0) {
      throw new Error('단위 가격은 0보다 작을 수 없습니다.');
    }
    this.unitPrice = value;
  }

  public getCarbohydrates(): number {
    return this.carbohydrates;
  }

  public setCarbohydrates(value: number) {
    if (value < 0) {
      throw new Error('탄수화물은 0보다 작을 수 없습니다.');
    }
    this.carbohydrates = value;
  }

  public getSugars(): number {
    return this.sugars;
  }

  public setSugars(value: number) {
    if (value < 0) {
      throw new Error('당류는 0보다 작을 수 없습니다.');
    }
    this.sugars = value;
  }

  public getProtein(): number {
    return this.protein;
  }

  public setProtein(value: number) {
    if (value < 0) {
      throw new Error('단백질은 0보다 작을 수 없습니다.');
    }
    this.protein = value;
  }

  public getCaffeine(): number {
    return this.caffeine;
  }

  public setCaffeine(value: number) {
    if (value < 0) {
      throw new Error('카페인은 0보다 작을 수 없습니다.');
    }
    this.caffeine = value;
  }

  public getFat(): number {
    return this.fat;
  }

  public setFat(value: number) {
    if (value < 0) {
      throw new Error('지방은 0보다 작을 수 없습니다.');
    }
    this.fat = value;
  }

  public getSaturatedFat(): number {
    return this.saturatedFat;
  }

  public setSaturatedFat(value: number) {
    if (value < 0) {
      throw new Error('포화지방산은 0보다 작을 수 없습니다.');
    }
    this.saturatedFat = value;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(value: Date) {
    this.updatedAt = value;
  }

}
