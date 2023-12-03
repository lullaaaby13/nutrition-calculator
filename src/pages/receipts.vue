<template>
  <q-page class="full-width flex justify-center" padding>
    <BaseCard flat bordered>
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">판매용 음료 & 디저트 레시피</div>
      </q-card-section>

      <q-card-section class="row">
          <div class="col-6">
              <div class="q-gutter-x-md">
                  <template v-for="(category, index) in Object.values(ReceiptCategory)" :key="index">
                      <q-checkbox size="md" v-model="selectedCategories" :val="category.name" :label="category.label"/>
                  </template>
              </div>
              <div>
                  <q-btn color="grey"
                         label="선택 초기화"
                         @click="resetCheckbox"
                  />
              </div>
          </div>
          <div class="col-6">
              <div class="flex justify-end q-px-lg q-gutter-lg">
                  <q-input
                          v-model="searchText"
                          type="text"
                          label="재료 찾기(재료명)"
                          style="width: 300px"
                          stack-label
                          dense
                  >
                      <template v-slot:append>
                          <q-icon name="search"/>
                      </template>
                  </q-input>
                  <q-btn
                          color="primary"
                          label="레시피 등록하기"
                          @click="receiptPageStore.showCreateReceiptDialog"/>
              </div>
          </div>
      </q-card-section>

        <q-separator class="q-my-md"/>

      <q-card-section class="q-gutter-md flex">
        <ReceiptCard v-for="(receipt, index) in receiptStore.receipts" :key="index"
                     :receipt="receipt"
        />
      </q-card-section>

    </BaseCard>

    <CreateReceiptCard v-model="receiptPageStore.createReceiptDialog"/>
    <UpdateReceiptDialog v-model="receiptPageStore.updateReceiptDialog"/>

  </q-page>
</template>

<script setup lang="ts">

import {ref} from 'vue';
import BaseCard from 'components/BaseCard.vue';
import {useReceiptPageStore} from 'stores/pages/receipt';
import {useReceiptStore} from 'stores/receipt';
import ReceiptCard from 'components/apps/receipts/ReceiptCard.vue';
import CreateReceiptCard from 'components/apps/receipts/CreateReceiptDialog.vue';
import UpdateReceiptDialog from 'components/apps/receipts/UpdateReceiptDialog.vue';
import {ReceiptCategory} from 'src/types/receipt';

const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();
const searchText = ref('');


const selectedCategories = ref([]);

const resetCheckbox = () => {
  selectedCategories.value = [];
};

</script>

<route lang="yaml">
meta:
layout: default
</route>

