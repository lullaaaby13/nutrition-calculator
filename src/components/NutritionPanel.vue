<template>
  <div>
    <div class="text-subtitle2 q-mb-sm">영양성분</div>
    <div class="row">
      <div class="col-6">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ calories.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ sugar.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">당류(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ fat.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">지방(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ protein.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">단백질(g)</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </div>
      <div class="col-6">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ carbohydrates.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">탄수화물(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ fiber.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">식이섬유(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ saturatedFat.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">포화지방(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ caffeine.toFixed(2) }}</q-item-label>
              <q-item-label caption lines="1">카페인(mg)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

defineProps({
  calories: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  fiber: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  saturatedFat: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  caffeine: {
    type: Number,
    required: true,
  },
});
</script>
