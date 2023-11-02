<template>
<!--  <q-page class="flex justify-center" padding style="width: 1080px;">-->
  <q-page class="full-width flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">
      <q-card-section>
        <div class="text-h5 q-my-sm">식재료 관리</div>
        <q-separator/>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" @click="registerDialog = true">등록하기</q-btn>
      </q-card-actions>
      <q-card-section class="flex q-gutter-md">
        <q-card class="q-pa-md" style="width: 300px;" v-for="ingredient in ingredients" :key="ingredient.name">
          <q-card-section class="text-weight-bold">
            {{ingredient.name}}
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="ingredient.carbohydrate"
              type="text"
              label="탄수화물(g)"
              readonly
            />
            <q-input
              v-model="ingredient.protein"
              type="text"
              label="단백질(g)"
              readonly
            />
            <q-input
              v-model="ingredient.fat"
              type="text"
              label="지방(g)"
              readonly
            />
            <q-input
              v-model="ingredient.unitPrice"
              type="text"
              label="100ml 당 단가(원)"
              readonly
            />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-dialog v-model="registerDialog">
      <q-card class="q-pa-md" style="width: 400px;">
        <q-card-section>
          <div class="text-h6">식재료 등록하기</div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <q-input
            v-model="registerName"
            class="q-my-sm"
            type="text"
            label="이름"
            dense
          />
          <q-input
            v-model="registerCarbohydrate"
            class="q-my-sm"
            type="text"
            label="탄수화물(g)"
            dense
          />
          <q-input
            v-model="registerProtein"
            class="q-my-sm"
            type="text"
            label="단백질(g)"
            dense
          />
          <q-input
            v-model="registerFat"
            class="q-my-sm"
            type="text"
            label="지방(g)"
            dense
          />
          <q-input
            v-model="registerUnitPrice"
            class="q-my-sm"
            type="text"
            label="100ml 당 단가(원)"
            dense
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="저장"
                 color="primary"
                 class="q-mr-md"
                 v-close-popup
                 @click="onRegisterButtonClick"
          />
          <q-btn label="취소" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDialog">
      <q-card class="q-pa-md" style="width: 250px;">
        <q-card-section class="text-center">
          <p>식재료가 등록 되었습니다.</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page></template>

<script setup>

import {ref} from "vue";

const item = ref({
  carbohydrate: 0,
  protein: 0,
  fat: 0,
});

const registerDialog = ref(false);
const confirmDialog = ref(false);


const ingredients = ref([
  {
    name: '우유',
    carbohydrate: 4.86,
    protein: 3.39,
    fat: 2.06,
    unitPrice: 260,
  },
  {
    name: '계란',
    carbohydrate: 1.1,
    protein: 13,
    fat: 11,
    unitPrice: 300,
  },
]);

const registerName = ref('');
const registerCarbohydrate = ref(0);
const registerProtein = ref(0);
const registerFat = ref(0);
const registerUnitPrice = ref(0);


const onRegisterButtonClick = () => {

  const ingredient = {
    name: registerName.value,
    carbohydrate: registerCarbohydrate.value,
    protein: registerProtein.value,
    fat: registerFat.value,
    unitPrice: registerUnitPrice.value,
  }
  ingredients.value.push(ingredient);
  initialize();
  // confirmDialog.value = true;
}

const initialize = () => {
  registerName.value = '';
  registerCarbohydrate.value = 0;
  registerProtein.value = 0;
  registerFat.value = 0;
  registerUnitPrice.value = 0;
}

</script>

<route lang="yaml">
meta:
  layout: default
</route>

