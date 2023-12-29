<template>
  <div>
    <div class="text-subtitle2 q-mb-sm">영양성분</div>
    <div class="row">
      <div class="col-6">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.calories }}</q-item-label>
              <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.sugar }}</q-item-label>
              <q-item-label caption lines="1">당류(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.fat }}</q-item-label>
              <q-item-label caption lines="1">지방(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.protein }}</q-item-label>
              <q-item-label caption lines="1">단백질(g)</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </div>
      <div class="col-6">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.carbohydrates }}</q-item-label>
              <q-item-label caption lines="1">탄수화물(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.saturatedFat }}</q-item-label>
              <q-item-label caption lines="1">식이섬유(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.saturatedFat }}</q-item-label>
              <q-item-label caption lines="1">포화지방(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ingredient.caffeine }}</q-item-label>
              <q-item-label caption lines="1">카페인(mg)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {Ingredient} from "src/types/ingredient";

const ingredient = defineProps<Ingredient>();

</script>
