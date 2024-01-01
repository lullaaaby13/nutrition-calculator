<template>
  <q-dialog>
    <BaseCard class="q-pa-md" style="width: 680px;">
      <q-card-section class="flex justify-between">
        <div>
          <div class="text-h6">원재료 등록</div>
          <div class="text-caption">100g당</div>
        </div>
        <div class="q-gutter-md">
          <q-btn label="등록" color="primary" @click="onRegisterConfirmButtonClick"/>
          <q-btn label="취소" v-close-popup/>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="row q-gutter-y-sm">
        <div class="col-4 q-px-sm">
          <q-select v-model="category"
                    :options="ingredientCategoryOptions"
                    label="카테고리"
                    stack-label
                    outlined
          />
        </div>
        <div class="col-4 q-px-sm">
          <q-input v-model="form.name"
                   type="text"
                   label="이름"
                   stack-label
                   outlined
          />
        </div>
        <div class="col-4 q-px-sm">
          <q-input v-model="form.unitPrice"
                   type="number"
                   label="단가(원)"
                   stack-label
                   outlined
          />
        </div>

        <q-separator/>

        <div class="col-6 q-px-sm">
          <q-input v-model="form.calories"
                   type="number"
                   label="칼로리(Kcal)"
                   stack-label
                   outlined
          />
        </div>

        <div class="col-6 q-px-sm">
          <q-input v-model="form.carbohydrates"
                   type="number"
                   label="탄수화물(g)"
                   stack-label
                   outlined
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.sugar"
                   type="number"
                   label="당류(g)"
                   stack-label
                   outlined
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.fiber"
                   type="number"
                   label="식이섬유(g)"
                   stack-label
                   outlined
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.fat"
                   type="number"
                   label="지방(g)"
                   stack-label
                   outlined
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.saturatedFat"
                   type="number"
                   label="포화지방(g)"
                   stack-label
                   outlined
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.protein"
                   type="number"
                   label="단백질(g)"
                   stack-label
                   outlined
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="form.caffeine"
                   type="number"
                   label="카페인(mg)"
                   stack-label
                   outlined
          />
        </div>

      </q-card-section>

      <q-card-section>
        <q-input v-model="form.memo"
                 type="textarea"
                 label="메모"
                 stack-label
                 outlined
        />
      </q-card-section>

    </BaseCard>
  </q-dialog>
</template>

<script setup lang="ts">

import {ref} from 'vue';
import {useIngredientStore} from 'stores/ingredients';
import {
  CreateIngredientRequest,
  IngredientCategory,
  IngredientCategoryOption,
  ingredientCategoryOptions
} from 'src/model/ingredient';
import {useIngredientPageStore} from 'stores/pages/ingredients';
import BaseCard from 'components/BaseCard.vue';

const ingredientPageStore = useIngredientPageStore();
const ingredientStore = useIngredientStore();

const category = ref<IngredientCategoryOption>(ingredientCategoryOptions[0]);
const createEmptyForm = (): CreateIngredientRequest => ({
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

const form = ref<CreateIngredientRequest>(createEmptyForm());


const onRegisterConfirmButtonClick = async () => {

  const request: CreateIngredientRequest = {
    name: form.value.name,
    memo: form.value.memo,
    unitPrice: Number(form.value.unitPrice),
    calories: Number(form.value.calories),
    protein: Number(form.value.protein),
    fat: Number(form.value.fat),
    carbohydrates: Number(form.value.carbohydrates),
    sugar: Number(form.value.sugar),
    fiber: Number(form.value.fiber),
    caffeine: Number(form.value.caffeine),
    saturatedFat: Number(form.value.saturatedFat),
    category: category.value.value,
  }

  await ingredientStore.save(request);
  form.value = createEmptyForm();
  ingredientPageStore.closeCreateIngredientDialog();
}

</script>
