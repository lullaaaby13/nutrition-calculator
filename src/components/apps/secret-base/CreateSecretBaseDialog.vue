<template>
  <q-dialog
      full-width
      full-height
      @before-hide="onBeforeHide"
  >
    <BaseCard>
      <q-card-section class="flex justify-between">
        <div class="text-h6">시크릿 베이스 등록</div>
        <div class="q-gutter-x-md">
          <q-btn label="등록" color="primary" @click="onCreateButtonClick"/>
          <q-btn label="닫기" v-close-popup/>
        </div>
      </q-card-section>

      <q-card-section class="row">

        <IngredientSearchTable class="col-8" @onIngredientClick="onIngredientClick"/>

        <div class="col-4 q-px-md">
          <BaseCard class="q-gutter-y-sm" width="30vw">
            <div class="text-subtitle1">
              <q-input v-model="name"
                       type="text"
                       label="이름"
                       stack-label
                       outlined
              />
            </div>

            <AmountUnitPriceCaption :amount="totalIngredients.amount" :unit-price="totalIngredients.unitPrice"/>

            <q-card-section v-if="selectedComponents.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                원재료
              </div>
              <q-list>
                <q-item v-for="ingredient in selectedComponents" :key="ingredient.ingredient.name">
                  <q-item-section>
                    <q-input type="number"
                             v-model="ingredient.amount"
                             :label="ingredient.ingredient.name"
                             stack-label
                             outlined
                    >
                      <template v-slot:append>
                        <q-item-label>
                          <q-icon name="close" size="12px" class="cursor-pointer" @click="onRemoveSelectedIngredientClick(ingredient)"/>
                        </q-item-label>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>
              <NutritionPanel v-bind="totalIngredients"/>
            </q-card-section>

            <q-card-section>
              <q-input v-model="memo" type="textarea" label="메모" outlined/>
            </q-card-section>

          </BaseCard>
        </div>
      </q-card-section>

    </BaseCard>
  </q-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useSecretBaseStore} from 'stores/secret-base';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {SecretBaseComponent, SecretBase, CreateSecretBaseRequest} from 'src/model/secret-base';
import {Ingredient} from 'src/model/ingredient';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';
import IngredientSearchTable from 'components/apps/secret-base/IngredientSearchTable.vue';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';
import {ComponentSummary} from 'src/model/summary';


const secretBaseStore = useSecretBaseStore();
const secretBasePageStore = useSecretBasePageStore();

const name = ref('');
const memo = ref('');

const selectedComponents = ref<SecretBaseComponent[]>([]);

const onIngredientClick = (ingredient: Ingredient) => {
  const exists = selectedComponents.value.some(selectedIngredient => selectedIngredient.ingredient.name === ingredient.name);
  if (!exists) {
    selectedComponents.value.push({
      amount: 10,
      ingredient: ingredient,
    });
  }
};

const onRemoveSelectedIngredientClick = (ingredient: Ingredient) => {
  const index = selectedComponents.value.findIndex(selectedIngredient => selectedIngredient.ingredient.name === ingredient.ingredient.name);
  if (index !== -1) {
    selectedComponents.value.splice(index, 1);
  }
};

const totalIngredients = computed(() => {
  const componentSummary = new ComponentSummary();
  componentSummary.addSecretBaseComponents(selectedComponents.value);
  return componentSummary;
});

const onCreateButtonClick = async () => {
  const secretBase: CreateSecretBaseRequest = {
    name: name.value,
    memo: memo.value,
    components: selectedComponents.value.map(selectedIngredient => {
      return {
        amount: selectedIngredient.amount,
        ingredientId: selectedIngredient.ingredient.id,
      };
    })
  }

  await secretBaseStore.save(secretBase);

  selectedComponents.value.splice(0, selectedComponents.value.length);
  secretBasePageStore.closeCreateSecretBaseDialog();

};

const onBeforeHide = () => {
  name.value = '';
  memo.value = '';
  while(selectedComponents.value.pop()) {}
};

</script>

