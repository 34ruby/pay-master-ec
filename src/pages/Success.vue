<template>
  <q-page padding>
    <PaymentSuccess :paypayPaymentResult="paypayPaymentResult" />
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import PaymentSuccess from "src/components/payment/PaymentSuccess.vue";
import axios from "axios";

const route = useRoute();
const merchantPaymentId = ref("");
const paypayPaymentResult = ref({});
onMounted(() => {
  merchantPaymentId.value = route.query.key;
  console.log("call");
  const requestUrl = `http://localhost:3000/api/payment-detail?merchantPaymentId=${encodeURIComponent(merchantPaymentId.value)}`;
  console.log(requestUrl);
  console.log("call 2");
  const getPaypayPaymentResult = async (url) => {
    try {
      const response = await axios.get(url);
      console.log("call 3");
      if (
        response.data.resultInfo.code === "SUCCESS" &&
        response.data.data.status === "COMPLETED"
      ) {
        paypayPaymentResult.value = response.data.data;
        console.log(paypayPaymentResult);
      }
      console.log("call 4");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  getPaypayPaymentResult(requestUrl);
});
</script>

<style lang="scss" scoped></style>
