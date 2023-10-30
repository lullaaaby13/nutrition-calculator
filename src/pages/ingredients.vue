<template>
<!--  <q-page class="flex justify-center" padding style="width: 1080px;">-->
  <q-page class="full-width flex justify-center">
    <q-card class="q-pa-md" style="width: 1080px;">
      <q-card-section>
        <div class="text-h5 q-my-sm">식재료 관리</div>
        <q-separator/>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary">등록하기</q-btn>
      </q-card-actions>
      <q-card-section class="flex q-gutter-md">
        <q-card class="q-pa-md" style="width: 250px;" v-for="index in 20" :key="index">
          <q-card-section class="text-weight-bold">
            우유
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="item.carbohydrate"
              type="text"
              label="탄수화물"
            />
            <q-input
              v-model="item.protein"
              type="text"
              label="단백질"
            />
            <q-input
              v-model="item.fat"
              type="text"
              label="지방"
            />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>

import {ref} from "vue";

const item = ref({
  carbohydrate: 0,
  protein: 0,
  fat: 0,
});

</script>

<route lang="yaml">
meta:
  layout: default
</route>
