<template>
  <q-card class="q-pa-md q-ma-md"
          bordered
          style="width: 400px;"
  >
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ secretBase.name }}</div>
        <div class="q-gutter-x-md">
          <span class="text-caption">중량: {{ secretBaseView.amount }}g</span>
          <span class="text-caption">단가: {{ secretBase.unitPrice }}원</span>
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
      <div class="text-subtitle2 q-mb-sm">원재료</div>
      <q-list bordered>
        <q-item class="q-my-sm" v-for="index in 4" :key="index">
          <q-item-section>
            <q-item-label>100</q-item-label>
            <q-item-label caption lines="1">우유(ml)</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle2 q-mb-sm">영양성분</div>
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
      <div> {{ secretBase.memo }} </div>
    </q-card-section>

  </q-card>
</template>

<script setup>

import {computed} from "vue";
import {useSecretBaseStore} from "stores/secret-base";

const props = defineProps({
  secretBase: {
    type: Object,
    default: () => {},
  }
});

defineEmits([
  'onUpdateButtonClick',
  'onDeleteButtonClick',
]);
let secretBaseStore = useSecretBaseStore();

const calcTotal = (components, property) => {
  console.log(components)
  return components
    .map(component => component[property])
    .reduce((acc, cur) => acc + cur, 0)
}

const secretBaseView = computed(() => {
  console.log(props.secretBase);

  let components = props.secretBase.components;
  let amount = calcTotal(components, 'amount');
  let unitPrice = calcTotal(components, 'unitPrice');
  console.log(unitPrice)

  return {
    amount: amount,
    unitPrice,
  }
});

</script>
