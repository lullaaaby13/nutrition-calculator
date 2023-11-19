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
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-md flex">

        <q-card class="q-pa-md q-ma-md"
                bordered
                style="width: 400px;"
                v-for="secretBase in filteredSecretBases" :key="secretBase.name"
        >
          <q-card-section class="flex">
            <div>
              <div class="text-h5">이름</div>
            </div>

            <q-space/>
            <div class="q-gutter-md">
              <q-btn
                dense
                outline
                color="secondary"
                @click="$emit('onUpdateButtonClick', ingredient)"
                icon="edit"
                flat
              />
              <q-btn
                dense
                outline
                color="red"
                @click="$emit('onDeleteButtonClick', ingredient)"
                icon="delete"
                flat
              />
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-h6">원재료</div>
            <div class="row">
              <div class="col-6">
                <q-list bordered>
                  <q-item class="q-my-sm" v-for="index in 4" :key="index">
                    <q-item-section>
                      <q-item-label>100</q-item-label>
                      <q-item-label caption lines="1">우유(ml)</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6">영양성분</div>
            <div class="row">
              <div class="col-6">
                <q-list bordered>
                  <q-item class="q-my-sm" v-for="index in 4" :key="index">
                    <q-item-section>
                      <q-item-label>100</q-item-label>
                      <q-item-label caption lines="1">우유(ml)</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-caption">메모</div>
            <div>
              개쩌는 마법의 베이스
            </div>
          </q-card-section>

        </q-card>
      </q-card-section>

    </q-card>
    <q-dialog v-model="alert" full-width>
      <q-card style="width: 1080px">
        <q-card-section>
          <div class="text-h6">시크릿 베이스 등록</div>
        </q-card-section>

        <q-separator/>

        <q-card-section class="row">
          <div class="col-6">
            재료 선택하는 화면
          </div>
          <div class="col-6">
            <div class="text-subtitle1">선택된 재료</div>
          </div>
        </q-card-section>

        <q-separator/>


        <q-card-actions align="right">
          <q-btn flat label="등록" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>

import {computed, ref} from "vue";
import {useSecretBaseStore} from "stores/secret-base";

const searchText = ref('');
const secretBaseStore = useSecretBaseStore();


const filteredSecretBases = computed(() => {
  return secretBaseStore.secretBases.filter(secretBase => {
    return secretBase.name.includes(searchText.value);
  });
});

const alert = ref(true);


</script>

<route lang="yaml">
meta:
  layout: default
</route>

