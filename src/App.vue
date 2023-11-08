<template>
  <router-view />
</template>

<script setup>

import {onErrorCaptured} from "vue";

onErrorCaptured(err => {
  console.log('onErrorCaptured : ', err)
})

</script>
