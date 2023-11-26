<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ ingredient.name }}</div>
        <div class="text-caption">{{ ingredient.category.label }}</div>
      </div>

      <q-space/>
      <div class="q-gutter-md">
        <q-btn
          dense outline flat
          color="secondary"
          icon="edit"
          @click="$emit('openUpdateIngredientDialog', ingredient)"
        />
        <q-btn
          dense outline flat
          color="red"
          icon="delete"
          @click="onDeleteButtonClick(ingredient)"
        />
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <NutritionPannel v-bind="ingredient"/>
    </q-card-section>

    <q-card-section>
      <div class="text-caption">메모</div>
      <div style="min-height: 60px;">{{ ingredient.memo }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="text-caption text-bold">등록한 날짜: {{ ingredient.createdAt.toISOString() }}</div>
      <div class="text-caption text-bold">마지막 수정한 날짜: {{ ingredient.updatedAt.toISOString() }}</div>
    </q-card-section>

  </BaseCard>
</template>

<script setup>

import {useIngredientStore} from "stores/ingredients";
import {ref} from "vue";
import NutritionPannel from "components/NutritionPannel.vue";
import BaseCard from "components/BaseCard.vue";

defineEmits(['openUpdateIngredientDialog']);
defineProps({
  ingredient: {
    type: Object,
  }
});

const ingredientStore = useIngredientStore();

const onDeleteButtonClick = ingredient => {
  if (confirm('정말로 삭제 하시겠어요?')) {
    ingredientStore.delete(ingredient);
  }
}



</script>
