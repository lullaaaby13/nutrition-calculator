import {Ingredient} from 'src/types/ingredient';
import { SecretBaseComponent, SecretBaseType, totalAmountOfSecretBase} from 'src/types/secret-base';
import {ReceiptComponentType} from 'src/types/receipt';

export class ComponentSummary {
  id? = 0;
  name? = '';
  amount = 0;
  unitPrice = 0;
  calories = 0;
  carbohydrates = 0;
  sugars = 0;
  protein = 0;
  caffeine = 0;
  fat = 0;
  saturatedFat = 0;
  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }

  public addIngredient(amount: number, ingredient: Ingredient) {
    const ratio = Number(amount) / 100;
    // console.log(amount, ingredient, ratio);
    this.amount += Number(amount);
    this.unitPrice += Number(ingredient.unitPrice) * ratio;
    this.calories += Number(ingredient.calories) * ratio;
    this.carbohydrates += Number(ingredient.carbohydrates) * ratio;
    this.sugars += Number(ingredient.sugars) * ratio;
    this.protein += Number(ingredient.protein) * ratio;
    this.caffeine += Number(ingredient.caffeine) * ratio;
    this.fat += Number(ingredient.fat) * ratio;
    this.saturatedFat += Number(ingredient.saturatedFat) * ratio;
  }

  public addSecretBase(amount: number, secretBase: SecretBaseType) {

    const ratio =  amount / totalAmountOfSecretBase(secretBase);
    console.log('addSecretBase: ', secretBase, amount, totalAmountOfSecretBase(secretBase), ratio)
    secretBase.components.forEach(it => {
      this.addIngredient(it.amount * ratio, it.ingredient);
    });
  }

  public addSecretBaseComponents(secretBaseComponents: SecretBaseComponent[]) {

    secretBaseComponents.forEach(it => {
      this.addIngredient(it.amount, it.ingredient);
    });
  }

  public addReceiptComponents(components: ReceiptComponentType[]) {
    components.forEach(it => {
      // console.log(it.amount, it.component.name)
      if (it.sourceType === 'SecretBase') {
        this.addSecretBase(it.amount, it.source as SecretBaseType);
      } else {
        this.addIngredient(it.amount, it.source as Ingredient);
      }
    });
  }

    getId(): number | undefined {
        return this.id;
    }
    getName(): string | undefined {
        return this.name;
    }

  getAmount(): string {
    return Number(this.amount).toFixed(2);
  }
  getUnitPrice(): string {
    return Number(this.unitPrice).toFixed(2);
  }
  getCalories(): string {
    return Number(this.calories).toFixed(2);
  }
  getCarbohydrates(): string {
    return Number(this.carbohydrates).toFixed(2);
  }
  getSugars(): string {
    return Number(this.sugars).toFixed(2);
  }
  getProtein(): string {
    return Number(this.protein).toFixed(2);
  }
  getCaffeine(): string {
    return Number(this.caffeine).toFixed(2);
  }
  getFat(): string {
    return Number(this.fat).toFixed(2);
  }
  getSaturatedFat(): string {
    return Number(this.saturatedFat).toFixed(2);
  }
}

// export function summaryOfSecretBaseComponents(components: SecretBaseComponent[]): ComponentSummary {
//   return components.reduce((acc, cur) => {
//     const ratio = Number(cur.amount) / 100;
//     acc.amount += Number(cur.amount);
//     acc.unitPrice += Number(cur.ingredient.unitPrice) * ratio;
//     acc.calories += Number(cur.ingredient.calories) * ratio;
//     acc.carbohydrates += Number(cur.ingredient.carbohydrates) * ratio;
//     acc.sugars += Number(cur.ingredient.sugars) * ratio;
//     acc.protein += Number(cur.ingredient.protein) * ratio;
//     acc.caffeine += Number(cur.ingredient.caffeine) * ratio;
//     acc.fat += Number(cur.ingredient.fat) * ratio;
//     acc.saturatedFat += Number(cur.ingredient.saturatedFat) * ratio;
//     return acc;
//   }, {
//     amount: 0,
//     unitPrice: 0,
//     caffeine: 0,
//     calories: 0,
//     carbohydrates: 0,
//     fat: 0,
//     protein: 0,
//     saturatedFat: 0,
//     sugars: 0,
//   });
// }
//
// export function summaryOfReceiptComponents(components: ReceiptComponent[]) {
//
//   const groupBy = components.reduce((acc, cur) => {
//     if (cur.source instanceof SecretBase) {
//       // @ts-ignore
//       acc.secretBases.push(cur);
//     }  else {
//       // @ts-ignore
//       acc.ingredients.push(cur);
//     }
//     return acc;
//   }, {
//     secretBases: [],
//     ingredients: [],
//   });
//
//   const componentSummary = summaryOfSecretBaseComponents(groupBy.secretBases);
//
// }
