<template>
  <q-dialog full-width full-height @before-show="onBeforeShow" @before-hide="onBeforeHide">
    <q-card class="q-pa-sm">
      <q-card-section class="flex justify-between">
        <div class="text-h6">시크릿 베이스 수정</div>
        <div class="q-gutter-x-md">
          <q-btn label="수정" color="primary" @click="onUpdateButtonClick"/>
          <q-btn label="닫기" v-close-popup/>
        </div>
      </q-card-section>

      <q-card-section class="row">

        <IngredientSearchTable class="col-8" @onIngredientClick="onIngredientClick"/>

        <div class="col-4 q-px-md">
          <q-card class="q-pa-md q-gutter-y-sm">
            <div class="text-subtitle1">
              <q-input v-model="form.name"
                       type="text"
                       dense
                       label="이름"
                       stack-label
              />
            </div>

            <AmountUnitPriceCaption :amount="totalIngredients.amount" :unit-price="totalIngredients.unitPrice"/>

            <q-card-section v-if="selectedComponents.length > 0">
              <div class="text-subtitle2 q-mb-sm">
                원재료
              </div>
              <q-list bordered>
                <q-item v-for="(component, index) in selectedComponents" :key="index">
                  <q-item-section>
                    <q-input v-model="component.amount"
                             type="number"
                             :label="component.ingredient.name"
                             stack-label
                             @input="component.amount = Number($event)"
                    >
                      <q-icon name="close" size="12px" @click="onRemoveSelectedComponentClick(component)"/>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section>
              <NutritionPanel v-bind="totalIngredients"/>
            </q-card-section>

            <q-card-section>
              <q-input v-model="form.memo" type="textarea" label="메모" outlined/>
            </q-card-section>

          </q-card>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import NutritionPanel from 'components/NutritionPanel.vue';
import {useSecretBasePageStore} from 'stores/pages/secret-bases';
import {SecretBaseComponent} from 'src/types/secret-base';
import Ingredient from 'src/types/ingredient';
import AmountUnitPriceCaption from 'components/AmountUnitPriceCaption.vue';
import IngredientSearchTable from 'components/apps/secret-base/IngredientSearchTable.vue';
import {ComponentSummary} from 'src/types/summary';

const secretBasePageStore = useSecretBasePageStore();

const form = ref({
  name: '',
  memo: '',
});
const selectedComponents = ref<SecretBaseComponent[]>([]);


const onUpdateButtonClick = () => {
  secretBasePageStore.updateSecretBase.name = form.value.name;
  secretBasePageStore.updateSecretBase.memo = form.value.memo;
  secretBasePageStore.updateSecretBase.replaceComponents(selectedComponents.value);
  secretBasePageStore.closeUpdateSecretBaseDialog();
};

const onIngredientClick = (ingredient: Ingredient) => {
  let exists = selectedComponents.value.some(it => it.ingredient.name === ingredient.name);
  if (!exists) {
    selectedComponents.value.push({
      amount: 10,
      ingredient,
    });
  }
};

const onRemoveSelectedComponentClick = (component: SecretBaseComponent) => {
  const index = selectedComponents.value.findIndex(it => it.ingredient.name === component.ingredient.name);
  if (index !== -1) {
    selectedComponents.value.splice(index, 1);
  }
};

const totalIngredients = computed(() => {
  let componentSummary = new ComponentSummary();
  componentSummary.addSecretBaseComponents(selectedComponents.value);
  return componentSummary;
});

const onBeforeShow = () => {
  form.value.name = secretBasePageStore.updateSecretBase.name;
  form.value.memo = secretBasePageStore.updateSecretBase.memo || '';
  secretBasePageStore.updateSecretBase.components.forEach(it => {
    selectedComponents.value.push({
      amount: it.amount,
      ingredient: it.ingredient,
    });
  });
};

const onBeforeHide = () => {
  form.value.name = '';
  form.value.memo = '';
  selectedComponents.value = [];
}

</script>
