<template>
  <q-dialog :model-value="modelValue" @update:model-value="val => $emit('update:modelValue')">
    <q-card class="q-pa-md" style="width: 600px;">
      <q-card-section>
        <div class="text-h6">원재료 등록</div>
        <div class="text-caption">100g당</div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="row">
        <div class="col-6 q-px-sm">
          <q-select v-model="category" :options="Object.values(IngredientCategory)" label="카테고리"/>
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="name"
                   type="text"
                   label="이름"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="calories"
                   type="text"
                   label="칼로리(Kcal)"
                   :rule="[val => val < 0 || '0보다 커야 합니다.']"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="unitPrice"
                   type="text"
                   label="단가(원)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="carbohydrates"
                   type="text"
                   label="탄수화물(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="sugars"
                   type="text"
                   label="당류(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="protein"
                   type="text"
                   label="단백질(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="caffeine"
                   type="text"
                   label="카페인(mg)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="fat"
                   type="text"
                   label="지방(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="saturatedFat"
                   type="text"
                   label="포화지방(g)"
          />
        </div>

      </q-card-section>

      <!--        <q-separator/>-->

      <q-card-section>
        <q-input v-model="memo" type="textarea" label="메모"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="등록" color="primary" @click="onRegisterConfirmButtonClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="failRegisterIngredientDialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">등록 실패</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{errorMessage}}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

import {IngredientCategory} from "@/enum/ingredientCategory";
import {ref} from "vue";
import {useIngredientStore} from "stores/ingredients";

defineProps({
  modelValue: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue']);


const ingredientStore = useIngredientStore();

const category = ref(null);
const name = ref('');
const calories = ref(0);
const unitPrice = ref(0);
const carbohydrates = ref(0);
const sugars = ref(0);
const protein = ref(0);
const caffeine = ref(0);
const fat = ref(0);
const saturatedFat = ref(0);
const memo = ref('');

const initFields = () => {
  category.value = null;
  name.value = '';
  calories.value = 0;
  unitPrice.value = 0;
  carbohydrates.value = 0;
  sugars.value = 0;
  protein.value = 0;
  caffeine.value = 0;
  fat.value = 0;
  saturatedFat.value = 0;
  memo.value = '';
}


const onRegisterConfirmButtonClick = () => {
  const ingredient = {
    category: category.value,
    name: name.value,
    calories: calories.value,
    unitPrice: unitPrice.value,
    carbohydrates: carbohydrates.value,
    sugars: sugars.value,
    protein: protein.value,
    caffeine: caffeine.value,
    fat: fat.value,
    saturatedFat: saturatedFat.value,
    memo: memo.value,
  }

  if (!ingredient.name) {
    showErrorDialog('이름을 입력해 주세요');
    return;
  }
  if (!ingredient.category) {
    showErrorDialog('카테고리를 선택해 주세요.');
    return;
  }
  if (ingredientStore.existsByName(ingredient.name)) {
    showErrorDialog('같은 이름을 가진 원재료가 이미 등록 되어 있습니다.');
    return;
  }

  ingredientStore.save(ingredient);
  emit('update:modelValue', false);
  initFields();
}
const errorMessage = ref('');
const failRegisterIngredientDialog = ref(false);
const showErrorDialog = (message) => {
  errorMessage.value = message;
  failRegisterIngredientDialog.value = true;
}

</script>
