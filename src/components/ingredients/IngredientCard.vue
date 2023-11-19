<template>
  <q-card
    class="q-pa-md q-ma-md"
    bordered
    style="width: 400px;"
  >
    <q-card-section class="flex">
      <div>
        <div class="text-h5">{{ ingredient.name }}</div>
        <div class="text-caption">{{ ingredient.category.label }}</div>
      </div>

      <q-space/>
      <div class="q-gutter-md">
        <q-btn
          dense
          outline
          color="secondary"
          label="수정하기"
          @click="$emit('openUpdateIngredientDialog', ingredient)"
        />
        <q-btn
          dense
          outline
          color="red"
          label="삭제하기"
          @click="onDeleteButtonClick(ingredient)"
        />
      </div>
    </q-card-section>



    <q-separator/>

    <q-card-section class="row">
      <div class="col-6">
        <q-list bordered>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.calories }}</q-item-label>
              <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.carbohydrates }}</q-item-label>
              <q-item-label caption lines="1">탄수화물(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.protein }}</q-item-label>
              <q-item-label caption lines="1">단백질(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.fat }}</q-item-label>
              <q-item-label caption lines="1">지방(g)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-6">
        <q-list bordered>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.unitPrice }}</q-item-label>
              <q-item-label caption lines="1">단가(원)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.sugars }}</q-item-label>
              <q-item-label caption lines="1">당류(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.caffeine }}</q-item-label>
              <q-item-label caption lines="1">카페인(mg)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ ingredient.saturatedFat }}</q-item-label>
              <q-item-label caption lines="1">포화지방(g)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-caption">메모</div>
      <div style="min-height: 60px;">{{ ingredient.memo }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="text-caption text-bold">등록한 날짜: {{ ingredient.createdAt.toISOString() }}</div>
      <div class="text-caption text-bold">마지막 수정한 날짜: {{ ingredient.updatedAt.toISOString() }}</div>
    </q-card-section>

  </q-card>
</template>

<script setup>

import {useIngredientStore} from "stores/ingredients";
import {ref} from "vue";

defineEmits(['openUpdateIngredientDialog']);
defineProps({
  ingredient: {
    type: Object,
  }
});

const ingredientStore = useIngredientStore();

const onDeleteButtonClick = ingredient => {
  if (confirm('정말로 삭제 하시겠어요?')) {
    ingredientStore.delete(ingredient);
  }
}



</script>
