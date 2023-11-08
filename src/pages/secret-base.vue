<template>
  <!--  <q-page class="flex justify-center" padding style="width: 1080px;">-->
  <q-page class="full-width flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">시크릿 베이스</div>
        <q-separator/>
      </q-card-section>

    </q-card>

  </q-page>
</template>

<script setup>

import {useIngredientStore} from "@/stores/ingredients";


import {ref} from "vue";

const selectedTypes = ref([]);
const toggle = ref(false);
const text = ref('이거 어디서 샀게? 안알랴줌')
const registerDialog = ref(false);

let ingredientStore = useIngredientStore();
let ingredients = ingredientStore.ingredients;


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

