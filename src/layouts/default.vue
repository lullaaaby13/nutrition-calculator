<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <div class="text-h6 text-center">영양 성분 계산기</div>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/">
          <q-item-label>메인 화면</q-item-label>
        </q-item>
        <q-item clickable v-ripple to="/ingredients">
          <q-item-label>1차 원재료 영양 성분 & 단가</q-item-label>
        </q-item>
        <q-item clickable v-ripple to="/nutritions-calculate">
          <q-item-label>2차 시크릿 베이스 레시피</q-item-label>
        </q-item>
        <q-item clickable v-ripple to="/nutritions-calculate">
          <q-item-label>3차 판매용 음료 & 디저트 레시피</q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container style="min-width: 80vw;">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>

import {ref} from "vue";

const leftDrawerOpen = ref(true);

</script>
