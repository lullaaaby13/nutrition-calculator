<template>
  <!--  <q-page class="flex justify-center" padding style="width: 1080px;">-->
  <q-page class="full-width flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">시크릿 베이스</div>
        <q-separator/>
      </q-card-section>

      <q-card-section class="row">
        컨트롤 패널
      </q-card-section>

      <q-separator/>

      <q-card-section class="flex justify-end q-px-lg">
        <q-input
          v-model="searchText"
          type="text"
          label="재료 찾기(재료명)"
          style="width: 300px"
          stack-label
        >
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-md flex">

        <SecretBaseCard v-for="secretBase in filteredSecretBases" :key="secretBase.name"
                        :secret-base="secretBase"
        />
      </q-card-section>

    </q-card>

    <RegisterSecretBaseCard v-model="showSecretBaseRegisterDialog"/>
  </q-page>
</template>

<script setup>

import {computed, ref} from "vue";
import {useSecretBaseStore} from "stores/secret-base";
import {IngredientCategory} from "@/enum/ingredientCategory";
import SecretBaseCard from "components/apps/secret-base/SecretBaseCard.vue";
import RegisterSecretBaseCard from "components/apps/secret-base/RegisterSecretBaseCard.vue";

const searchText = ref('');
const secretBaseStore = useSecretBaseStore();




const filteredSecretBases = computed(() => {
  return secretBaseStore.secretBases.filter(secretBase => {
    return secretBase.name.includes(searchText.value);
  });
});

const showSecretBaseRegisterDialog = ref(false);





</script>

<route lang="yaml">
meta:
  layout: default
</route>

