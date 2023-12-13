import {defineStore} from 'pinia';
import {SecretBase, SecretBaseType} from 'src/types/secret-base';
import SecretBaseAPI from 'src/api/secret-base';

export const useSecretBaseStore = defineStore({
    id: 'secret-base',
    state: (): { secretBases: SecretBaseType[] } => ({
        secretBases: []
    }),

    actions: {
        async save(secretBase: any) {
            const request = {
                name: secretBase.name,
                memo: secretBase.memo,
                components: secretBase.components.map((it: any) => ({
                    amount: it.amount,
                    ingredientId: it.ingredient.id,
                })),
            };

            await SecretBaseAPI.save(request);

            await this.refresh();


        },

        async delete(id: number) {
            await SecretBaseAPI.delete(id);
            await this.refresh();
        },

        exists(secretBase: SecretBase) {
            return this.secretBases.some(it => it.name === secretBase.name);
        },

        async refresh() {
            const secretBases = await SecretBaseAPI.list();
            this.secretBases = secretBases;
        },

        async update(id: number, secretBase: any) {
            console.log(id, secretBase);
            const request = {
                name: secretBase.name,
                memo: secretBase.memo,
                components: secretBase.components.map((it: any) => ({
                    amount: it.amount,
                    ingredientId: it.ingredient.id
                })),
            };
            console.log(request)
            await SecretBaseAPI.update(id, request)
            await this.refresh();
        }
    }

})
