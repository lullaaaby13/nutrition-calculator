<template>
  <q-dialog va>
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section>
        <div class="text-h6">식재료 등록하기</div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <q-input
          class="q-my-sm"
          type="text"
          label="이름"
          dense
          readonly
        />
        <q-input
          class="q-my-sm"
          type="text"
          label="탄수화물"
          dense
        />
        <q-input
          class="q-my-sm"
          type="text"
          label="단백질"
          dense
        />
        <q-input
          class="q-my-sm"
          type="text"
          label="지방"
          dense
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="저장"
               color="primary"
               class="q-mr-md"
               v-close-popup
               @click="confirmDialog = true"
        />
        <q-btn label="취소" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

defineProps({
  registerDialog: {
    type: Boolean
  }
})

defineEmits(['update:registerDialog'])


</script>

<route lang="yaml">
meta:
  layout: default
</route>
