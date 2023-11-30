<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ secretBase.name }}</div>
        <div class="q-gutter-x-md">
          <span class="text-caption">중량: {{ secretBaseView.amount.toFixed(2) }}g</span>
          <span class="text-caption">단가: {{ secretBaseView.unitPrice.toFixed(0) || '-' }}원</span>
        </div>
      </div>

      <q-space/>
      <div class="q-gutter-md">
        <q-btn
          dense
          outline
          color="secondary"
          @click="pageStore.showUpdateDialog(secretBase)"
          icon="edit"
          flat
        />
        <q-btn
          dense
          outline
          color="red"
          @click="$emit('onDeleteButtonClick', secretBase)"
          icon="delete"
          flat
        />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle2 q-mb-sm">원재료</div>
      <q-list bordered>
        <q-item class="q-my-sm" v-for="(component, index) in props.secretBase.components" :key="index">
          <q-item-section>
            <q-item-label>{{component.amount}}</q-item-label>
            <q-item-label caption lines="1">{{component.ingredient.name}}(g)</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section>
      <NutritionPanel v-bind="secretBaseView"/>
    </q-card-section>
    <q-card-section>
      <div class="text-caption">메모</div>
      <div> {{ secretBase.memo }} </div>
    </q-card-section>

  </BaseCard>
</template>

<script setup>

import {computed} from 'vue';
import {useSecretBaseStore} from 'stores/secret-base';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';

const props = defineProps({
  secretBase: {
    type: Object,
  }
});

defineEmits([
  'onUpdateButtonClick',
  'onDeleteButtonClick',
]);
const pageStore = useSecretBasePageStore();
const secretBaseStore = useSecretBaseStore();

const calcAmount = (components) => {
  return components
    .map(component => component.amount)
    .reduce((acc, cur) => acc + cur, 0)
}

const calcTotal = (components, property) => {
  return components
    .map(component => component.ingredient[property] * (component.amount / 100))
    .reduce((acc, cur) => Number(acc) + Number(cur), 0)
}

const secretBaseView = computed(() => {

  const components = props.secretBase.components;
  const amount = calcAmount(components);
  const unitPrice = calcTotal(components, 'unitPrice');
  const calories = calcTotal(components, 'calories');
  const carbohydrates = calcTotal(components, 'carbohydrates');
  const sugars = calcTotal(components, 'sugars');
  const protein = calcTotal(components, 'protein');
  const caffeine = calcTotal(components, 'caffeine');
  const fat = calcTotal(components, 'fat');
  const saturatedFat = calcTotal(components, 'saturatedFat');

  return {
    amount,
    unitPrice,
    carbohydrates,
    calories,
    sugars,
    protein,
    caffeine,
    fat,
    saturatedFat,
  }
});

const onUpdateButtonClick = (secretBase) => {
  console.log(secretBase);
  alert('수정되었습니다.');
}
// const onDeleteButtonClick = (secretBase) => {
//   secretBaseStore.delete(secretBase);
//   alert('삭제되었습니다.')
// }

</script>
