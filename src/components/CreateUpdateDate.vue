<template>
  <div class="text-caption text-bold">등록한 날짜: {{ date.formatDate(createdAt, 'YYYY-MM-DD HH:mm') || '' }}</div>
  <div class="text-caption text-bold">마지막 수정한 날짜: {{ date.formatDate(updatedAt, 'YYYY-MM-DD HH:mm') || ''}}</div>
</template>

<script setup lang="ts">

import {date} from 'quasar';

defineProps({
  createdAt: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: String,
    required: false,
  },
});

</script>

<style scoped>

</style>
