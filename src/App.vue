<template>
  <router-view />
</template>

<script setup lang="ts">
import {useIngredientStore} from 'stores/ingredients';
import {useSecretBaseStore} from 'stores/secret-base';
import {onMounted} from 'vue';
import {useReceiptStore} from 'stores/receipt';

const ingredientStore = useIngredientStore();
const secretBaseStore = useSecretBaseStore();
const receiptStore = useReceiptStore();

onMounted(async () => {
  await ingredientStore.refresh();
  await secretBaseStore.refresh();
  await receiptStore.refresh();
});
</script>
