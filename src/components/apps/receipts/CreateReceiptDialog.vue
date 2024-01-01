<template>
  <q-dialog full-width full-height
            @before-hide="onBeforeHide"
  >
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
          <IngredientSearchTable @onIngredientClick="onIngredientSearchTableClick" />
          <SecretBaseSearchTable @onSecretBaseClick="onSecretBaseSearchTableClick" />
        </div>

        <div class="col-4 q-px-md">
          <BaseCard class="q-gutter-y-sm" width="30vw">
            <div class="row">
              <div class="col-4 q-pr-md">
                <q-select v-model="form.category"
                          :options="receiptCategoryOptions"
                          label="카테고리"
                          stack-label
                          outlined
                />
              </div>
              <div class="col-4 q-pr-md">
                <q-input v-model="form.name"
                         type="text"
                         label="이름"
                         stack-label
                         outlined
                />
              </div>
              <div class="col-4">
                <q-input v-model="form.sellingPrice"
                         type="number"
                         label="희망 판매가(원)"
                         stack-label
                         outlined
                />
              </div>
            </div>

            <AmountUnitPriceCaption :amount="summary.amount" :unit-price="summary.unitPrice"/>

            <q-card-section v-if="selectedComponents.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                재료
              </div>
              <q-list>
                <q-item v-for="(component, index) in selectedComponents" :key="index">
                  <q-item-section>
                    <q-input type="number"
                             v-model="component.amount"
                             :label="component.ingredient?.name || component.secretBase?.name || ''"
                             stack-label
                             outlined
                    >
                      <q-icon name="close" size="12px" @click="onRemoveSelectedComponentClick(component)"/>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>
              <NutritionPanel v-bind="summary"/>
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
import {Ingredient} from 'src/model/ingredient';
import IngredientSearchTable from 'components/apps/secret-base/IngredientSearchTable.vue';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';
import {ComponentSummary} from 'src/model/summary';
import SecretBaseSearchTable from 'components/apps/receipts/SecretBaseSearchTable.vue';
import {
  CreateReceiptRequest,
  isSameReceiptComponent,
  ReceiptCategory, ReceiptCategoryOption,
  receiptCategoryOptions,
  ReceiptComponent
} from 'src/model/receipt';
import {useReceiptStore} from 'stores/receipt';
import {useReceiptPageStore} from 'stores/pages/receipt';
import {useSecretBaseStore} from 'stores/secret-base';
import {SecretBase} from "src/model/secret-base";


const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();

const createEmptyForm = () => {
  return {
    name: '',
    memo: '',
    category: receiptCategoryOptions[0],
    sellingPrice: 0,
  };
};
const form = ref(createEmptyForm());
const selectedComponents = ref<ReceiptComponent[]>([]);

const onIngredientSearchTableClick = (ingredient: Ingredient) => {
  const receiptComponent: ReceiptComponent = {
    type: 'INGREDIENT',
    amount: 10,
    ingredient: ingredient,
  }
  const exists = selectedComponents.value.some(component => isSameReceiptComponent(component, receiptComponent));
  if (!exists) {
    selectedComponents.value.push(receiptComponent);
  }
};
const onSecretBaseSearchTableClick = (secretBase: SecretBase) => {

  const receiptComponent: ReceiptComponent = {
    type: 'SECRET_BASE',
    amount: 10,
    secretBase
  }
  const exists = selectedComponents.value.some(component => isSameReceiptComponent(component, receiptComponent));
  if (!exists) {
    selectedComponents.value.push(receiptComponent);
  }
};
const onRemoveSelectedComponentClick = (component: ReceiptComponent) => {
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

const onCreateButtonClick = async () => {

  const request: CreateReceiptRequest = {
    name: form.value.name,
    memo: form.value.memo,
    category: form.value.category.value,
    sellingPrice: form.value.sellingPrice,
    components: selectedComponents.value.map(it => ({
      type: it.type,
      amount: it.amount,
      id: it.secretBase?.id || it.ingredient?.id || -1,
    })),
  };

  await receiptStore.save(request);

  receiptPageStore.closeCreateReceiptDialog();
};

const onBeforeHide = () => {
  form.value = createEmptyForm();
  selectedComponents.value.splice(0, selectedComponents.value.length);
}

</script>

