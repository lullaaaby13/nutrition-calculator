<template>
  <div class="q-gutter-x-md">
    <span class="text-caption">중량: {{ Number(amount).toFixed(2) }}g</span>
    <span class="text-caption">단가: {{ Number(unitPrice).toFixed(0) || '-' }}원</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  amount: {
    type: Number,
    default: 0,
  },
  unitPrice: {
    type: Number,
  },
});
</script>
