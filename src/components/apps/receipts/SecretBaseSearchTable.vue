<template>
  <div class="q-px-md">

    <div class="row justify-end q-mb-lg">
      <div class="col-3">
        <q-input
          v-model="searchText"
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
        <th class="text-center">당류(g)</th>
        <th class="text-center">식이섬유(g)</th>
        <th class="text-center">지방(g)</th>
        <th class="text-center">포화지방(g)</th>
        <th class="text-center">단백질(g)</th>
        <th class="text-center">카페인(mg)</th>
        <th class="text-center">중량(g)</th>
        <th class="text-center">단가(원)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="({ secretBase, summary}, index) in secretBases"
          :key="index"
          @click="$emit('onSecretBaseClick', secretBase)"
      >
        <td class="text-center">{{ summary.getName() }}</td>
        <td class="text-right">{{ summary.getCalories() }}</td>
        <td class="text-right">{{ summary.getCarbohydrates() }}</td>
        <td class="text-right">{{ summary.getSugar() }}</td>
        <td class="text-right">{{ summary.getFiber() }}</td>
        <td class="text-right">{{ summary.getFat() }}</td>
        <td class="text-right">{{ summary.getSaturatedFat() }}</td>
        <td class="text-right">{{ summary.getProtein() }}</td>
        <td class="text-right">{{ summary.getCaffeine() }}</td>
        <td class="text-right">{{ summary.getAmount() }}</td>
        <td class="text-right">{{ summary.getUnitPrice() }}</td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import {useSecretBaseStore} from 'stores/secret-base';
import {computed, ref} from "vue";
import {ComponentSummary} from "src/model/summary";
import {SecretBase} from "src/model/secret-base";

const secretBaseStore = useSecretBaseStore();

defineEmits(['onSecretBaseClick']);

const toSummary = (secretBase: SecretBase) => {
  const summary = new ComponentSummary(secretBase.id, secretBase.name);
  summary.addSecretBaseComponents(secretBase.components);
  return summary;
};

const searchText = ref('');
const secretBases = computed(() => {
  if (searchText.value === '') {
    return secretBaseStore.secretBases.map(it => ({ secretBase: it, summary: toSummary(it) }));
  }
  return secretBaseStore.secretBases
    .filter(it => it.name.includes(searchText.value))
    .map(it => ({ secretBase: it, summary: toSummary(it) }));
});

</script>
