<template>
  <div class="paymentSuccess">
    <q-card class="my-card">
      <div class="checkArea">
        <q-img src="../../assets/success.svg" width="120px" />
      </div>
      <div class="paymentInfoArea">
        <q-list bordered>
          <q-item>
            <q-item-section>주문번호</q-item-section>
            <q-item-section side>{{
              paypayPaymentResult.paymentId
            }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>주문상태</q-item-section>
            <q-item-section side>{{
              paypayPaymentResult.status
            }}</q-item-section>
          </q-item>
          <!-- <q-item>
            <q-item-section>주문금액</q-item-section>
            <q-item-section side
              >{{ paypayPaymentResult.amount.amount }}円</q-item-section
            >
          </q-item> -->
          <q-item>
            <q-item-section>주문시간</q-item-section>
            <q-item-section side>{{ formattedAcceptedAt }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="q-ma-md btnArea">
        <q-btn
          class="q-ma-xs"
          outline
          color="black"
          label="취소하기"
          @click="cancelConfirm = true"
        />
        <q-btn class="q-ma-xs" color="primary" label="메인 페이지로" />
      </div>
    </q-card>
    <q-dialog v-model="cancelConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="cancel" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >취소한 거래는 복구할 수 없습니다. 취소하시겠습니까?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="아니오" color="primary" v-close-popup />
          <q-btn
            label="취소하기"
            color="primary"
            v-close-popup
            @click="cancelPaypayPayment(paypayPaymentResult.merchantPaymentId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import axios from "axios";

const cancelConfirm = ref(false);

const props = defineProps({
  paypayPaymentResult: Object,
});

const formattedAcceptedAt = computed(() => {
  if (!props.paypayPaymentResult || !props.paypayPaymentResult.acceptedAt) {
    return "00:00:00";
  }
  const date = new Date(props.paypayPaymentResult.acceptedAt * 1000);
  return new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
});

const cancelPaypayPayment = (merchantPaymentId) => {
  console.log(merchantPaymentId);
  const requestUrl = `http://localhost:3000/api/payment-cancel?merchantPaymentId=${encodeURIComponent(merchantPaymentId)}`;
  console.log(requestUrl);
  const deletePayment = async (merchantPaymentId) => {
    console.log(23);
    try {
      const response = await axios.delete(requestUrl);
    } catch (error) {
      console.log("취소실패");
    }
  };
  deletePayment();
};
</script>

<style lang="scss" scoped>
.paymentSuccess {
  display: flex;
  justify-content: center;
  align-items: center;
  .my-card {
    width: 480px;
    .checkArea {
      display: flex;
      justify-content: center;
      padding: 36px 0;
      border-bottom: 1px solid #e5e5e5;
      img {
        width: 120px;
      }
    }
    .btnArea {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
