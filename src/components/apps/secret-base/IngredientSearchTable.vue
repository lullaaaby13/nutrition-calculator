<template>
  <div class="q-px-md">

    <div class="row justify-end q-mb-lg">
      <div class="col-3">
        <q-input
          v-model="searchText"
          type="text"
          label="원재료 찾기"
          stack-label
        >
          <q-icon name="search" color="secondary"/>
        </q-input>
      </div>
    </div>

    <q-markup-table>
      <thead>
      <tr>
        <th class="text-center">원재료명</th>
        <th class="text-center">카테고리</th>
        <th class="text-center">칼로리(Kcal)</th>
        <th class="text-center">탄수화물(g)</th>
        <th class="text-center">당류(g)</th>
        <th class="text-center">식이섬유(g)</th>
        <th class="text-center">지방(g)</th>
        <th class="text-center">포화지방(g)</th>
        <th class="text-center">단백질(g)</th>
        <th class="text-center">카페인(mg)</th>
        <th class="text-center">단가(원)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ingredient in ingredients" :key="ingredient.name"
          @click="$emit('onIngredientClick', ingredient)"
      >
        <td class="text-center">{{ ingredient.name }}</td>
        <td class="text-center">{{ labelOfIngredientCategory(ingredient.category) }}</td>
        <td class="text-right">{{ ingredient.calories }}</td>
        <td class="text-right">{{ ingredient.carbohydrates }}</td>
        <td class="text-right">{{ ingredient.sugar }}</td>
        <td class="text-right">{{ ingredient.fiber }}</td>
        <td class="text-right">{{ ingredient.fat }}</td>
        <td class="text-right">{{ ingredient.saturatedFat }}</td>
        <td class="text-right">{{ ingredient.protein }}</td>
        <td class="text-right">{{ ingredient.caffeine }}</td>
        <td class="text-right">{{ ingredient.unitPrice }}</td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import {useIngredientStore} from 'stores/ingredients';
import {labelOfIngredientCategory} from 'src/model/ingredient';
import {computed, ref} from "vue";

const  ingredientStore = useIngredientStore();

defineEmits(['onIngredientClick']);

const searchText = ref('');
const ingredients = computed(() => {
  if (searchText.value === '') {
    return ingredientStore.ingredients;
  }

  return ingredientStore.ingredients.filter(ingredient => {
    return ingredient.name.includes(searchText.value);
  });
});
</script>
