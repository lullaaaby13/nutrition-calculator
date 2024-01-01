<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ ingredient.name }}</div>
        <div class="text-caption">{{ labelOfIngredientCategory(ingredient.category) }}</div>
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
      <NutritionPanel v-bind="ingredient"/>
    </q-card-section>

    <q-card-section>
      <div class="text-caption">메모</div>
      <div style="min-height: 60px;">{{ ingredient.memo }}</div>
    </q-card-section>

  </BaseCard>
</template>

<script setup lang="ts">
import {useIngredientStore} from 'stores/ingredients';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {Ingredient, labelOfIngredientCategory} from 'src/model/ingredient';
import {useIngredientPageStore} from 'stores/pages/ingredients';


const ingredient = defineProps<Ingredient>();
console.log('ingredient: ', ingredient)

const ingredientStore = useIngredientStore();
const ingredientPageStore = useIngredientPageStore();

const onDeleteButtonClick = (id: number) => {
  if (confirm('정말로 삭제 하시겠어요?')) {
    ingredientStore.remove(id);
  }
}

</script>
