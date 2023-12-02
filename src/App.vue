<template>
  <router-view />
</template>

<script setup>

import {onErrorCaptured} from 'vue';

onErrorCaptured(err => {
  console.error('onErrorCaptured : ', err.message, err)
  // alert(err.message);
})

</script>
