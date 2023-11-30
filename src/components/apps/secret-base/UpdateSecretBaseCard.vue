<template>
  <q-dialog full-width full-height>
    <q-card class="q-pa-sm">
      <q-card-section class="flex justify-between">
        <div class="text-h6">시크릿 베이스 수정</div>
        <div class="q-gutter-x-md">
          <q-btn label="수정" color="primary" @click="onUpdateButtonClick"/>
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
          <q-card class="q-pa-md q-gutter-y-sm">
            <div class="text-subtitle1">
              <q-input v-model="pageStore.updateSecretBase.name"
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

            <q-card-section v-if="pageStore.updateSecretBase.components.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                원재료
              </div>
              <q-list bordered>
                <q-item v-for="component in pageStore.updateSecretBase.components" :key="component.name">
                  <q-item-section>
                    <q-input type="number"
                             :label="component.ingredient.name"
                             stack-label
                             v-model="component.amount"
                    >
                      <q-icon name="close" size="12px" @click="onRemoveSelectedIngredientClick(component)"/>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>
              <NutritionPanel v-bind="totalIngredients"/>
            </q-card-section>

            <q-card-section>
              <q-input v-model="memo" type="textarea" label="메모" outlined/>
            </q-card-section>

          </q-card>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useIngredientStore} from 'stores/ingredients';
import NutritionPanel from 'components/NutritionPanel.vue';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';

const pageStore = useSecretBasePageStore();
const ingredientStore = useIngredientStore();

const memo = ref('')

defineProps({});

const selectedIngredients = ref([]);

onMounted(() => {
  pageStore.updateSecretBase.components.forEach(component => {
    selectedIngredients.value.push(component.ingredient);
  });
});

const onIngredientClick = (ingredient) => {
  console.log(ingredient);
  console.log(pageStore.updateSecretBase);
  const exists = pageStore.updateSecretBase.components.some(component => component.ingredient.name === ingredient.name);
  if (!exists) {
    pageStore.updateSecretBase.components.push({
      amount: 100,
      ingredient: ingredient,
    });
  }
};

const onRemoveSelectedIngredientClick = (ingredient) => {
  console.log(ingredient)
  const index = pageStore.updateSecretBase.components.findIndex(component => component.ingredient.name === ingredient.ingredient.name);
  if (index !== -1) {
    pageStore.updateSecretBase.components.splice(index, 1);
  }
};

const calcAmount = (component, property) => {
  return component.ingredient[property] * (component.amount / 100)
};

const totalIngredients = computed(() => {

  return pageStore.updateSecretBase.components.reduce((acc, cur) => {
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


</script>

