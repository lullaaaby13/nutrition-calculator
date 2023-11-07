<template>
  <q-page class="full-width full-height flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">

      <q-card-section class="flex justify-center items-center full-height">
        <q-card class="q-pa-md q-ma-md" v-for="index in 3" :key="index">
          <q-card-section>
            <div class="text-h5">원재료 영양성분 & 단가</div>
          </q-card-section>
          <q-list bordered>

            <q-item-label header>원재료 영양성분 & 단가</q-item-label>
            <q-separator spaced />
            <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>256g</q-item-label>
                <q-item-label caption lines="1">탄수화물</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list bordered>
            <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>256g</q-item-label>
                <q-item-label caption lines="1">탄수화물</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup>

import {ref} from "vue";

const contacts = ref([{
  id: 1,
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  letter: 'R'
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  letter: 'M'
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  letter: 'E'
}, {
  id: 4,
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  letter: 'S'
}]);

</script>

<route lang="yaml">
meta:
  layout: default
</route>
