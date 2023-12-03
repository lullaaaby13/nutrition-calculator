<template>
  <q-dialog full-width full-height>
    <BaseCard>
      <q-card-section class="flex justify-between">
        <div class="text-h6">레시피 등록</div>
        <div class="q-gutter-x-md">
          <q-btn label="등록" color="primary" @click="onCreateButtonClick"/>
          <q-btn label="닫기" v-close-popup/>
        </div>
      </q-card-section>

      <q-card-section class="row">

        <div class="col-8 q-gutter-y-md">
          <IngredientSearchTable @onIngredientClick="onSearchTableClick" />
          <SecretBaseSearchTable @onSecretBaseClick="onSearchTableClick" />
        </div>


        <div class="col-4 q-px-md">
          <BaseCard class="q-gutter-y-sm" width="30vw">
            <div class="row">
              <div class="col-4 q-pr-md">
                <q-select v-model="form.category"
                          :options="Object.values(ReceiptCategory)"
                          label="카테고리"
                          dense
                          stack-label
                />
              </div>
              <div class="col-8">
                <q-input v-model="form.name"
                         type="text"
                         dense
                         label="이름"
                         stack-label
                />
              </div>
            </div>


            <AmountUnitPriceCaption :amount="summary.amount" :unit-price="summary.unitPrice"/>

            <q-card-section v-if="selectedComponents.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                재료
              </div>
              <q-list bordered>
                <q-item v-for="component in selectedComponents" :key="component.component.name">
                  <q-item-section>
                    <q-input type="number"
                             :label="component.component.name"
                             stack-label
                             v-model="component.amount"

                    >
                      <q-icon name="close" size="12px" @click="onRemoveSelectedComponentClick(component)"/>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>
              <NutritionPanel
                  :calories="summary.calories"
                  :unitPrice="summary.unitPrice"
                  :carbohydrates="summary.carbohydrates"
                  :sugars="summary.sugars"
                  :protein="summary.protein"
                  :caffeine="summary.caffeine"
                  :fat="summary.fat"
                  :saturatedFat="summary.saturatedFat"
              />
            </q-card-section>

            <q-card-section>
              <q-input v-model="form.memo" type="textarea" label="메모" outlined/>
            </q-card-section>

          </BaseCard>
        </div>
      </q-card-section>

    </BaseCard>
  </q-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {SecretBase} from 'src/types/secret-base';
import Ingredient, {IngredientCategory} from 'src/types/ingredient';
import IngredientSearchTable from 'components/apps/secret-base/IngredientSearchTable.vue';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';
import {ComponentSummary} from 'src/types/summary';
import SecretBaseSearchTable from 'components/apps/receipts/SecretBaseSearchTable.vue';
import {Receipt, ReceiptCategory, ReceiptComponent} from 'src/types/receipt';
import {useReceiptStore} from 'stores/receipt';
import {useReceiptPageStore} from 'stores/pages/receipt';


const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();

const form = ref({
  name: '',
  memo: '',
  category: ReceiptCategory.COFFEE,
});


const selectedComponents = ref<ReceiptComponent[]>([]);

const onSearchTableClick = (source: SecretBase | Ingredient) => {
  const exists = selectedComponents.value.some(component => component.component.name === source.name);
  if (!exists) {
    selectedComponents.value.push(new ReceiptComponent(10, source));
  }
};

const onRemoveSelectedComponentClick = (component: ReceiptComponent) => {
  const index = selectedComponents.value.findIndex(it => it.component.name === component.component.name);
  if (index !== -1) {
    selectedComponents.value.splice(index, 1);
  }
};

const summary = computed(() => {
  const componentSummary = new ComponentSummary();
  componentSummary.addReceiptComponents(selectedComponents.value);
  return componentSummary;
});

const onCreateButtonClick = () => {
  const receipt = new Receipt(form.value.name, form.value.category, form.value.memo);

  selectedComponents.value.forEach(component => receipt.addComponent(component));

  receiptStore.save(receipt);

  while(selectedComponents.value.pop()) {}

  receiptPageStore.closeCreateReceiptDialog();
};

</script>
