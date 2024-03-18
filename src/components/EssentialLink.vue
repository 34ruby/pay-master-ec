<template>
  <q-list v-for="item in items" :key="item.id">
    <q-separator />
    <q-item-label header> count : {{ totalItems || 0 }} </q-item-label>
    <q-item-label header> Price : {{ totalPrice || 0 }} </q-item-label>
    <q-item-section class="q-pa-sm" flat>
      <q-btn color="primary" label="Payment" @click="goToPayment" />
    </q-item-section>
    <q-separator />
    <q-item v-for="i in item" :key="i.id">
      <q-item-section top avatar>
        <q-avatar>
          <img :src="i.imageURL" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ i.name }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>{{ i.count }}</q-item-label>
        <div>
          <q-icon name="add" color="primary" @click="addCount(i)" />
          <q-icon name="remove" color="primary" @click="removeCount(i)" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
  <!-- <q-dialog v-model="removeItemConfirm" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ addItemInfo }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

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

const totalItems = computed(() => store.getters["items/totalItems"]);
const totalPrice = computed(() => store.getters["items/totalPrice"]);

const goToPayment = () => {
  router.push("/payment");
};
</script>
