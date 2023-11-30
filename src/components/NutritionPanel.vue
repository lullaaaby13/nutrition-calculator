<template>
  <div>
    <div class="text-subtitle2 q-mb-sm">영양성분</div>
    <div class="row">
      <div class="col-6">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ calories.toFixed(digits) }}</q-item-label>
              <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ protein.toFixed(digits) }}</q-item-label>
              <q-item-label caption lines="1">단백질(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ sugars.toFixed(digits) }}</q-item-label>
              <q-item-label caption lines="1">당류(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ caffeine.toFixed(digits) }}</q-item-label>
              <q-item-label caption lines="1">카페인(mg)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-6">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ carbohydrates.toFixed(digits) }}</q-item-label>
              <q-item-label caption lines="1">탄수화물(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ fat.toFixed(digits) }}</q-item-label>
              <q-item-label caption lines="1">지방(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ saturatedFat.toFixed(digits) }}</q-item-label>
              <q-item-label caption lines="1">포화지방(Kcal)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

</template>

<script setup>
const digits = 2;

defineProps({
  calories: {
    type: Number,
    default: () => 0,
  },
  protein: {
    type: Number,
    default: () => 0,
  },
  sugars: {
    type: Number,
    default: () => 0,
  },
  caffeine: {
    type: Number,
    default: () => 0,
  },
  carbohydrates: {
    type: Number,
    default: () => 0,
  },
  fat: {
    type: Number,
    default: () => 0,
  },
  saturatedFat: {
    type: Number,
    default: () => 0,
  },
});

</script>
