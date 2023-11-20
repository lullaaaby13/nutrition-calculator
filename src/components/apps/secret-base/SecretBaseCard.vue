<template>
  <q-card class="q-pa-md q-ma-md"
          bordered
          style="width: 400px;"
  >
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ secretBase.name }}</div>
        <div class="q-gutter-x-md">
          <span class="text-caption">중량: {{ secretBaseView.amount }}g</span>
          <span class="text-caption">단가: {{ secretBaseView.unitPrice || '-' }}원</span>
        </div>
      </div>

      <q-space/>
      <div class="q-gutter-md">
        <q-btn
          dense
          outline
          color="secondary"
          @click="$emit('onUpdateButtonClick', secretBase)"
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
      <div class="text-subtitle2 q-mb-sm">영양성분</div>
      <div class="row">
        <div class="col-6">
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label>{{secretBaseView.calories}}</q-item-label>
                <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{secretBaseView.protein}}</q-item-label>
                <q-item-label caption lines="1">단백질(g)</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{secretBaseView.sugars}}</q-item-label>
                <q-item-label caption lines="1">당류(g)</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{secretBaseView.caffeine}}</q-item-label>
                <q-item-label caption lines="1">카페인(mg)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-6">
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label>{{secretBaseView.carbohydrates}}</q-item-label>
                <q-item-label caption lines="1">탄수화물(g)</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{secretBaseView.fa}}</q-item-label>
                <q-item-label caption lines="1">지방(g)</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{secretBaseView.saturatedFat}}</q-item-label>
                <q-item-label caption lines="1">포화지방(Kcal)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-caption">메모</div>
      <div> {{ secretBase.memo }} </div>
    </q-card-section>

  </q-card>
</template>

<script setup>

import {computed} from "vue";
import {useSecretBaseStore} from "stores/secret-base";

const props = defineProps({
  secretBase: {
    type: Object,
    default: () => {},
  }
});

defineEmits([
  'onUpdateButtonClick',
  'onDeleteButtonClick',
]);
const secretBaseStore = useSecretBaseStore();

const calcAmount = (components) => {
  return components
    .map(component => component.amount)
    .reduce((acc, cur) => acc + cur, 0)
}
const calcTotal = (components, property) => {
  return components
    .map(component => component.ingredient[property])
    .reduce((acc, cur) => acc + cur, 0)
}

const secretBaseView = computed(() => {


  let components = props.secretBase.components;
  let amount = calcAmount(components);
  let unitPrice = calcTotal(components, 'unitPrice');
  let calories = calcTotal(components, 'calories');
  let carbohydrates = calcTotal(components, 'carbohydrates');
  let sugars = calcTotal(components, 'sugars');
  let protein = calcTotal(components, 'protein');
  let caffeine = calcTotal(components, 'caffeine');
  let fat = calcTotal(components, 'fat');
  let saturatedFat = calcTotal(components, 'saturatedFat');

  return {
    amount: amount,
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

</script>
