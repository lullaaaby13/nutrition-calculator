import {Ingredient} from 'src/types/ingredient';

export interface SecretBaseComponent {
    amount: number;
    ingredient: Ingredient;
}
export interface SecretBase {
    id: number;
    name: string;
    memo?: string;
    components: SecretBaseComponent[];
    createdAt: string;
    updatedAt: string;
}

export const totalAmountOfSecretBase = (secretBase: SecretBase): number => {
    console.log(secretBase);
    return secretBase.components.reduce((acc, cur) => acc + Number(cur.amount), 0);
}

export interface CreateSecretBaseRequest {
    name: string;
    memo?: string;
    components: { amount: number, ingredientId: number }[];
}

export interface UpdateSecretBaseRequest {
    name: string;
    memo?: string;
    components: { amount: number, ingredientId: number }[];
}
