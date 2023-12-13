<template>
  <q-page class="full-width q-pa-xl">

    <div class="flex full-width q-mb-md">
      <span class="text-h4 text-bold">레시피</span>
    </div>

    <div class="row full-width">
      <div class="col-6 q-gutter-md q-px-md">
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
import {ReceiptCategory} from 'src/types/receipt';

const receiptPageStore = useReceiptPageStore();
const receiptStore = useReceiptStore();
const searchText = ref('');


const selectedCategories = ref([]);

const filteredReceipts = computed(() => {
  let filtered = receiptStore.receipts;

  if (selectedCategories.value.length > 0) {
    filtered = filtered
        .filter(receipt =>
            selectedCategories.value.some(categoryName => receipt.category.name === categoryName)
        );
  }

  if (searchText.value) {
    filtered = filtered.filter(receipt => receipt.name.includes(searchText.value));
  }

  return filtered;
})

const resetCheckbox = () => {
  selectedCategories.value = [];
};

onMounted(async () => {
  await receiptStore.refresh();
});

</script>

<route lang="yaml">
meta:
  layout: default
</route>

