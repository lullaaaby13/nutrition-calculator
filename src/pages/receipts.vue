<template>
    <q-page class="full-width flex justify-center" padding>
    <BaseCard flat bordered>
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">판매용 음료 & 디저트 레시피</div>
        <q-separator/>
      </q-card-section>

      <q-card-section class="flex justify-end q-px-lg q-gutter-lg">
        <q-input
          v-model="searchText"
          type="text"
          label="재료 찾기(재료명)"
          style="width: 300px"
          stack-label
        >
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-btn
          color="primary"
          label="재료 등록"
          @click="receiptPageStore.showCreateReceiptDialog"/>
      </q-card-section>
      <q-card-section class="q-gutter-md flex">
        <ReceiptCard v-for="(receipt, index) in receiptStore.receipts" :key="index"
                     :receipt="receipt"
        />
      </q-card-section>

    </BaseCard>

      <CreateReceiptCard v-model="receiptPageStore.createReceiptDialog"/>
  </q-page>
</template>

<script setup lang="ts">

import {ref} from 'vue';
import BaseCard from 'components/BaseCard.vue';
import {useReceiptPageStore} from 'stores/pages/receipt';
import {useReceiptStore} from 'stores/receipt';
import ReceiptCard from 'components/apps/receipts/ReceiptCard.vue';
import CreateReceiptCard from 'components/apps/receipts/CreateReceiptDialog.vue';

const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();
const searchText = ref('');



</script>

<route lang="yaml">
meta:
  layout: default
</route>

