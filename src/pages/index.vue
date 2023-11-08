<template>
  <q-page class="full-width full-height flex justify-center">
    <q-card class="q-pa-md" style="width: 80vw;">

      <q-card-section class="flex justify-center items-center full-height">
        <q-card class="q-pa-md q-ma-md" style="width: 300px;">
          <q-card-section>
            <div class="text-h5">등록된 아이템 수</div>
          </q-card-section>
          <q-list bordered>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>23</q-item-label>
                <q-item-label caption lines="1">신선 식품</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">과일 & 채소</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">가루류 & 곡류</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">커피 원두 & 차</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">토핑 재료</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">식품 첨가물</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">포장 용품</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator/>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">시크릿 베이스</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">판매 음료</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>0</q-item-label>
                <q-item-label caption lines="1">디저트</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-card>


<!--        <q-card class="q-pa-md q-ma-md" style="width: 300px;">-->
<!--          -->
<!--        </q-card>-->

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
