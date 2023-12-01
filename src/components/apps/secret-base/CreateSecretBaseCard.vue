<template>
  <q-dialog full-width full-height>
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
                       dense
                       label="이름"
                       stack-label
              />
            </div>

            <AmountUnitPriceCaption :amount="totalIngredients.amount" :unit-price="totalIngredients.unitPrice"/>

            <q-card-section v-if="selectedComponents.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                원재료
              </div>
              <q-list bordered>
                <q-item v-for="ingredient in selectedComponents" :key="ingredient.ingredient.name">
                  <q-item-section>
                    <q-input type="number"
                             :label="ingredient.ingredient.name"
                             stack-label
                             v-model="ingredient.amount"

                    >
                      <q-icon name="close" size="12px" @click="onRemoveSelectedIngredientClick(ingredient)"/>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>
              <NutritionPanel
                  :calories="totalIngredients.calories"
                  :unitPrice="totalIngredients.unitPrice"
                  :carbohydrates="totalIngredients.carbohydrates"
                  :sugars="totalIngredients.sugars"
                  :protein="totalIngredients.protein"
                  :caffeine="totalIngredients.caffeine"
                  :fat="totalIngredients.fat"
                  :saturatedFat="totalIngredients.saturatedFat"
              />
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
import {useIngredientStore} from 'stores/ingredients';
import {useSecretBaseStore} from 'stores/secret-base';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {SecretBase, SecretBaseComponent} from 'src/types/secret-base';
import Ingredient from 'src/types/ingredient';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';
import IngredientSearchTable from 'components/apps/secret-base/IngredientSearchTable.vue';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';

const ingredientStore = useIngredientStore();
const secretBaseStore = useSecretBaseStore();
const secretBasePageStore = useSecretBasePageStore();

const name = ref('');
const memo = ref('');

const selectedComponents = ref<SecretBaseComponent[]>([]);

const onIngredientClick = (ingredient: Ingredient) => {
  console.log(ingredient)
  const exists = selectedComponents.value.some(selectedIngredient => selectedIngredient.ingredient.name === ingredient.name);
  if (!exists) {
    selectedComponents.value.push({
      amount: 0,
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
  return SecretBaseComponent.summary(selectedComponents.value);
});

const onCreateButtonClick = () => {

  try {

    const secretBase = new SecretBase(name.value, memo.value);

    selectedComponents.value.forEach(selectedIngredient => {
      const amount = Number(selectedIngredient.amount);
      const ingredient = selectedIngredient.ingredient;
      secretBase.addComponent(amount, ingredient);
    });

    secretBaseStore.save(secretBase);

    while(selectedComponents.value.pop()) {}
    secretBasePageStore.closeCreateSecretBaseDialog();

  } catch (e) {
    alert(e.message);
  }

};

</script>

