import {defineStore} from 'pinia';
import { SecretBaseType} from 'src/types/secret-base';
import SecretBaseAPI from 'src/api/secret-base';
import {ComponentSummary} from 'src/types/summary';

export const useSecretBaseStore = defineStore({
    id: 'secretBaseStore',
    state: (): { secretBases: SecretBaseType[] } => ({
        secretBases: []
    }),

    getters: {
      summaries(): ComponentSummary[] {
        return this.secretBases.map(it => {
          const summary = new ComponentSummary(it.id, it.name);
          summary.addSecretBaseComponents(it.components);
          return summary;
        });
      },
    },

    actions: {

        findById(id: number) {
            return this.secretBases.find(it => it.id === id);
        },

        async save(secretBase: SecretBaseType) {
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

        async refresh() {
            const secretBases = await SecretBaseAPI.list();
            this.secretBases = secretBases;
        },

        async update(id: number, secretBase: any) {

            const request = {
                name: secretBase.name,
                memo: secretBase.memo,
                components: secretBase.components.map((it: any) => ({
                    amount: it.amount,
                    ingredientId: it.ingredient.id
                })),
            };
            await SecretBaseAPI.update(id, request)
            await this.refresh();
        }
    }

})
