<template>
  <q-dialog :model-value="modelValue" @update:model-value="val => $emit('update:modelValue', val)">
    <q-card class="q-pa-md" style="width: 600px;">
      <q-card-section>
        <div class="text-h6">원재료 등록</div>
        <div class="text-caption">100g당</div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="row">
        <div class="col-6 q-px-sm">
          <q-select v-model="ingredient.category" :options="Object.values(IngredientCategory)" label="카테고리"/>
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.name"
                   type="text"
                   label="이름"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.calories"
                   type="text"
                   label="칼로리(Kcal)"
                   :rule="[val => val < 0 || '0보다 커야 합니다.']"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.unitPrice"
                   type="text"
                   label="단가(원)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.carbohydrates"
                   type="text"
                   label="탄수화물(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.sugars"
                   type="text"
                   label="당류(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.protein"
                   type="text"
                   label="단백질(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.caffeine"
                   type="text"
                   label="카페인(mg)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.fat"
                   type="text"
                   label="지방(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input v-model="ingredient.saturatedFat"
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
    </q-card>
  </q-dialog>
</template>

<script setup>

import {ref} from "vue";
import {IngredientCategory} from "@/enum/ingredientCategory";
import {useIngredientStore} from "stores/ingredients";

defineProps({
  modelValue: {
    type: Boolean
  },
})

const emit = defineEmits(['update:modelValue']); // 외부에서 주입한 이벤트 핸들러
const ingredientStore = useIngredientStore();

const ingredient = ref(ingredientStore.emptyIngredient());

const onRegisterConfirmButtonClick = () => {

  if (!ingredient.value.name) {
    alert('이름을 입력해 주세요');
    return;
  }
  if (!ingredient.value.category) {
    alert('카테고리를 선택해 주세요.');
    return;
  }
  if (ingredientStore.existsByName(ingredient.value.name)) {
    alert('같은 이름을 가진 원재료가 이미 등록 되어 있습니다.');
    return;
  }

  ingredientStore.save(ingredient.value);
  emit('update:modelValue', false);
  ingredient.value = ingredientStore.emptyIngredient();
}

</script>
