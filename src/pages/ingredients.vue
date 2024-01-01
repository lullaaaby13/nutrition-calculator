<template>
  <q-page class="full-width q-pa-xl">

    <div class="flex full-width q-mb-md">
      <span class="text-h4 text-bold">원재료</span>
    </div>

    <div class="row">
      <div class="col-6 q-gutter-md q-px-md">

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
              label="원재료 등록하기"
              @click="ingredientPageStore.showCreateIngredientDialog"
          />
        </div>
      </div>
    </div>

    <q-separator class="q-my-md full-width"/>

    <div class="q-gutter-md flex full-width">
      <IngredientCard
          v-for="ingredient in filteredIngredients" :key="ingredient.id"
          v-bind="ingredient"
      />
    </div>

    <CreateIngredientDialog v-model="ingredientPageStore.createIngredientDialog"/>
    <UpdateIngredientDialog
      v-model="ingredientPageStore.updateIngredientDialog"
    />

  </q-page>
</template>

<script setup>

import {computed, onMounted, ref} from 'vue';

import {useIngredientStore} from 'stores/ingredients';
import IngredientCard from 'components/apps/ingredients/IngredientCard.vue';
import CreateIngredientDialog from 'components/apps/ingredients/CreateIngredientDialog.vue';
import {useIngredientPageStore} from 'stores/pages/ingredients';
import UpdateIngredientDialog from 'components/apps/ingredients/UpdateIngredientDialog.vue';

const selectedCategoryOption = ref([]);
const searchText = ref('');

const ingredientPageStore = useIngredientPageStore();
const ingredientStore = useIngredientStore();

onMounted(() => {
  ingredientStore.fetchAll();
})

const filteredIngredients = computed(() => {
  let filtered = ingredientStore.ingredients;

  if (selectedCategoryOption.value.length > 0) {
    filtered = filtered
      .filter(ingredient =>
        selectedCategoryOption.value.some(categoryName => ingredient.category === categoryName)
      );
  }

  if (searchText.value) {
    filtered = filtered.filter(ingredient => ingredient.name.includes(searchText.value));
  }

  return filtered;
})



</script>

<route lang="yaml">
meta:
  layout: default
</route>
