<template>
  <q-dialog>
    <BaseCard class="q-pa-md" style="width: 600px;">
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

      <q-card-section class="row">
        <div class="col-6 q-px-sm">
          <q-select v-model="form.category" :options="Object.values(IngredientCategory)" label="카테고리"/>
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
          <div class="col-6 q-px-sm">
            <q-input v-model="form.fiber"
                     type="text"
                     label="식이섬유(g)"
            />
          </div>
        </div>

      </q-card-section>

      <q-card-section>
        <q-input v-model="form.memo" type="textarea" label="메모"/>
      </q-card-section>

    </BaseCard>
  </q-dialog>
</template>

<script setup lang="ts">

import {ref} from 'vue';
import {useIngredientStore} from 'stores/ingredients';
import {IngredientCategory} from 'src/types/ingredient';
import {useIngredientPageStore} from 'stores/pages/ingredients';
import BaseCard from 'components/BaseCard.vue';

const ingredientPageStore = useIngredientPageStore();
const ingredientStore = useIngredientStore();

const createEmptyForm = () => ({
  category: IngredientCategory.FRESH,
  name: '',
  calories: 0,
  unitPrice: 0,
  carbohydrates: 0,
  sugar: 0,
  protein: 0,
  caffeine: 0,
  fat: 0,
  saturatedFat: 0,
  fiber: 0,
  memo: '',
});

const form = ref(createEmptyForm());


const onRegisterConfirmButtonClick = async () => {

  const ingredient = {
    name: form.value.name,
    category: form.value.category,
    calories: Number(form.value.calories),
    unitPrice: Number(form.value.unitPrice),
    carbohydrates: Number(form.value.carbohydrates),
    sugar: Number(form.value.sugar),
    protein: Number(form.value.protein),
    caffeine: Number(form.value.caffeine),
    fat: Number(form.value.fat),
    saturatedFat: Number(form.value.saturatedFat),
    fiber: Number(form.value.fiber),
    memo: form.value.memo
  }

  console.log(ingredient)
  await ingredientStore.save(ingredient);
  form.value = createEmptyForm();
  ingredientPageStore.closeCreateIngredientDialog();
}

</script>
