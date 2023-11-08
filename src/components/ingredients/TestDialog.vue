<template>
  <q-dialog :model-value="modelValue" @update:model-value="val => $emit('update:modelValue')">
    <q-card class="q-pa-md" style="width: 600px;">
      <q-card-section>
        <div class="text-h6">원재료 등록</div>
        <div class="text-caption">100g당</div>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script setup>

import {ref} from "vue";

defineProps({
  modelValue: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue']);

const myProps = ref('a');
defineExpose({ myProps })

</script>
