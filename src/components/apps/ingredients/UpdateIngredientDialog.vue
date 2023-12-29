<template>
  <q-dialog @before-show="onBeforeShow">
    <q-card class="q-pa-md" style="width: 600px;">
      <q-card-section class="flex justify-between">
        <div>
          <div class="text-h6">원재료 수정</div>
          <div class="text-caption">100g당</div>
        </div>
        <div class="q-gutter-md">
          <q-btn label="수정" color="primary" @click="onUpdateButtonClick"/>
          <q-btn label="취소" v-close-popup/>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="row">
        <div class="col-6 q-px-sm">
          <q-select v-model="category" :options="ingredientCategoryOptions" label="카테고리"/>
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.name"
                   type="text"
                   label="이름"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.calories"
                   type="text"
                   label="칼로리(Kcal)"
                   :rule="[val => val < 0 || '0보다 커야 합니다.']"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.unitPrice"
                   type="text"
                   label="단가(원)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.carbohydrates"
                   type="text"
                   label="탄수화물(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.sugar"
                   type="text"
                   label="당류(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.protein"
                   type="text"
                   label="단백질(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.caffeine"
                   type="text"
                   label="카페인(mg)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.fat"
                   type="text"
                   label="지방(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.saturatedFat"
                   type="text"
                   label="포화지방(g)"
          />
        </div>

      </q-card-section>


      <q-card-section>
        <q-input v-model="form.memo"
                 type="textarea"
                 label="메모"/>
      </q-card-section>


    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {
  IngredientCategory,
  IngredientCategoryOption,
  ingredientCategoryOptions,
  UpdateIngredientRequest
} from 'src/types/ingredient';
import {useIngredientStore} from 'stores/ingredients';
import {ref} from 'vue';
import {useIngredientPageStore} from 'stores/pages/ingredients';

// 외부에서 주입한 이벤트 핸들러
const ingredientStore = useIngredientStore();
const ingredientPageStore = useIngredientPageStore();

const category = ref<IngredientCategoryOption>(ingredientCategoryOptions[0]);

const form = ref<UpdateIngredientRequest>({
  category: IngredientCategory.fresh,
  name: '',
  calories: 0,
  unitPrice: 0,
  carbohydrates: 0,
  sugar: 0,
  fiber: 0,
  protein: 0,
  caffeine: 0,
  fat: 0,
  saturatedFat: 0,
  memo: '',
});

const onBeforeShow = () => {
  const updateIngredient = ingredientPageStore.updateIngredient;
  console.log('beforeShow: ', updateIngredient)

  category.value = ingredientCategoryOptions.find(option => option.value === updateIngredient.category) || ingredientCategoryOptions[0];
  form.value.name = updateIngredient.name;
  form.value.calories = updateIngredient.calories;
  form.value.unitPrice = updateIngredient.unitPrice;
  form.value.carbohydrates = updateIngredient.carbohydrates;
  form.value.sugar = updateIngredient.sugar;
  form.value.fiber = updateIngredient.fiber;
  form.value.protein = updateIngredient.protein;
  form.value.caffeine = updateIngredient.caffeine;
  form.value.fat = updateIngredient.fat;
  form.value.saturatedFat = updateIngredient.saturatedFat;
  form.value.memo = updateIngredient.memo;
};

const onUpdateButtonClick = async () => {

  const request: UpdateIngredientRequest = {
    name: form.value.name,
    memo: form.value.memo,
    unitPrice: form.value.unitPrice,
    calories: form.value.calories,
    protein: form.value.protein,
    fat: form.value.fat,
    carbohydrates: form.value.carbohydrates,
    sugar: form.value.sugar,
    fiber: form.value.fiber,
    caffeine: form.value.caffeine,
    saturatedFat: form.value.saturatedFat,
    category: category.value.value,
  }
  console.log(request)

  await ingredientStore.update(ingredientPageStore.updateIngredient.id, request);
  ingredientPageStore.closeUpdateIngredientDialog();
};

</script>
