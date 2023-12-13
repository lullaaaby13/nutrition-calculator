import {Ingredient} from 'src/types/ingredient';

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

export interface SecretBaseComponentType {
    amount: number;
    ingredient: Ingredient;
}
export interface SecretBaseType {
    id: number;
    name: string;
    memo?: string;
    components: SecretBaseComponentType[];
    createdAt?: string;
    updatedAt?: string;
}

export const totalAmountOfSecretBase = (secretBase: SecretBaseType): number => {
    console.log(secretBase);
    return secretBase.components.reduce((acc, cur) => acc + Number(cur.amount), 0);
}
