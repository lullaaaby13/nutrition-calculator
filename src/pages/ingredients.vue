<template>
  <!--  <q-page class="flex justify-center" padding style="width: 1080px;">-->
  <q-page class="full-width flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">
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
            dense
            outline
            color="grey"
            label="선택 초기화"
            @click="resetCheckbox"
            icon="refresh"
            padding="8px 12px 8px 12px"
          />
        </div>
<!--        <div class="col-3 q-px-md" style="border-right: 0.5px solid lightgrey;">-->
<!--          <q-toggle-->
<!--            v-model="toggle"-->
<!--            color="green"-->
<!--          />-->
<!--          <span class="text-caption">1g 당</span>-->
<!--        </div>-->
        <div class="col-3 q-px-md">
          <q-btn
            padding="8px 12px 8px 12px"
            color="primary"
            text-color="white"
            @click="registerIngredientDialog = true"
          >
            <q-icon name="create" class="q-mr-xs"/>
           <span>원재료 등록하기</span>
          </q-btn>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="flex justify-end q-px-lg">
        <q-input
          v-model="searchText"
          type="text"
          label="재료 찾기(재료명)"
          style="width: 300px"
          stack-label
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-md flex">
        <IngredientCard v-for="ingredient in filteredIngredients" :key="ingredient.name"
                        :ingredient="ingredient"
                        @on-update-button-click="onIngredientUpdateButtonClick"
                        @on-delete-button-click="onIngredientDeleteButtonClick"
        />
      </q-card-section>

    </q-card>

    <RegisterIngredientDialog v-model="registerIngredientDialog"/>
    <UpdateIngredientDialog
        v-model="updateIngredientDialog"
        :ingredient="selectedIngredient"
        @update:ingredient="updateSelectedIngredient"
    />
  </q-page>
</template>

<script setup>

import {computed, ref} from "vue";
import {IngredientCategory} from "@/enum/ingredientCategory";
import {useIngredientStore} from "stores/ingredients";
import RegisterIngredientDialog from "components/ingredients/RegisterIngredientDialog.vue";
import UpdateIngredientDialog from "components/ingredients/UpdateIngredientDialog.vue";
import IngredientCard from "components/apps/ingredients/IngredientCard.vue";

/**
 * 필터링
 */
const selectedCategories = ref([]);
const searchText = ref('');

const toggle = ref(false);
const configDelete = ref(false);

const registerIngredientDialog = ref(false);
const updateIngredientDialog = ref(false);

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
const updateSelectedIngredient = ({ field, value }) => {
  selectedIngredient.value[field] = value;
  selectedIngredient.value.updatedAt = new Date();
}
const onIngredientUpdateButtonClick = ingredient => {
  updateIngredientDialog.value = true;
  selectedIngredient.value = ingredient;
}
const onIngredientDeleteButtonClick = ingredient => {
  if (confirm(`정말 ${ingredient.name}를 삭제 하시겠어요?`)) {
    ingredientStore.delete(ingredient);
  }
}


</script>

<route lang="yaml">
meta:
  layout: default
</route>

