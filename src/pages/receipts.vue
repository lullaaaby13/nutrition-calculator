<template>
  <q-page class="full-width q-pa-xl">

    <div class="flex full-width q-mb-md">
      <span class="text-h4 text-bold">레시피</span>
    </div>

    <div class="row full-width">
      <div class="col-3 q-px-md">
        <q-select
          v-model="selectedCategories"
          multiple
          :options="receiptCategoryOptions"
          label="카테고리"
          stack-label
          outlined
        />
      </div>
      <div class="col-9">
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
    </div>

    <q-separator class="q-my-md full-width"/>

    <div class="q-gutter-md flex full-width">
      <ReceiptCard v-for="(receipt, index) in filteredReceipts" :key="index"
                   :id="receipt.id"
                   :name="receipt.name"
                   :memo="receipt.memo"
                   :category="receipt.category"
                   :selling-price="receipt.sellingPrice"
                   :components="receipt.components"
                   :created-at="receipt.createdAt"
                   :updated-at="receipt.updatedAt"
      />
    </div>

    <CreateReceiptCard v-model="receiptPageStore.createReceiptDialog"/>
    <UpdateReceiptDialog v-model="receiptPageStore.updateReceiptDialog"/>

  </q-page>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from 'vue';
import {useReceiptPageStore} from 'stores/pages/receipt';
import {useReceiptStore} from 'stores/receipt';
import ReceiptCard from 'components/apps/receipts/ReceiptCard.vue';
import CreateReceiptCard from 'components/apps/receipts/CreateReceiptDialog.vue';
import UpdateReceiptDialog from 'components/apps/receipts/UpdateReceiptDialog.vue';
import {ReceiptCategoryOption, receiptCategoryOptions} from 'src/model/receipt';

const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();
const searchText = ref('');

const selectedCategories = ref<ReceiptCategoryOption[]>([]);

const filteredReceipts = computed(() => {
  let filtered = receiptStore.receipts;

  if (selectedCategories.value.length > 0) {
    filtered = filtered
        .filter(receipt =>
            selectedCategories.value.some(option => receipt.category === option.value)
        );
  }

  if (searchText.value) {
    filtered = filtered.filter(receipt => receipt.name.includes(searchText.value));
  }

  return filtered;
})

onMounted(async () => {
  await receiptStore.refresh();
});

</script>

<route lang="yaml">
meta:
  layout: default
</route>

