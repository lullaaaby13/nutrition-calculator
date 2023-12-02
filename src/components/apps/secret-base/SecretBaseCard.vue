<template>
  <BaseCard style="width: 400px;">
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ secretBase.name }}</div>
        <AmountUnitPriceCaption :amount="secretBaseView.amount" :unit-price="secretBaseView.unitPrice"/>
      </div>

      <q-space/>
      <div class="q-gutter-md">
        <q-btn
          dense
          outline
          color="secondary"
          @click="secretBasePageStore.showUpdateSecretBaseDialog(secretBase)"
          icon="edit"
          flat
        />
        <q-btn
          dense
          outline
          color="red"
          @click="onDeleteButtonClick(secretBase)"
          icon="delete"
          flat
        />
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="text-subtitle2 q-mb-sm">원재료</div>
      <q-list bordered>
        <q-item class="q-my-sm" v-for="(component, index) in props.secretBase?.components" :key="index">
          <q-item-section>
            <q-item-label>{{component.amount}}</q-item-label>
            <q-item-label caption lines="1">{{component.ingredient.name}}(g)</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section>
      <NutritionPanel
        :calories="secretBaseView.calories"
        :unitPrice="secretBaseView.unitPrice"
        :carbohydrates="secretBaseView.carbohydrates"
        :sugars="secretBaseView.sugars"
        :protein="secretBaseView.protein"
        :caffeine="secretBaseView.caffeine"
        :fat="secretBaseView.fat"
        :saturatedFat="secretBaseView.saturatedFat"
      />
    </q-card-section>
    <q-card-section>
      <div class="text-caption">메모</div>
      <div> {{ secretBase.memo }} </div>
    </q-card-section>

  </BaseCard>
</template>

<script setup lang="ts">

import {computed} from 'vue';
import {useSecretBaseStore} from 'stores/secret-base';
import NutritionPanel from 'components/NutritionPanel.vue';
import BaseCard from 'components/BaseCard.vue';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';
import {SecretBase} from 'src/types/secret-base';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';
import {ComponentSummary} from 'src/types/summary';

const props = defineProps({
  secretBase: {
    type: SecretBase,
    required: true,
  }
});

const secretBasePageStore = useSecretBasePageStore();
const secretBaseStore = useSecretBaseStore();

const secretBaseView = computed(() => {
  let componentSummary = new ComponentSummary();
  if (props.secretBase) {
    componentSummary.addSecretBaseComponents(props.secretBase.components);
  }
  return componentSummary;
});

const onDeleteButtonClick = (secretBase: SecretBase) => {
  if (confirm('정말 삭제 하시겠어요?')) {
    secretBaseStore.delete(secretBase);
  }
}

</script>
