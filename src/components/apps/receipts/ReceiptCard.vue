<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ receipt.name }}</div>
        <div class="text-caption">{{ receipt.category.label }}</div>
        <AmountUnitPriceCaption :amount="receiptSummary.amount" :unit-price="receiptSummary.unitPrice"/>
      </div>
      <q-space/>
      <div class="q-gutter-md">
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
          @click="onDeleteButtonClick(receipt)"
        />
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="row">
        <div class="col-6" v-if="receipt.secretBases.length > 0">
          <div class="text-subtitle2 q-mb-sm">베이스</div>
          <q-list bordered>
            <q-item v-for="receiptComponent in receipt.secretBases" :key="receiptComponent.component.name">
              <q-item-section>
                <q-item-label>{{ receiptComponent.amount }}</q-item-label>
                <q-item-label caption lines="1">{{ receiptComponent.component.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-6" v-if="receipt.ingredients.length > 0">
          <div class="text-subtitle2 q-mb-sm">원재료</div>
          <q-list bordered>
            <q-item v-for="receiptComponent in receipt.ingredients" :key="receiptComponent.component.name">
              <q-item-section>
                <q-item-label>{{ receiptComponent.amount }}</q-item-label>
                <q-item-label caption lines="1">{{ receiptComponent.component.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <NutritionPanel
        :calories="receiptSummary.calories"
        :unitPrice="receiptSummary.unitPrice"
        :carbohydrates="receiptSummary.carbohydrates"
        :sugars="receiptSummary.sugars"
        :protein="receiptSummary.protein"
        :caffeine="receiptSummary.caffeine"
        :fat="receiptSummary.fat"
        :saturatedFat="receiptSummary.saturatedFat"
      />
    </q-card-section>

    <q-card-section>
      <div class="text-caption">메모</div>
      <div style="min-height: 60px;">{{ receipt.memo }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <CreateUpdateDate :createdAt="receipt.createdAt" :updatedAt="receipt.updatedAt"/>
    </q-card-section>

  </BaseCard>
</template>

<script setup lang="ts">

import {computed} from 'vue';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {ComponentSummary} from 'src/types/summary';
import {Receipt} from 'src/types/receipt';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';
import {useReceiptStore} from 'stores/receipt';
import {useReceiptPageStore} from 'stores/pages/receipt';
import CreateUpdateDate from 'components/CreateUpdateDate.vue';

const props = defineProps({
  receipt: {
    type: Receipt,
    required: true,
  }
});

const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();


const receiptSummary = computed(() => {
  let componentSummary = new ComponentSummary();
  componentSummary.addReceiptComponents(props.receipt.components)
  return componentSummary;
});

const onDeleteButtonClick = (receipt: Receipt) => {
  if (confirm('정말 삭제 하시겠어요?')) {
    receiptStore.delete(receipt);
  }
}

</script>
