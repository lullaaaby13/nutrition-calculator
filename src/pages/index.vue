<template>
  <q-page class="full-width full-height flex justify-center" padding>
    <BaseCard class="q-pa-md" style="width: 80vw;">
      <q-card-section class="flex justify-around items-center">
        <BaseCard :flat="false" style="width: 400px; height: 400px;">
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


        <BaseCard :flat="false" style="width: 400px; height: 400px;">
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


        <BaseCard :flat="false" style="width: 400px; height: 400px;">
          <div class="text-h6">판매용 음료 & 디저트</div>
          <q-separator class="q-my-sm"/>
          <q-card-section>
            <q-list bordered>
              <q-item v-for="(entry, index) in Object.entries(receiptSummaries)" :key="index">
                <q-item-section>
                  <q-item-label>{{entry[1]}}</q-item-label>
                  <q-item-label caption lines="1">{{entry[0]}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </BaseCard>

      </q-card-section>
    </BaseCard>
  </q-page>
</template>

<script setup lang="ts">
import BaseCard from 'components/BaseCard.vue';
import {useIngredientStore} from 'stores/ingredients';
import {computed} from 'vue';
import {useSecretBaseStore} from 'stores/secret-base';
import {useReceiptStore} from 'stores/receipt';

const ingredientStore = useIngredientStore();
const secretBaseStore = useSecretBaseStore();
const receiptStore = useReceiptStore();

const ingredientSummary = computed(() => {
  return ingredientStore.ingredients.reduce((acc, cur) => {
    acc[cur.category.name] = acc[cur.category.name] + 1 || 1;
    return acc;
  }, {})
});


const receiptSummaries = computed(() => {
  return receiptStore.receipts.reduce((acc, cur) => {
    acc[cur.category.label] = acc[cur.category.label] + 1 || 1;
    return acc;
  }, {});
});


</script>

<route lang="yaml">
meta:
layout: default
</route>
