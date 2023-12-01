<template>
    <q-page class="full-width flex justify-center" padding>
    <BaseCard flat bordered>
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">판매용 음료 & 디저트 레시피</div>
        <q-separator/>
      </q-card-section>

      <q-card-section class="flex justify-end q-px-lg q-gutter-lg">
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
        <q-btn
          color="primary"
          label="재료 등록"
          @click="showSecretBaseRegisterDialog = true"/>
      </q-card-section>
      <q-card-section class="q-gutter-md flex">

        <BaseCard style="width: 400px;">
          <q-card-section class="flex">
            <div>
              <div class="text-h5">캬라멜 마끼아또</div>
              <div class="q-gutter-x-md">
                <span class="text-caption">음료</span>
              </div>
            </div>
            <q-space/>
            <div class="q-gutter-md">
              <q-btn
                dense
                outline
                color="secondary"
                @click="$emit('onUpdateButtonClick', secretBase)"
                icon="edit"
                flat
              />
              <q-btn
                dense
                outline
                color="red"
                @click="$emit('onDeleteButtonClick', secretBase)"
                icon="delete"
                flat
              />
            </div>
          </q-card-section>

          <q-card-section>
            <div class="row">
              <div class="col-6">
                <div class="text-subtitle2 q-mb-sm">베이스</div>
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{ calories }}</q-item-label>
                      <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-6">
                <div class="text-subtitle2 q-mb-sm">원재료</div>
                <q-list bordered>
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{ carbohydrates }}</q-item-label>
                      <q-item-label caption lines="1">탄수화물(g)</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <NutritionPanel/>
          </q-card-section>

        </BaseCard>

      </q-card-section>

    </BaseCard>

  </q-page>
</template>

<script setup>

import {computed, ref} from 'vue';
import {useSecretBaseStore} from 'stores/secret-base';
import BaseCard from 'components/BaseCard.vue';
import NutritionPanel from 'components/NutritionPanel.vue';

const searchText = ref('');
const secretBaseStore = useSecretBaseStore();


const showSecretBaseRegisterDialog = ref(false);

</script>

<route lang="yaml">
meta:
  layout: default
</route>

