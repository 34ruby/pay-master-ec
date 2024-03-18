<template>
  <q-page padding>
    <StoreItems />
  </q-page>
</template>

<script setup>
import StoreItems from "src/components/items/StoreItems.vue";

const apiKey = process.env.VUE_PAYPAY_CLIENT_ID_API_KEY;
console.log(apiKey);
</script>

<style lang="scss" scoped></style>
