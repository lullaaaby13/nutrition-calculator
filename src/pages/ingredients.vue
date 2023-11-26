<template>
  <q-page class="full-width flex justify-center" padding>
    <BaseCard>
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">원재료 영양성분 & 단가</div>
        <q-separator/>
      </q-card-section>

      <q-card-section class="row">
        <div class="col-6 q-gutter-md q-px-md" style="border-right: 0.5px solid lightgrey;">
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.FRESH.name" :label="IngredientCategory.FRESH.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.FRUITS.name" :label="IngredientCategory.FRUITS.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.FLOUR.name" :label="IngredientCategory.FLOUR.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.COFFEE.name" :label="IngredientCategory.COFFEE.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.TOPPING.name" :label="IngredientCategory.TOPPING.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.ADDITIVES.name" :label="IngredientCategory.ADDITIVES.label"/>
          <q-checkbox size="md" v-model="selectedCategories" :val="IngredientCategory.PACKAGING.name" :label="IngredientCategory.PACKAGING.label"/>
          <q-btn
            rounded
            outline
            color="grey"
            label="선택 초기화"
            @click="resetCheckbox"
          />
        </div>

        <div class="col-3 q-px-md">
          <q-btn
            color="primary"
            label="원재료 등록하기"
            icon="create"
            padding="10px 15px 10px 10px"
            @click="onRegisterButtonClick"
          />
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="flex justify-end q-px-lg">
        <q-input
          v-model="searchText"
          type="text"
          label="재료 찾기(재료명)"
          stack-label
          style="width: 300px"
        >
          <template>

          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-md flex">
        <IngredientCard
          v-for="ingredient in filteredIngredients" :key="ingredient.name"
          :ingredient="ingredient"
          @openUpdateIngredientDialog="openUpdateIngredientDialog"
        />
      </q-card-section>

    </BaseCard>


    <RegisterIngredientDialog
      v-model="showRegisterIngredientDialog"
    />
    <UpdateIngredientDialog
      v-model="showUpdateIngredientDialog"
      :ingredient="selectedIngredient"
      @update:ingredient="updateSelectedIngredient"
    />

  </q-page>
</template>

<script setup>

import {computed, ref} from "vue";
import {IngredientCategory} from "@/enum/ingredientCategory";
import {useIngredientStore} from "stores/ingredients";
import IngredientCard from "components/apps/ingredients/IngredientCard.vue";
import RegisterIngredientDialog from "components/apps/ingredients/RegisterIngredientDialog.vue";
import UpdateIngredientDialog from "components/apps/ingredients/UpdateIngredientDialog.vue";
import BaseCard from "components/BaseCard.vue";

/**
 * 필터링
 */
const selectedCategories = ref([]);
const searchText = ref('');

const toggle = ref(false);



const ingredientStore = useIngredientStore();
const ingredients = ingredientStore.ingredients;

const filteredIngredients = computed(() => {
  let filtered = ingredients;

  if (selectedCategories.value.length > 0) {
    filtered = filtered
      .filter(ingredient =>
        selectedCategories.value.some(categoryName => ingredient.category.name === categoryName)
      );
  }

  if (searchText.value) {
    filtered = filtered
      .filter(ingredient =>
        ingredient.name.includes(searchText.value)
      );
  }

  return filtered;
})

const resetCheckbox = () => {
  selectedCategories.value = [];
}

const selectedIngredient = ref(null);
const setSelectedIngredient = val => {
  selectedIngredient.value = val;
}
const updateSelectedIngredient = ({ field, value }) => {
  selectedIngredient.value[field] = value;
}

const showRegisterIngredientDialog = ref(false);
const showUpdateIngredientDialog = ref(false);
const onRegisterButtonClick = () => {
  showRegisterIngredientDialog.value = true;
}
const openUpdateIngredientDialog = ingredient => {
  showUpdateIngredientDialog.value = true;
  selectedIngredient.value = ingredient;
}

</script>

<route lang="yaml">
meta:
  layout: default
</route>
