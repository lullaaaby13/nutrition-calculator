<template>
  <div class="q-px-md">

    <div class="row justify-end q-mb-lg">
      <div class="col-3">
        <q-input
          type="text"
          label="시크릿베이스 찾기"
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
        <th class="text-center">칼로리(Kcal)</th>
        <th class="text-center">탄수화물(g)</th>
        <th class="text-center">단백질(g)</th>
        <th class="text-center">지방(g)</th>
        <th class="text-center">포화지방(g)</th>
        <th class="text-center">당류(g)</th>
        <th class="text-center">카페인(mg)</th>
        <th class="text-center">중량(g)</th>
        <th class="text-center">단가(원)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="secretBase in secretBaseStore.secretBases" :key="secretBase.name"
          @click="$emit('onSecretBaseClick', secretBase)"
      >
        <td class="text-center">{{ secretBase.name }}</td>
        <td class="text-right">{{ Number(secretBase.summary.calories).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.carbohydrates).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.protein).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.fat).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.saturatedFat).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.sugars).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.caffeine).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.amount).toFixed(2) }}</td>
        <td class="text-right">{{ Number(secretBase.summary.unitPrice).toFixed(0) }}</td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import {useIngredientStore} from 'stores/ingredients';
import {useSecretBaseStore} from 'stores/secret-base';

const secretBaseStore = useSecretBaseStore();


defineEmits(['onSecretBaseClick']);
</script>
