<template>
  <q-dialog :model-value="modelValue" @update:model-value="val => $emit('update:modelValue')">
    <q-card class="q-pa-md" style="width: 600px;">
      <q-card-section>
        <div class="text-h6">원재료 수정</div>
        <div class="text-caption">100g당</div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="row">
        <div class="col-6 q-px-sm">
          <q-select v-model="category" :options="Object.values(IngredientCategory)" label="카테고리"/>
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="ingredient.name"
                   @update:model-value="value => $emit('update:ingredient', { field: 'name', value })"
                   type="text"
                   label="이름"
                   stack-label
          />
        </div>
        <div class="col-6 q-px-sm" v-for="field in fields" :key="field.value">
          <q-input :model-value="ingredient[field.value]"
                   @update:model-value="value => $emit('update:ingredient', { field: field.value, value })"
                   type="text"
                   :label="field.label"
                   stack-label
          />
        </div>
      </q-card-section>

      <!--        <q-separator/>-->

      <q-card-section>
        <q-input :model-value="ingredient.memo"
                 @update:model-value="value => $emit('update:ingredient', { field: 'memo', value })"
                 type="textarea"
                 label="메모"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="등록" color="primary" @click="onRegisterConfirmButtonClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

import {IngredientCategory} from "@/enum/ingredientCategory";
import {ref} from "vue";
import {useIngredientStore} from "stores/ingredients";
import {Notify} from "quasar";

const ingredientStore = useIngredientStore();

defineProps({
  modelValue: {
    type: Boolean
  },
  ingredient: {
    type: Object,
  },
})

defineEmits([
  'update:modelValue',
  'update:ingredient',
]);

const fields = [
  {value: 'calories', label: '칼로리(Kcal)',},
  {value: 'unitPrice', label: '단가(원)',},
  {value: 'carbohydrates', label: '탄수화물(g)',},
  {value: 'sugars', label: '당류(g)',},
  {value: 'protein', label: '단백질(g)',},
  {value: 'caffeine', label: '카페인(mg)',},
  {value: 'fat', label: '지방(g)',},
  {value: 'saturatedFat', label: '포화지방(g)',},
];

const onRegisterConfirmButtonClick = () => {
  throw new Error('test error')
}

// const onNameChange = val => {
//   console.log(val)
//   ingredientStore.existsByName(val);
// }

</script>
