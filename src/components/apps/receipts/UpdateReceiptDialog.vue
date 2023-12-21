<template>
  <q-dialog full-width full-height @before-show="onBeforeShow">
    <BaseCard>
      <q-card-section class="flex justify-between">
        <div class="text-h6">레시피 수정</div>
        <div class="q-gutter-x-md">
          <q-btn label="수정" color="primary" @click="onUpdateButtonClick"/>
          <q-btn label="닫기" v-close-popup/>
        </div>
      </q-card-section>

      <q-card-section class="row">

        <div class="col-8 q-gutter-y-md">
          <IngredientSearchTable @onIngredientClick="onIngredientSearchTableClick" />
          <SecretBaseSearchTable @onSecretBaseClick="onSecretBaseSearchTableClick" />
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
              <div class="col-4 q-pr-md">
                <q-input v-model="form.name"
                         type="text"
                         dense
                         label="이름"
                         stack-label
                />
              </div>
              <div class="col-4">
                <q-input v-model="form.sellingPrice"
                         type="number"
                         dense
                         label="희망 판매가(원)"
                         stack-label
                />
              </div>
            </div>

            <AmountUnitPriceCaption :amount="summary.amount" :unit-price="summary.unitPrice"/>

            <q-card-section v-if="selectedComponents.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                원재료
              </div>
              <q-list bordered>
                <q-item v-for="component in selectedComponents" :key="component.source.name">
                  <q-item-section>
                    <q-input type="number"
                             :label="component.source.name"
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
                  :calories="summary.getCalories()"
                  :unitPrice="summary.getUnitPrice()"
                  :carbohydrates="summary.getCarbohydrates()"
                  :sugars="summary.getSugars()"
                  :protein="summary.getProtein()"
                  :caffeine="summary.getCaffeine()"
                  :fat="summary.getFat()"
                  :saturatedFat="summary.getSaturatedFat()"
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
import {Ingredient} from 'src/types/ingredient';
import IngredientSearchTable from 'components/apps/secret-base/IngredientSearchTable.vue';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';
import {ComponentSummary} from 'src/types/summary';
import SecretBaseSearchTable from 'components/apps/receipts/SecretBaseSearchTable.vue';
import {isSameReceiptComponent, ReceiptCategory, ReceiptComponentType} from 'src/types/receipt';
import {useReceiptPageStore} from 'stores/pages/receipt';
import {useSecretBaseStore} from 'stores/secret-base';
import {useReceiptStore} from 'stores/receipt';


const receiptPageStore = useReceiptPageStore();
let receiptStore = useReceiptStore();
const secretBaseStore = useSecretBaseStore();

const form = ref({
  name: '',
  memo: '',
  category: ReceiptCategory.COFFEE,
  sellingPrice: 0,
});


const selectedComponents = ref<ReceiptComponentType[]>([]);

const onIngredientSearchTableClick = (ingredient: Ingredient) => {
  const receiptComponent: ReceiptComponentType = {
    amount: 10,
    sourceType: 'Ingredient',
    source: ingredient,
  }
  const exists = selectedComponents.value.some(component => isSameReceiptComponent(component, receiptComponent));
  if (!exists) {
    selectedComponents.value.push(receiptComponent);
  }
};
const onSecretBaseSearchTableClick = (componentSummary: ComponentSummary) => {
  let secretBase = secretBaseStore.findById(componentSummary.getId()!);
  if (!secretBase) {
    throw new Error('SecretBase not found');
  }
  const receiptComponent: ReceiptComponentType = {
    amount: 10,
    sourceType: 'SecretBase',
    source: secretBase,
  }
  const exists = selectedComponents.value.some(component => isSameReceiptComponent(component, receiptComponent));
  if (!exists) {
    selectedComponents.value.push(receiptComponent);
  }
};

const onUpdateButtonClick = async () => {
  const request = {
    name: form.value.name,
    memo: form.value.memo,
    category: form.value.category,
    sellingPrice: form.value.sellingPrice,
    components: selectedComponents.value.map(it => ({
      amount: it.amount,
      sourceType: it.sourceType,
      sourceId: it.source.id,
    })),
  }

  await receiptStore.update(receiptPageStore.updateReceipt.id!, request);
  receiptPageStore.closeUpdateReceiptDialog();
}


const onRemoveSelectedComponentClick = (component: ReceiptComponentType) => {
  const index = selectedComponents.value.findIndex(it => isSameReceiptComponent(it, component));
  if (index !== -1) {
    selectedComponents.value.splice(index, 1);
  }
};

const summary = computed(() => {
  const componentSummary = new ComponentSummary();
  componentSummary.addReceiptComponents(selectedComponents.value);
  return componentSummary;
});

const onBeforeShow = () => {
  form.value.name = receiptPageStore.updateReceipt.name;
  form.value.memo = receiptPageStore.updateReceipt.memo || '';
  form.value.category = receiptPageStore.updateReceipt.category;
  form.value.sellingPrice = receiptPageStore.updateReceipt.sellingPrice;
  selectedComponents.value = receiptPageStore.updateReceipt.components;
};

</script>

