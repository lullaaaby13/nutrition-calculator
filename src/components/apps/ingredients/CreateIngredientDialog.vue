<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <BaseCard class="q-pa-md" style="width: 600px;">
      <q-card-section>
        <div class="text-h6">원재료 등록</div>
        <div class="text-caption">100g당</div>
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
                   rules=""
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
          <q-input v-model="form.sugars"
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
        <q-input v-model="memo" type="textarea" label="메모"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="등록" color="primary" @click="onRegisterConfirmButtonClick"/>
      </q-card-actions>
    </BaseCard>
  </q-dialog>
</template>

<script setup>

import {ref} from 'vue';
import {useIngredientStore} from 'stores/ingredients';
import Ingredient, {IngredientCategory} from 'src/types/ingredient';
import {useIngredientPageStore} from 'stores/pages/ingredient';
import BaseCard from 'components/BaseCard.vue';

const ingredientPageStore = useIngredientPageStore();
const ingredientStore = useIngredientStore();
//const { createIngredientDialog } = ingredientPageStore;

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
});
defineEmits([ 'update:modelValue' ]);

const createEmptyForm = () => ({
  category: null,
  name: '',
  calories: 0,
  unitPrice: 0,
  carbohydrates: 0,
  sugars: 0,
  protein: 0,
  caffeine: 0,
  fat: 0,
  saturatedFat: 0,
  memo: '',
});

const form = ref(createEmptyForm());


const onRegisterConfirmButtonClick = () => {
  try {
    const ingredient = new Ingredient(form.value.name, form.value.category);
    console.log(ingredient);
    ingredientStore.save(ingredient);
    form.value = createEmptyForm();
  } catch(e) {
    alert(e.message);
  }

}

</script>
