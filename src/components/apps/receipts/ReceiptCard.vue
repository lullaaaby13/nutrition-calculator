<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ receipt.name }}</div>
        <div class="flex q-gutter-x-md">
          <div class="text-subtitle2">{{ receipt.category.label }}</div>
          <span class="text-subtitle2">중량: {{ Number(summary.getAmount()).toFixed(0) }}g</span>
        </div>
        <div class="flex q-gutter-x-md">
          <div class="text-caption">판매가: {{ Number(receipt.sellingPrice).toFixed(0) }}원</div>
          <div class="text-caption">단가: {{ Number(summary.getUnitPrice()).toFixed(0) }}원</div>
          <div class="text-caption">마진율: {{ salesMargin.toFixed(2) * 100 }}%</div>
        </div>
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
            <q-item v-for="secretBase in secretBases" :key="secretBase.source.name">
              <q-item-section>
                <q-item-label>{{ secretBase.amount }}</q-item-label>
                <q-item-label caption lines="1">{{ secretBase.source.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-6" v-if="ingredients.length > 0">
          <div class="text-subtitle2 q-mb-sm">원재료</div>
          <q-list bordered>
            <q-item v-for="ingredient in ingredients" :key="ingredient.source.name">
              <q-item-section>
                <q-item-label>{{ ingredient.amount }}</q-item-label>
                <q-item-label caption lines="1">{{ ingredient.source.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
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

import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {ReceiptType} from 'src/types/receipt';
import {useReceiptStore} from 'stores/receipt';
import {useReceiptPageStore} from 'stores/pages/receipt';
import CreateUpdateDate from 'components/CreateUpdateDate.vue';
import {computed} from 'vue';
import {ComponentSummary} from 'src/types/summary';

const receipt = defineProps<ReceiptType>();
console.log(receipt);

const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();

const secretBases = computed(() => {
  return receipt.components.filter(component => component.sourceType === 'SecretBase');
});

const ingredients = computed(() => {
  return receipt.components.filter(component => component.sourceType === 'Ingredient');
});

const summary = computed(() => {
  let componentSummary = new ComponentSummary();
  componentSummary.addReceiptComponents(receipt.components);
  return componentSummary;
});

const salesMargin = computed(() => {
  let sellingPrice = Number(receipt.sellingPrice);
  if (!sellingPrice || sellingPrice === 0) {
    return 0;
  }

  return (sellingPrice - Number(summary.value.getUnitPrice())) / sellingPrice;
});

const onDeleteButtonClick = async (id: number) => {
  if (confirm('정말 삭제 하시겠어요?')) {
    await receiptStore.delete(id);
  }
}

</script>
