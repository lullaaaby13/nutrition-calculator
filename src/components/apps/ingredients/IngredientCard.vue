<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ ingredient.name }}</div>
        <div class="text-caption">{{ ingredient.category.label }}</div>
        <span class="text-caption">단가: {{ ingredient.unitPrice.toFixed(0) || '-' }}원</span>
      </div>

      <q-space/>

      <div class="q-gutter-md">
        <q-btn
          dense outline flat
          color="secondary"
          icon="edit"
          @click="ingredientPageStore.showUpdateIngredientDialog(ingredient)"
        />
        <q-btn
          dense outline flat
          color="red"
          icon="delete"
          @click="onDeleteButtonClick(ingredient.id)"
        />
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <NutritionPanel
        :calories="ingredient.calories"
        :unitPrice="ingredient.unitPrice"
        :carbohydrates="ingredient.carbohydrates"
        :sugars="ingredient.sugars"
        :protein="ingredient.protein"
        :caffeine="ingredient.caffeine"
        :fat="ingredient.fat"
        :saturatedFat="ingredient.saturatedFat"
      />
    </q-card-section>

    <q-card-section>
      <div class="text-caption">메모</div>
      <div style="min-height: 60px;">{{ ingredient.memo }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
<!--      <CreateUpdateDate :createdAt="ingredient.createdAt" :updatedAt="ingredient.updatedAt"/>-->
    </q-card-section>

  </BaseCard>
</template>

<script setup lang="ts">
import {useIngredientStore} from 'stores/ingredients';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {Ingredient} from 'src/types/Ingredient';
import {useIngredientPageStore} from 'stores/pages/ingredients';


const ingredient = defineProps<Ingredient>();

const ingredientStore = useIngredientStore();
const ingredientPageStore = useIngredientPageStore();

const onDeleteButtonClick = (id: number) => {
  if (confirm('정말로 삭제 하시겠어요?')) {
    ingredientStore.delete(id);
  }
}


</script>
