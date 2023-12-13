<template>
  <router-view />
</template>

<script setup lang="ts">
import {useIngredientStore} from 'stores/ingredients';
import {useSecretBaseStore} from 'stores/secret-base';
import {onMounted} from 'vue';

let ingredientStore = useIngredientStore();
let secretBaseStore = useSecretBaseStore();

onMounted(async () => {
  await ingredientStore.refresh();
  await secretBaseStore.refresh();
});
</script>
