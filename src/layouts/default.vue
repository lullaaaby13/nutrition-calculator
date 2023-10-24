<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <div class="text-h6 text-center">영양성분 계산기</div>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-label>영양성분 계산하기</q-item-label>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>식재료 등록하기</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>

import {ref} from "vue";

const leftDrawerOpen = ref(true);

</script>
