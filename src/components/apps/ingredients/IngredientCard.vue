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
<!--        <q-btn-->
<!--          dense-->
<!--          outline-->
<!--          color="secondary"-->
<!--          @click="$emit('onUpdateButtonClick', ingredient)"-->
<!--        >-->
<!--          <q-icon name="edit" size="12px" class="q-mx-xs"/>-->
<!--          <span class="q-mr-xs">수정</span>-->
<!--        </q-btn>-->
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



    <q-separator/>

    <q-card-section class="row">
      <div class="col-6">
        <q-list bordered>
          <q-item class="q-my-sm">
            <q-item-section>
              <q-item-label>{{ ingredient.calories }}</q-item-label>
              <q-item-label caption lines="1">칼로리(Kcal)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm">
            <q-item-section>
              <q-item-label>{{ ingredient.carbohydrates }}</q-item-label>
              <q-item-label caption lines="1">탄수화물(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm">
            <q-item-section>
              <q-item-label>{{ ingredient.protein }}</q-item-label>
              <q-item-label caption lines="1">단백질(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm">
            <q-item-section>
              <q-item-label>{{ ingredient.fat }}</q-item-label>
              <q-item-label caption lines="1">지방(g)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-6">
        <q-list bordered>
          <q-item class="q-my-sm">
            <q-item-section>
              <q-item-label>{{ ingredient.unitPrice }}</q-item-label>
              <q-item-label caption lines="1">단가(원)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm">
            <q-item-section>
              <q-item-label>{{ ingredient.sugars }}</q-item-label>
              <q-item-label caption lines="1">당류(g)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm">
            <q-item-section>
              <q-item-label>{{ ingredient.caffeine }}</q-item-label>
              <q-item-label caption lines="1">카페인(mg)</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-sm">
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
defineProps({
  ingredient: {
    type: Object,
  },
});
defineEmits([
  'onUpdateButtonClick',
  'onDeleteButtonClick',
]);


</script>
