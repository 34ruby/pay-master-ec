<template>
  <q-list v-for="item in items" :key="item.id">
    <q-item v-for="i in item" :key="i.id">
      <q-item-section top thumbnail class="q-ml-none">
        <img :src="i.imageURL" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ i.name }}</q-item-label>
        <q-item-label caption>count: {{ i.count }}</q-item-label>
        <q-item-label caption>price: {{ i.price * i.count }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <div>
          <q-icon name="add" color="primary" @click="addCount(i)" />
          <q-icon name="remove" color="primary" @click="removeCount(i)" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
  <q-separator />
  <q-list>
    <q-item>
      <q-item-section>total price: {{ totalPrice }}</q-item-section>
    </q-item>
  </q-list>
  <q-separator />
  <q-list>
    <q-item>
      <div class="q-pa-md q-gutter-sm">
        <div class="q-gutter-sm">
          <q-radio dense v-model="shape" val="line" label="Line" />
          <q-radio dense v-model="shape" val="paypay" label="Paypay" />
        </div>
        <div class="q-px-sm q-pt-sm">
          <strong>{{ shape }} 로 결제를 진행합니다.</strong>
        </div>
      </div>
    </q-item>
    <q-btn @click="postPayment(items)">결제하기</q-btn>
  </q-list>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

const store = useStore();
const items = computed(() => store.state.items);
const router = useRouter();

const addCount = (i) => {
  store.dispatch("items/incrementItemCount", i.id);
};

// const removeItemConfirm = ref(false);

const removeCount = (i) => {
  store.dispatch("items/decrementItemCount", i.id);
  // if (i.count === 0) {
  //   store.dispatch("items/dropCartItem", i.id);
  // }
};

const totalPrice = computed(() => store.getters["items/totalPrice"]);

const goToPayment = () => {
  router.push("/payment");
};

const shape = ref("line");

const message = ref("");

const postPayment = (items) => {
  if (shape.value === "line") {
    submitLinepay(items);
  } else {
    submitPaypay(items);
  }
};

const submitLinepay = async () => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/submitPaypay`,
      {
        totalPrice: totalPrice.value,
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

const submitPaypay = async (items) => {
  const payload = {
    merchantPaymentId: `payment_${new Date().getTime()}`,
    amount: {
      amount: totalPrice.value,
      currency: "JPY",
    },
    codeType: "ORDER_QR",
    orderDescription: "pay-master-ec",
    orderItems: [],
    isAuthorization: false,
    redirectUrl: `https://paypay.ne.jp/`,
    redirectType: "APP_DEEP_LINK", //WEB_LINK
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
  };
  const transformItems = items.items;
  transformItems.forEach((item) => {
    payload.orderItems.push({
      name: item.name,
      category: "food",
      quantity: item.count,
      productId: item.id,
      unitPrice: {
        amount: item.price,
        currency: "JPY",
      },
    });
  });
  try {
    const response = await axios.post(
      `http://localhost:3000/api/create-qr`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
</script>

<style lang="scss" scoped></style>
