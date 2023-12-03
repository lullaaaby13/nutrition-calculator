<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list >

        <q-item>
          <q-item-section>
            <div class="text-h6 text-center">Nutrition Calculator</div>
          </q-item-section>
        </q-item>

        <q-separator/>

        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>메인 화면</q-item-section>
        </q-item>

        <q-item clickable to="/ingredients">
          <q-item-section avatar>
            <q-icon name="hub" />
          </q-item-section>
          <q-item-section>원재료</q-item-section>
        </q-item>

        <q-item clickable to="/secret-bases">
          <q-item-section avatar>
            <q-icon name="key" />
          </q-item-section>
          <q-item-section>시크릿 베이스</q-item-section>
        </q-item>

        <q-item clickable to="/receipts">
          <q-item-section avatar>
            <q-icon name="receipt" />
          </q-item-section>
          <q-item-section>레시피</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container style="min-width: 80vw;">
      <router-view />
    </q-page-container>

    <q-dialog v-model="errorDialog">
      <BaseCard width="400px">
        <q-card-section>
          <div class="text-h6 text-red-6">에러</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle2">{{errorMessage}}</div>
        </q-card-section>
        <q-card-section class="flex justify-end">
          <q-btn flat color="primary" label="확인" v-close-popup/>
        </q-card-section>
      </BaseCard>
    </q-dialog>
  </q-layout>

</template>

<script setup>

import {onErrorCaptured, ref} from 'vue';
import BaseCard from 'components/BaseCard.vue';

const leftDrawerOpen = ref(true);

const errorDialog = ref(false);
const errorMessage = ref('');

onErrorCaptured(err => {
  console.error('onErrorCaptured : ', err.message, err)
  errorMessage.value = err.message;
  errorDialog.value = true;
})

</script>
