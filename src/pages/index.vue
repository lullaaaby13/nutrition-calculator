<template>
  <q-page class="full-width full-height flex justify-center q-pa-xl">
    <div class="flex justify-around items-center q-gutter-lg">

      <BaseCard style="width: 400px; height: 400px;">
        <div class="text-h6">원재료</div>
        <q-separator class="q-my-sm"/>
        <q-card-section>
          <q-list bordered>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>{{ ingredientSummary.fresh || '0' }}</q-item-label>
                <q-item-label caption lines="1">신선 식품</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ ingredientSummary.fruit || '0' }}</q-item-label>
                <q-item-label caption lines="1">과일 & 채소</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>{{ ingredientSummary.flour || '0' }}</q-item-label>
                <q-item-label caption lines="1">가루류 & 곡류</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ ingredientSummary.coffee || '0' }}</q-item-label>
                <q-item-label caption lines="1">커피 원두 & 차</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>{{ ingredientSummary.topping || '0' }}</q-item-label>
                <q-item-label caption lines="1">토핑 재료</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ ingredientSummary.additives || '0' }}</q-item-label>
                <q-item-label caption lines="1">식품 첨가물</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>{{ ingredientSummary.packaging || '0' }}</q-item-label>
                <q-item-label caption lines="1">포장 용품</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </BaseCard>

      <BaseCard style="width: 400px; height: 400px;">
        <div class="text-h6">시크릿 베이스</div>
        <q-separator class="q-my-sm"/>
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label>{{ secretBaseStore.secretBases.length || '0' }}</q-item-label>
                <q-item-label caption lines="1">시크릿 베이스</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </BaseCard>


      <BaseCard style="width: 400px; height: 400px;">
        <div class="text-h6">레시피</div>
        <q-separator class="q-my-sm"/>
        <q-card-section>
          <q-list bordered>
            <q-item v-for="(entry, index) in Object.entries(receiptSummaries)" :key="index">
              <q-item-section>
                <q-item-label>{{entry[1]}}</q-item-label>
                <q-item-label caption lines="1">{{ labelOfReceiptCategory(entry[0]) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </BaseCard>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import BaseCard from 'components/BaseCard.vue';
import {useIngredientStore} from 'stores/ingredients';
import {computed} from 'vue';
import {useSecretBaseStore} from 'stores/secret-base';
import {useReceiptStore} from 'stores/receipt';
import {labelOfReceiptCategory} from "../model/receipt";


const ingredientStore = useIngredientStore();
const secretBaseStore = useSecretBaseStore();
const receiptStore = useReceiptStore();

const ingredientSummary = computed(() => {
  return ingredientStore.ingredients.reduce((acc, cur) => {
    // @ts-ignore
    acc[cur.category] = acc[cur.category] + 1 || 1;
    return acc;
  }, {
    fresh: 0,
    fruit: 0,
    flour: 0,
    coffee: 0,
    topping: 0,
    additives: 0,
    packaging: 0,
  });
});

const receiptSummaries = computed(() => {
  return receiptStore.receipts.reduce((acc, cur) => {
    // @ts-ignore
    acc[cur.category] = acc[cur.category] + 1 || 1;
    return acc;
  }, {
    coffee: 0,
    tea: 0,
    bread: 0,
    beverage: 0,
    shavedIce: 0,
    other: 0,
  });
});

</script>

<route lang="yaml">
meta:
  layout: default
</route>
