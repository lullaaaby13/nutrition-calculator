<template>
  <q-page class="full-width q-pa-xl">

    <div class="flex full-width q-mb-md">
      <span class="text-h4 text-bold">원재료</span>
    </div>

    <div class="row">
      <div class="col-6 q-gutter-md q-px-md">
        <div class="q-gutter-x-md">
          <template v-for="(category, index) in Object.values(IngredientCategory)" :key="index">
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
              label="원재료 등록하기"
              padding="10px 15px 10px 10px"
              @click="ingredientPageStore.showCreateIngredientDialog"
          />
        </div>
      </div>
    </div>

    <q-separator class="q-my-md full-width"/>

    <div class="q-gutter-md flex full-width">
      <IngredientCard
          v-for="ingredient in filteredIngredients" :key="ingredient.id"
          :id="ingredient.id"
          :name="ingredient.name"
          :category="ingredient.category"
          :unitPrice="ingredient.unitPrice"
          :calories="ingredient.calories"
          :carbohydrates="ingredient.carbohydrates"
          :sugars="ingredient.sugars"
          :protein="ingredient.protein"
          :caffeine="ingredient.caffeine"
          :fat="ingredient.fat"
          :saturatedFat="ingredient.saturatedFat"
          :memo="ingredient.memo"
          :createdAt="ingredient.createdAt"
          :updatedAt="ingredient.updatedAt"
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
import {IngredientCategory} from 'src/types/ingredient';
import {useIngredientPageStore} from 'stores/pages/ingredients';
import UpdateIngredientDialog from 'components/apps/ingredients/UpdateIngredientDialog.vue';

/**
 * 필터링
 */
const selectedCategories = ref([]);
const searchText = ref('');

const ingredientPageStore = useIngredientPageStore();
const ingredientStore = useIngredientStore();

const filteredIngredients = computed(() => {
  let filtered = ingredientStore.ingredients;

  if (selectedCategories.value.length > 0) {
    filtered = filtered
      .filter(ingredient =>
        selectedCategories.value.some(categoryName => ingredient.category.name === categoryName)
      );
  }

  if (searchText.value) {
    filtered = filtered.filter(ingredient => ingredient.name.includes(searchText.value));
  }

  return filtered;
})

const resetCheckbox = () => {
  selectedCategories.value = [];
}

onMounted(() => {
  ingredientStore.refresh();
})

</script>

<route lang="yaml">
meta:
  layout: default
</route>
