<template>
  <q-dialog :model-value="modelValue"
            @update:model-value="val => $emit('update:modelValue', val)"
            @before-show="onBeforeShow"
            @before-hide="onBeforeHide">
    <q-card class="q-pa-md" style="width: 600px;">
      <q-card-section>
        <div class="text-h6">원재료 수정</div>
        <div class="text-caption">100g당</div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="row">
        <div class="col-6 q-px-sm">
          <q-select :model-value="updateIngredient.category"
                    @update:model-value="value => $emit('update:ingredient', { field: 'category', value })"
                    :options="Object.values(IngredientCategory)"
                    label="카테고리"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.name"
                   @update:model-value="value => $emit('update:ingredient', { field: 'name', value })"
                   type="text"
                   label="이름"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.calories"
                  @update:model-value="value => $emit('update:ingredient', { field: 'calories', value })"
                   type="text"
                   label="칼로리(Kcal)"
                   :rule="[val => val < 0 || '0보다 커야 합니다.']"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.calories"
                  @update:model-value="value => $emit('update:ingredient', { field: 'calories', value })"
                   type="text"
                   label="단가(원)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.carbohydrates"
                  @update:model-value="value => $emit('update:ingredient', { field: 'carbohydrates', value })"
                   type="text"
                   label="탄수화물(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.sugars"
                  @update:model-value="value => $emit('update:ingredient', { field: 'sugars', value })"
                   type="text"
                   label="당류(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.protein"
                  @update:model-value="value => $emit('update:ingredient', { field: 'protein', value })"
                   type="text"
                   label="단백질(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.caffeine"
                  @update:model-value="value => $emit('update:ingredient', { field: 'caffeine', value })"
                   type="text"
                   label="카페인(mg)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.fat"
                  @update:model-value="value => $emit('update:ingredient', { field: 'fat', value })"
                   type="text"
                   label="지방(g)"
          />
        </div>
        <div class="col-6 q-px-sm">
          <q-input :model-value="updateIngredient.saturatedFat"
                   @update:model-value="value => $emit('update:ingredient', { field: 'saturatedFat', value })"
                   type="text"
                   label="포화지방(g)"
          />
        </div>

      </q-card-section>


      <q-card-section>
        <q-input :model-value="ingredient.memo"
                 @update:model-value="value => $emit('update:ingredient', { field: 'memo', value })"
                 type="textarea"
                 label="메모"/>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup>

import {useIngredientStore} from "stores/ingredients";
import {IngredientCategory} from "@/enum/ingredientCategory";
import {ref} from "vue";
const emit = defineEmits([
  'update:modelValue',
  'update:ingredient',
]);
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  ingredient: {
    type: Object,
  },
})
// 외부에서 주입한 이벤트 핸들러
const ingredientStore = useIngredientStore();
const updateIngredient = ref({});
const onBeforeShow = () => {
  updateIngredient.value = props.ingredient;
  console.log(updateIngredient.value);
}


const onBeforeHide = () => {
  //emit('update:modelValue', true);
}
</script>
