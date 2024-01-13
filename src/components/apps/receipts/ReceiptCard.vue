<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ receipt.name }}</div>
        <div class="flex q-gutter-x-md">
          <div class="text-subtitle2">{{ labelOfReceiptCategory(receipt.category) }}</div>
          <span class="text-subtitle2">중량: {{ Number(summary.getAmount()).toFixed(0) }}g</span>
        </div>
        <div class="flex q-gutter-x-md">
          <div class="text-caption">판매가: {{ Number(receipt.sellingPrice).toFixed(0) }}원</div>
          <div class="text-caption">단가: {{ Number(summary.getUnitPrice()).toFixed(0) }}원</div>
          <div class="text-caption">부가세: {{ vat }}원</div>
          <div class="text-caption">카드수수료: {{ cardFee }}원</div>
          <div class="text-caption">마진율: {{ (salesMargin * 100).toFixed(2) }}%</div>
        </div>
      </div>

      <q-space/>

      <div class="q-gutter-sm">
        <q-btn
          dense
          outline
          color="yellow-9"
          @click="onCopyButtonClick"
          icon="file_copy"
          flat
        />
        <q-btn
          dense
          outline
          color="secondary"
          @click="receiptPageStore.showUpdateReceiptDialog(receipt)"
          icon="edit"
          flat
        />
        <q-btn
          dense
          outline
          color="red"
          icon="delete"
          flat
          @click="onDeleteButtonClick(receipt.id!)"
        />
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="row">
        <div class="col-6" v-if="secretBases.length > 0">
          <div class="text-subtitle2 q-mb-sm">베이스</div>
          <q-list bordered>
            <q-item v-for="(receiptComponent, index) in secretBases" :key="index">
              <q-item-section>
                <q-item-label>{{ receiptComponent.amount }}</q-item-label>
                <q-item-label caption lines="1">{{ receiptComponent.secretBase.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-6" v-if="ingredients.length > 0">
          <div class="text-subtitle2 q-mb-sm">원재료</div>
          <q-list bordered>
            <q-item v-for="(receiptComponent, index) in ingredients" :key="index">
              <q-item-section>
                <q-item-label>{{ receiptComponent.amount }}</q-item-label>
                <q-item-label caption lines="1">{{ receiptComponent.ingredient.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <NutritionPanel v-bind="summary"/>
    </q-card-section>

    <q-card-section>
      <div class="text-caption">메모</div>
      <div style="min-height: 60px;">{{ receipt.memo }}</div>
    </q-card-section>

  </BaseCard>
</template>

<script setup lang="ts">

import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {CreateReceiptRequest, labelOfReceiptCategory, Receipt} from 'src/model/receipt';
import {useReceiptStore} from 'stores/receipt';
import {useReceiptPageStore} from 'stores/pages/receipt';
import {computed} from 'vue';
import {ComponentSummary} from 'src/model/summary';


const receipt = defineProps<Receipt>();

const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();


const secretBases = computed(() => {
  return receipt.components.filter(component => component.type === 'SECRET_BASE');
});

const ingredients = computed(() => {
  return receipt.components.filter(component => component.type === 'INGREDIENT');
});

const summary = computed(() => {
  let componentSummary = new ComponentSummary();
  componentSummary.addReceiptComponents(receipt.components);
  return componentSummary;
});

const vat = computed(() => {
  let sellingPrice = Number(receipt.sellingPrice);
  if (!sellingPrice || sellingPrice === 0) {
    return 0;
  }
  return sellingPrice * 0.1;
});
const cardFee = computed(() => {
  let sellingPrice = Number(receipt.sellingPrice);
  if (!sellingPrice || sellingPrice === 0) {
    return 0;
  }
  return sellingPrice * 0.011;
});

const salesMargin = computed(() => {
  let sellingPrice = Number(receipt.sellingPrice);
  if (!sellingPrice || sellingPrice === 0) {
    return 0;
  }
  const unitPrice = summary.value.getUnitPrice();
  const margin = sellingPrice - (Number(unitPrice) + vat.value + cardFee.value);
  return margin / sellingPrice;
});

const onDeleteButtonClick = async (id: number) => {
  if (confirm('정말 삭제 하시겠어요?')) {
    await receiptStore.remove(id);
  }
}

const onCopyButtonClick = async () => {
  if (confirm(`[${receipt.name}] 레시피를 복사합니다. 계속 할까요?`)) {
    const request: CreateReceiptRequest = {
      name: receipt.name,
      memo: receipt.memo,
      category: receipt.category,
      sellingPrice: receipt.sellingPrice,
      components: receipt.components.map(it => ({
        type: it.type,
        amount: it.amount,
        id: it.ingredient?.id || it.secretBase?.id!,
      }))
    };

    await receiptStore.save(request);
  }
}

</script>
