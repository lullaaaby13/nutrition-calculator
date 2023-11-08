<template>
  <!--  <q-page class="flex justify-center" padding style="width: 1080px;">-->
  <q-page class="full-width flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">
      <q-card-section>
        <div class="text-h4 text-bold q-my-sm">시크릿 베이스</div>
        <q-separator/>
      </q-card-section>

      <q-card-section class="row">
        <div class="col-6 q-gutter-md q-px-md" style="border-right: 0.5px solid lightgrey;">
          <q-checkbox size="md" v-model="selectedTypes" val="fresh" label="신선 식품"/>
          <q-checkbox size="md" v-model="selectedTypes" val="fruits" label="과일 & 채소"/>
          <q-checkbox size="md" v-model="selectedTypes" val="flour" label="가루류 & 곡류"/>
          <q-checkbox size="md" v-model="selectedTypes" val="coffee" label="커피 원두 & 차"/>
          <q-checkbox size="md" v-model="selectedTypes" val="topping" label="토핑 재료"/>
          <q-checkbox size="md" v-model="selectedTypes" val="additives" label="식품 첨가물"/>
          <q-checkbox size="md" v-model="selectedTypes" val="packaging" label="포장 용품"/>
          <q-btn
            rounded
            outline
            color="grey"
            label="선택 초기화"
          />
        </div>
        <div class="col-3 q-px-md" style="border-right: 0.5px solid lightgrey;">
          <q-toggle
            v-model="toggle"
            color="green"
          />
          <span class="text-caption">1g 당</span>
        </div>
        <div class="col-3 q-px-md">
          <q-btn
            rounded
            outline
            color="primary"
            label="등록하기"
          />
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="flex justify-end q-px-lg">
        <q-input
          type="text"
          label="재료 찾기(재료명)"
          style="width: 300px"
        />
      </q-card-section>
      <q-card-section class="q-gutter-md flex">

        <q-card
          class="q-pa-md q-ma-md"
          bordered
          style="width: 400px;"
          v-for="index in 50" :key="index"
        >
          <q-card-section class="flex">
            <div>
              <div class="text-h5">우유</div>
              <div class="text-caption">신선 식품</div>
            </div>

            <q-space/>
            <div class="q-gutter-md">
              <q-btn
                dense
                outline
                color="secondary"
                label="수정하기"/>
              <q-btn
                dense
                outline
                color="red"
                label="삭제하기"/>
            </div>
          </q-card-section>



          <q-separator/>

          <q-card-section class="row">
            <div class="col-6" v-for="index in 2" :key="index">
              <q-list bordered>
                <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>256g</q-item-label>
                    <q-item-label caption lines="1">탄수화물</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="text"
              filled
              disable
              label="메모"
              type="textarea"
            />
          </q-card-section>

          <q-separator/>

          <q-card-section>
            <div class="text-caption text-bold">등록한 날짜: 2023-11-08 12:31:00</div>
            <div class="text-caption text-bold">마지막 수정한 날짜: 2023-11-08 12:31:00</div>
          </q-card-section>

        </q-card>
      </q-card-section>

    </q-card>


    <q-dialog v-model="registerDialog">
      <q-card class="q-pa-md" style="width: 400px;">
        <q-card-section>
          <div class="text-h6">식재료 등록하기</div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <q-input
            v-model="registerName"
            class="q-my-sm"
            type="text"
            label="이름"
            dense
          />
          <q-input
            v-model="registerCarbohydrate"
            class="q-my-sm"
            type="text"
            label="탄수화물(g)"
            dense
          />
          <q-input
            v-model="registerProtein"
            class="q-my-sm"
            type="text"
            label="단백질(g)"
            dense
          />
          <q-input
            v-model="registerFat"
            class="q-my-sm"
            type="text"
            label="지방(g)"
            dense
          />
          <q-input
            v-model="registerUnitPrice"
            class="q-my-sm"
            type="text"
            label="100ml 당 단가(원)"
            dense
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="저장"
                 color="primary"
                 class="q-mr-md"
                 v-close-popup
                 @click="onRegisterButtonClick"
          />
          <q-btn label="취소" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDialog">
      <q-card class="q-pa-md" style="width: 250px;">
        <q-card-section class="text-center">
          <p>식재료가 등록 되었습니다.</p>
        </q-card-section>
      </q-card>
    </q-dialog>
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

