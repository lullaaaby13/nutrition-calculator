<template>
  <q-dialog full-width full-height>
    <BaseCard>
      <q-card-section class="flex justify-between">
        <div class="text-h6">시크릿 베이스 등록</div>
        <div class="q-gutter-x-md">
          <q-btn label="등록" color="primary" @click="onCreateButtonClick"/>
          <q-btn label="닫기" v-close-popup/>
        </div>
      </q-card-section>

      <q-card-section class="row">
        <div class="col-8 q-px-md">

          <div class="row justify-end q-mb-lg">
            <div class="col-3">
              <q-input type="text"
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
              <th class="text-center">단백질(g)</th>
              <th class="text-center">지방(g)</th>
              <th class="text-center">포화지방(g)</th>
              <th class="text-center">당류(g)</th>
              <th class="text-center">카페인(mg)</th>
              <th class="text-center">단가(원)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="ingredient in ingredientStore.ingredients" :key="ingredient.name"
                @click="onIngredientClick(ingredient)"
            >
              <td class="text-center">{{ ingredient.name }}</td>
              <td class="text-center">{{ ingredient.category.label }}</td>
              <td class="text-right">{{ ingredient.calories }}</td>
              <td class="text-right">{{ ingredient.carbohydrates }}</td>
              <td class="text-right">{{ ingredient.protein }}</td>
              <td class="text-right">{{ ingredient.fat }}</td>
              <td class="text-right">{{ ingredient.saturatedFat }}</td>
              <td class="text-right">{{ ingredient.sugars }}</td>
              <td class="text-right">{{ ingredient.caffeine }}</td>
              <td class="text-right">{{ ingredient.unitPrice }}</td>
            </tr>
            </tbody>
          </q-markup-table>

        </div>
        <div class="col-4 q-px-md">
          <BaseCard class="q-gutter-y-sm" width="30vw">
            <div class="text-subtitle1">
              <q-input v-model="name"
                       type="text"
                       dense
                       label="이름"
                       stack-label
              />
            </div>
            <div class="q-gutter-x-md">
              <span class="text-caption">중량: {{ totalIngredients.amount.toFixed(1) }}g</span>
              <span class="text-caption">단가: {{ totalIngredients.unitPrice.toFixed(1) }}원</span>
            </div>

            <q-card-section v-if="selectedIngredients.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                원재료
              </div>
              <q-list bordered>
                <q-item v-for="ingredient in selectedIngredients" :key="ingredient.ingredient.name">
                  <q-item-section>
                    <q-input type="number"
                             :label="ingredient.ingredient.name"
                             stack-label
                             v-model="ingredient.amount"

                    >
                      <q-icon name="close" size="12px" @click="onRemoveSelectedIngredientClick(ingredient)"/>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>
              <NutritionPanel
                  :calories="totalIngredients.calories"
                  :unitPrice="totalIngredients.unitPrice"
                  :carbohydrates="totalIngredients.carbohydrates"
                  :sugars="totalIngredients.sugars"
                  :protein="totalIngredients.protein"
                  :caffeine="totalIngredients.caffeine"
                  :fat="totalIngredients.fat"
                  :saturatedFat="totalIngredients.saturatedFat"
              />
            </q-card-section>

            <q-card-section>
              <q-input v-model="memo" type="textarea" label="메모" outlined/>
            </q-card-section>

          </BaseCard>
        </div>
      </q-card-section>

    </BaseCard>
  </q-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useIngredientStore} from 'stores/ingredients';
import {useSecretBaseStore} from 'stores/secret-base';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {SecretBase} from 'src/types/secret-base';
import Ingredient from 'src/types/ingredient';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';

const ingredientStore = useIngredientStore();
const secretBaseStore = useSecretBaseStore();
const secretBasePageStore = useSecretBasePageStore();

const name = ref('');
const memo = ref('');

const selectedIngredients = ref<{ amount: number, ingredient: Ingredient }[]>([]);

const onIngredientClick = (ingredient) => {
  const exists = selectedIngredients.value.some(selectedIngredient => selectedIngredient.ingredient.name === ingredient.name);
  if (!exists) {
    selectedIngredients.value.push({
      amount: 0,
      ingredient: ingredient,
    });
  }
};

const onRemoveSelectedIngredientClick = (ingredient) => {
  const index = selectedIngredients.value.findIndex(selectedIngredient => selectedIngredient.ingredient.name === ingredient.ingredient.name);
  if (index !== -1) {
    selectedIngredients.value.splice(index, 1);
  }
};

const calcAmount = (selectedIngredient, property) => {
  console.log(selectedIngredient.ingredient[property], property);
  return selectedIngredient.ingredient[property] * (selectedIngredient.amount / 100)
};

const totalIngredients = computed(() => {
  return selectedIngredients.value.reduce((acc, cur) => {
    acc.calories += calcAmount(cur, 'calories');
    acc.carbohydrates += calcAmount(cur, 'carbohydrates');
    acc.protein += calcAmount(cur, 'protein');
    acc.fat += calcAmount(cur, 'fat');
    acc.sugars += calcAmount(cur, 'sugars');
    acc.saturatedFat += calcAmount(cur, 'saturatedFat');
    acc.caffeine += calcAmount(cur, 'caffeine');
    acc.unitPrice += calcAmount(cur, 'unitPrice');

    acc.amount += Number(cur.amount);
    return acc;
  }, {
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sugars: 0,
    saturatedFat: 0,
    caffeine: 0,
    unitPrice: 0,
    amount: 0,
  });
});

const onCreateButtonClick = () => {

  try {

    const secretBase = new SecretBase(name.value, memo.value);

    selectedIngredients.value.forEach(selectedIngredient => {
      const amount = Number(selectedIngredient.amount);
      const ingredient = selectedIngredient.ingredient;
      secretBase.addComponent(amount, ingredient);
    });

    secretBaseStore.save(secretBase);

    while(selectedIngredients.value.pop()) {}
    secretBasePageStore.closeCreateSecretBaseDialog();

  } catch (e) {
    alert(e.message);
  }

};

</script>

